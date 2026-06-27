import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

const SectionHeader = ({ title, subtitle, className }: SectionHeaderProps) => (
  <div className={cn("text-center flex flex-col gap-2", className)}>
    <h2 className="text-3xl font-bold text-fg-primary">{title}</h2>
    <p className="text-fg-muted">{subtitle}</p>
  </div>
);

export default SectionHeader;
