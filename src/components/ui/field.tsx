import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Label as RadixLabel } from "./label";

export const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof RadixLabel>,
  React.ComponentPropsWithoutRef<typeof RadixLabel> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <RadixLabel ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = "Label";

export { Label };
