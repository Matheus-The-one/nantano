"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

function parseValue(val: string): { num: number; prefix: string; suffix: string } {
  const hasLt = val.startsWith("<");
  const prefix = hasLt ? "<" : "";
  const cleaned = val.replace(/[<>+%]/g, "");
  const num = parseFloat(cleaned.replace(/K/, "")) * (cleaned.includes("K") ? 1000 : 1);
  const suffix = val.replace(/[<>0-9.]/g, "").replace("K", "K");
  return { num: isNaN(num) ? 0 : num, prefix, suffix };
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const [displayed, setDisplayed] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const { num, prefix, suffix } = parseValue(value);
          const duration = 1800;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * num);

            if (num >= 1000) {
              const k = current / 1000;
              setDisplayed(`${prefix}${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}K${suffix.replace("K", "")}`);
            } else {
              setDisplayed(`${prefix}${current}${suffix}`);
            }

            if (progress < 1) requestAnimationFrame(tick);
            else setDisplayed(value);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {displayed}
    </span>
  );
}
