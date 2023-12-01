import React from "react";
import { cn } from "@/utils/shadcn";
import { Label } from "./label";
import { Box } from "./box";
import { Text } from "./text";

const Field = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Box ref={ref} {...props} className={cn("flex flex-col gap-2", className)} />
));
Field.displayName = "Field";

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => (
  <Label ref={ref} className={cn("self-start", className)} {...props} />
));
FieldLabel.displayName = "FieldLabel";

const FieldControl = React.forwardRef<
  React.ElementRef<typeof Box>,
  React.ComponentPropsWithoutRef<typeof Box>
>(({ className, ...props }, ref) => (
  <Box ref={ref} className={cn("", className)} {...props} />
));
FieldControl.displayName = "FieldControl";

const FieldHelper = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    secondary
    ref={ref}
    className={cn("self-start text-xs", className)}
    {...props}
  />
));
FieldHelper.displayName = "FieldHelper";

export { Field, FieldLabel, FieldControl, FieldHelper };
