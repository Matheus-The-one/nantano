import { cn } from "@/lib/utils";

/** Shared max width for centred dashboard pages. Keeps header and body aligned. */
export const PAGE_WIDTH = "max-w-[860px]";

/**
 * Shared header for the non-chat dashboard pages. Chat owns its own header
 * because it needs the conversation title inline.
 *
 * Set `centered` on pages whose body is constrained to PAGE_WIDTH, so the
 * heading sits on the same left edge as the content below it.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  centered = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("border-b border-border", className)}>
      <div
        className={cn(
          "flex flex-col gap-4 py-6 sm:flex-row sm:items-end sm:justify-between",
          centered
            ? `mx-auto w-full ${PAGE_WIDTH} px-5 sm:px-8`
            : "px-6 lg:px-8"
        )}
      >
        <div className="min-w-0">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}
