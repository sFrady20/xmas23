import React from "react";
import { cn } from "@/utils/shadcn";

const Icon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <i ref={ref} {...props} className={cn("", className)} />
));
Icon.displayName = "Icon";

export { Icon };
