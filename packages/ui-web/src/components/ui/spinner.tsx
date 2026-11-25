import { useKitLabels } from "@moonlight/ui-web/components/ui/kit-labels";
import { cn } from "@moonlight/ui-web/lib/utils";
import { Loader2Icon } from "lucide-react";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  const labels = useKitLabels();
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label={labels.loading}
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
