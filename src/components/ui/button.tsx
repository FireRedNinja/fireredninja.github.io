import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-black dark:focus-visible:ring-accent-orange-dark min-h-[44px] min-w-[44px]",
  {
    variants: {
      variant: {
        default:
          "bg-accent-orange text-white hover:bg-accent-orange-hover dark:bg-accent-orange-dark dark:text-text-primary dark:hover:bg-accent-orange-dark-hover",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600",
        outline:
          "border-2 border-border-light bg-transparent hover:bg-bg-hover-light hover:text-text-primary dark:border-border-dark dark:hover:bg-bg-hover-dark dark:hover:text-text-primary-dark",
        secondary:
          "bg-bg-muted-light text-text-primary hover:bg-border-light dark:bg-bg-muted-dark dark:text-text-primary-dark dark:hover:bg-border-dark",
        ghost:
          "hover:bg-bg-hover-light hover:text-text-primary dark:hover:bg-bg-hover-dark dark:hover:text-text-primary-dark",
        link: "text-accent-orange underline-offset-4 hover:underline dark:text-accent-orange-dark",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-10 rounded-md px-4",
        lg: "h-12 rounded-lg px-8 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
