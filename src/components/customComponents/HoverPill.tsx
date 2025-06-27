import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface HoverPillProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string
  content: string;
}

export default function HoverPill({
  icon,
  title,
  subtitle,
  content,
}: HoverPillProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs">
          {icon} <span>{title}</span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-60">
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{subtitle}</h4>
            <p className="text-sm">{content}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
