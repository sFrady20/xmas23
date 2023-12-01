import * as React from "react";

import { cn } from "@/utils/shadcn";
import { Box } from "./box";

const Tabs = React.forwardRef<
  React.ElementRef<typeof Box>,
  React.ComponentPropsWithoutRef<typeof Box>
>(({ className, ...props }, ref) => (
  <Box
    ref={ref}
    className={cn("flex flex-row items-end overflow-x-auto", className)}
    {...props}
  />
));
Tabs.displayName = "Tabs";

const Tab = React.forwardRef<
  React.ElementRef<typeof Box>,
  React.ComponentPropsWithoutRef<typeof Box> & { selected?: boolean }
>(({ className, selected, ...props }, ref) => (
  <Box
    ref={ref}
    className={cn(
      "p-4 border-b-2 cursor-pointer font-medium text-[hsl(var(--muted-foreground))] whitespace-nowrap",
      selected && "text-[hsl(var(--primary))] border-[hsl(var(--primary))]",
      className
    )}
    {...props}
  />
));
Tab.displayName = "Tab";

export { Tabs, Tab };
