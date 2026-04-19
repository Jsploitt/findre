import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import type { PropertyStatus } from "@/types/property";

export function PropertyStatusBadge({ status }: { status: PropertyStatus }) {
  const t = useTranslations("status");
  return (
    <Badge tone={status} dot={status === "available"}>
      {t(status)}
    </Badge>
  );
}
