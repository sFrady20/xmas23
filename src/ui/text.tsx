import React from "react";
import { cn } from "@/utils/shadcn";

const Text = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { secondary?: boolean }
>(({ className, secondary, ...props }, ref) => (
  <span
    ref={ref}
    {...props}
    className={cn(
      "",
      secondary && "text-sm text-[hsl(var(--muted-foreground))]",
      className
    )}
  />
));
Text.displayName = "Text";

export { Text };
