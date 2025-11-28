import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2 min-h-[44px]",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-accent-orange text-white hover:bg-accent-orange-hover dark:bg-accent-orange-dark dark:text-text-primary dark:hover:bg-accent-orange-dark-hover",
        secondary:
          "border-transparent bg-bg-muted-light text-text-primary hover:bg-border-light dark:bg-bg-muted-dark dark:text-text-primary-dark dark:hover:bg-border-dark",
        outline:
          "border-border-light text-text-primary dark:border-border-dark dark:text-text-primary-dark",
        ghost:
          "border-transparent bg-transparent text-text-secondary hover:bg-bg-hover-light dark:text-text-secondary-dark dark:hover:bg-bg-hover-dark",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
