import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { OrdinanceStatus } from "@/lib/definitions";

type StatusBadgeProps = {
  status: OrdinanceStatus;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusStyles: Record<OrdinanceStatus, string> = {
    Introduced: "bg-gray-200 text-gray-800 border-gray-300",
    "In Committee": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "First Reading": "bg-blue-100 text-blue-800 border-blue-200",
    Passed: "bg-green-100 text-green-800 border-green-200",
    Rejected: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-semibold capitalize",
        statusStyles[status],
        className
      )}
    >
      {status}
    </Badge>
  );
}
