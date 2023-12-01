"use client";

import * as React from "react";

import { cn } from "@/utils/shadcn";
import VerificationInput, {
  VerificationInputProps,
} from "react-verification-input";

const CodeInput = React.forwardRef<HTMLInputElement, VerificationInputProps>(
  ({ classNames, ...props }, ref) => (
    <VerificationInput
      ref={ref}
      {...props}
      classNames={{
        container: cn("h-[40px]"),
        character: cn(
          "bg-background rounded-md border border-input text-foreground text-lg flex flex-col justify-center align-center text-sm",
          classNames?.character
        ),
        characterSelected: cn(
          "ring-offset-background outline-none ring-2 ring-ring ring-offset-2",
          classNames?.characterSelected
        ),
        characterInactive: cn("", classNames?.character),
      }}
    />
  )
);
CodeInput.displayName = "CodeInput";

export { CodeInput };
