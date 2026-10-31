import { cn } from "@/lib/utils";

/**
 * Minimal markdown renderer for assistant replies.
 *
 * The model is instructed to emit plain markdown with short paragraphs, so we
 * only support the subset it actually uses: headings, bullet and numbered
 * lists, fenced code, inline code, bold, and italics. This avoids pulling a
 * full markdown pipeline plus sanitiser into the bundle. Nothing is ever set
 * via innerHTML, so model output cannot inject markup.
 */

type Inline = { text: string; bold?: boolean; italic?: boolean; code?: boolean };

/** Splits a line into styled runs. Code spans win over bold and italics. */
function parseInline(line: string): Inline[] {
  const tokens: Inline[] = [];
  const pattern = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(_[^_]+_)/g;

  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(line)) !== null) {
    if (match.index > cursor) {
      tokens.push({ text: line.slice(cursor, match.index) });
    }

    const [raw] = match;

    if (raw.startsWith("`")) {
      tokens.push({ text: raw.slice(1, -1), code: true });
    } else if (raw.startsWith("**")) {
      tokens.push({ text: raw.slice(2, -2), bold: true });
    } else {
      tokens.push({ text: raw.slice(1, -1), italic: true });
    }

    cursor = match.index + raw.length;
  }

  if (cursor < line.length) tokens.push({ text: line.slice(cursor) });

  return tokens;
}

function InlineRuns({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((token, index) => {
        if (token.code) {
          return (
            <code
              key={index}
              className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
            >
              {token.text}
            </code>
          );
        }

        if (token.bold) {
          return (
            <strong key={index} className="font-semibold text-foreground">
              {token.text}
            </strong>
          );
        }

        if (token.italic) {
          return <em key={index}>{token.text}</em>;
        }

        return <span key={index}>{token.text}</span>;
      })}
    </>
  );
}

type Block =
  | { kind: "paragraph"; lines: string[] }
  | { kind: "heading"; level: 2 | 3 | 4; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "numbers"; items: string[] }
  | { kind: "code"; code: string };

function parseBlocks(markdown: string): Block[] {
  const blocks: Block[] = [];
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");

  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.trim().length === 0) {
      index += 1;
      continue;
    }

    // Fenced code. An unterminated fence (mid-stream) still renders.
    if (line.trimStart().startsWith("```")) {
      const body: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trimStart().startsWith("```")) {
        body.push(lines[index]);
        index += 1;
      }

      index += 1; // consume the closing fence
      blocks.push({ kind: "code", code: body.join("\n") });
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      const depth = heading[1].length;
      blocks.push({
        kind: "heading",
        level: depth <= 2 ? 2 : depth === 3 ? 3 : 4,
        text: heading[2],
      });
      index += 1;
      continue;
    }

    if (/^\s*[-*+]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*[-*+]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*+]\s+/, ""));
        index += 1;
      }
      blocks.push({ kind: "bullets", items });
      continue;
    }

    if (/^\s*\d+[.)]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*\d+[.)]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+[.)]\s+/, ""));
        index += 1;
      }
      blocks.push({ kind: "numbers", items });
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim().length > 0 &&
      !/^\s*[-*+]\s+/.test(lines[index]) &&
      !/^\s*\d+[.)]\s+/.test(lines[index]) &&
      !/^#{1,6}\s+/.test(lines[index]) &&
      !lines[index].trimStart().startsWith("```")
    ) {
      paragraph.push(lines[index]);
      index += 1;
    }

    blocks.push({ kind: "paragraph", lines: paragraph });
  }

  return blocks;
}

export function Markdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const blocks = parseBlocks(content);

  return (
    <div className={cn("space-y-3.5 text-[15px] leading-relaxed", className)}>
      {blocks.map((block, index) => {
        switch (block.kind) {
          case "heading": {
            const sizes = {
              2: "text-base font-semibold",
              3: "text-[15px] font-semibold",
              4: "text-sm font-semibold",
            } as const;

            return (
              <h3
                key={index}
                className={cn(
                  "font-display tracking-tight text-foreground",
                  sizes[block.level],
                  index > 0 && "pt-1.5"
                )}
              >
                <InlineRuns text={block.text} />
              </h3>
            );
          }

          case "bullets":
            return (
              <ul key={index} className="space-y-2 pl-1">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70"
                    />
                    <span className="min-w-0">
                      <InlineRuns text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "numbers":
            return (
              <ol key={index} className="space-y-2 pl-1">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-2.5">
                    <span className="shrink-0 font-mono text-xs text-primary">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <InlineRuns text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            );

          case "code":
            return (
              <pre
                key={index}
                className="overflow-x-auto rounded-xl border border-border bg-ink/60 p-4"
              >
                <code className="font-mono text-[13px] leading-relaxed text-foreground/90">
                  {block.code}
                </code>
              </pre>
            );

          case "paragraph":
            return (
              <p key={index}>
                <InlineRuns text={block.lines.join(" ")} />
              </p>
            );

          default: {
            // Exhaustiveness guard: a new Block variant must be handled here.
            const never: never = block;
            return never;
          }
        }
      })}
    </div>
  );
}
