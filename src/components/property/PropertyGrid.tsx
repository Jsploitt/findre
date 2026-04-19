import type { Property } from "@/types/property";
import { PropertyCard } from "./PropertyCard";

export function PropertyGrid({ items }: { items: Property[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
