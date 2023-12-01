import { forwardRef } from "react";
import { Box } from "@/ui/box";
import { Text } from "@/ui/text";
import { cn } from "@/utils/shadcn";

const Setting = forwardRef<
  React.ElementRef<typeof Box>,
  React.ComponentPropsWithoutRef<typeof Box>
>(({ className, ...props }, ref) => (
  <Box
    ref={ref}
    className={cn(
      "flex flex-col md:flex-row items-start gap-4 md:gap-20",
      className
    )}
    {...props}
  />
));
Setting.displayName = "Setting";

const SettingInfo = forwardRef<
  React.ElementRef<typeof Box>,
  React.ComponentPropsWithoutRef<typeof Box>
>(({ className, ...props }, ref) => (
  <Box
    ref={ref}
    className={cn("flex-1 flex flex-col gap-1", className)}
    {...props}
  />
));
SettingInfo.displayName = "SettingInfo";

const SettingLabel = forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text ref={ref} className={cn("font-medium text-md", className)} {...props} />
));
SettingLabel.displayName = "SettingLabel";

const SettingDescription = forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    secondary
    className={cn("text-xs max-w-[400px]", className)}
    {...props}
  />
));
SettingDescription.displayName = "SettingDescription";

const SettingControl = forwardRef<
  React.ElementRef<typeof Box>,
  React.ComponentPropsWithoutRef<typeof Box>
>(({ className, ...props }, ref) => (
  <Box ref={ref} className={cn("", className)} {...props} />
));
SettingControl.displayName = "SettingControl";

export {
  Setting,
  SettingInfo,
  SettingLabel,
  SettingDescription,
  SettingControl,
};
