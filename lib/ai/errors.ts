import { APICallError } from "ai";

export type ModelFailureKind =
  | "not-authorized"
  | "model-access"
  | "throttled"
  | "unknown";

export class ModelError extends Error {
  readonly kind: ModelFailureKind;

  constructor(
    kind: ModelFailureKind,
    message: string,
    options?: { cause?: unknown }
  ) {
    super(message, options);
    this.name = "ModelError";
    this.kind = kind;
  }
}

/** Human-readable remedy for each failure class, shown in the chat UI. */
export function modelErrorHint(kind: ModelFailureKind): string | null {
  switch (kind) {
    case "not-authorized":
      return "Add bedrock:InvokeModel and bedrock:InvokeModelWithResponseStream to the IAM user, then retry.";
    case "model-access":
      return "Enable the model in the Bedrock console under Model access for this region.";
    case "throttled":
      return "Retrying in a moment usually clears it.";
    case "unknown":
      return null;
    default: {
      // Exhaustiveness guard: new failure kinds must be given a hint here.
      const never: never = kind;
      return never;
    }
  }
}

/**
 * Bedrock signals the difference between "your IAM user may not call Bedrock"
 * and "this account has not enabled this model" only in the error body, yet
 * the two are fixed in different AWS consoles. Pull them apart so the UI can
 * point at the right one.
 */
function classifyBedrockErrorType(
  errorType: string,
  text: string,
  cause: unknown
): ModelError {
  const lower = text.toLowerCase();

  switch (errorType) {
    case "AccessDeniedException":
    case "UnrecognizedClientException":
    case "InvalidSignatureException": {
      // Match the IAM phrasing rather than the word "model", which also
      // appears in the action name (bedrock:InvokeModel) of an IAM denial.
      const isIamDenial =
        lower.includes("not authorized to perform") ||
        lower.includes("identity-based policy") ||
        lower.includes("security token") ||
        lower.includes("signature");

      return isIamDenial
        ? new ModelError(
            "not-authorized",
            "The AWS credentials are not authorized for Amazon Bedrock.",
            { cause }
          )
        : new ModelError(
            "model-access",
            "This AWS account does not have access to the configured Bedrock model.",
            { cause }
          );
    }

    case "ThrottlingException":
    case "ServiceQuotaExceededException":
    case "ModelNotReadyException":
      return new ModelError(
        "throttled",
        "Bedrock is rate limiting this request.",
        { cause }
      );

    case "ValidationException":
    case "ResourceNotFoundException":
      return new ModelError(
        "model-access",
        text || "Bedrock rejected the model request.",
        { cause }
      );

    default:
      return new ModelError("unknown", text || "Unexpected model error.", {
        cause,
      });
  }
}

/** Bedrock puts its error class in a header; fall back to the body shape. */
function readErrorType(error: APICallError): string {
  const header = error.responseHeaders?.["x-amzn-errortype"];
  if (header) {
    // The header can be `AccessDeniedException:http://internal.amazon.com/...`
    return header.split(":")[0].trim();
  }

  if (typeof error.data === "object" && error.data !== null) {
    const type = (error.data as { __type?: unknown }).__type;
    if (typeof type === "string") return type.split("#").pop() ?? type;
  }

  // Status codes are the last resort when Bedrock returns a bare error.
  if (error.statusCode === 403) return "AccessDeniedException";
  if (error.statusCode === 429) return "ThrottlingException";
  if (error.statusCode === 404) return "ResourceNotFoundException";

  return "";
}

function readMessage(error: APICallError): string {
  if (typeof error.data === "object" && error.data !== null) {
    const message = (error.data as { message?: unknown }).message;
    if (typeof message === "string" && message.length > 0) return message;
  }

  return error.responseBody ?? error.message;
}

/**
 * Normalises anything thrown while talking to the model into a `ModelError`.
 * Accepts `unknown` because it also runs in stream `onError` handlers.
 */
export function classifyModelError(error: unknown): ModelError {
  if (error instanceof ModelError) return error;

  if (APICallError.isInstance(error)) {
    return classifyBedrockErrorType(
      readErrorType(error),
      readMessage(error),
      error
    );
  }

  const message =
    error instanceof Error ? error.message : "Unexpected model error.";

  return new ModelError("unknown", message, { cause: error });
}

/** The single string the client should show for a failed generation. */
export function toClientErrorMessage(error: unknown): string {
  const classified = classifyModelError(error);
  const hint = modelErrorHint(classified.kind);

  return hint ? `${classified.message} ${hint}` : classified.message;
}
