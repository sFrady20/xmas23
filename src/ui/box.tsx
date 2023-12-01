import React from "react";
import { cn } from "@/utils/shadcn";

const Box = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} {...props} className={cn("", className)} />
));
Box.displayName = "Box";

export { Box };
