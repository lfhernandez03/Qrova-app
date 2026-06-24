import Link from "next/link";
import { cn } from "@/lib/utils";

const QR_RECTS = [
  { x: 2,  y: 2,  w: 6, h: 6, rx: 1 },
  { x: 10, y: 2,  w: 6, h: 6, rx: 1 },
  { x: 2,  y: 10, w: 6, h: 6, rx: 1 },
  { x: 12, y: 12, w: 2, h: 2, rx: 0.5 },
  { x: 10, y: 10, w: 2, h: 2, rx: 0.5 },
  { x: 14, y: 10, w: 2, h: 2, rx: 0.5 },
  { x: 10, y: 14, w: 2, h: 2, rx: 0.5 },
] as const;

interface LogoProps {
  size?: "sm" | "default";
  className?: string;
}

const SIZE = {
  default: { container: "size-8", svg: 18, text: "text-lg" },
  sm:      { container: "size-7", svg: 16, text: "text-base" },
} as const;

const Logo = ({ size = "default", className }: LogoProps) => {
  const s = SIZE[size];
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className={cn(s.container, "rounded-lg bg-coral-400 flex items-center justify-center shrink-0")}>
        <svg width={s.svg} height={s.svg} viewBox="0 0 18 18" fill="none" aria-hidden>
          {QR_RECTS.map(({ x, y, w, h, rx }) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx={rx} fill="white" />
          ))}
        </svg>
      </div>
      <span className={cn("text-coral-400 font-semibold tracking-tight", s.text)}>
        Qrova
      </span>
    </Link>
  );
};

export default Logo;
