import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-sans font-medium transition-[color,background-color,transform,opacity] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        default: "bg-paper text-ink hover:bg-paper-2",
        ghost: "text-paper/80 hover:bg-ghost hover:text-paper",
        outline:
          "border border-hairline bg-transparent text-paper hover:bg-ghost",
        paper:
          "border border-rule bg-paper text-fg hover:bg-paper-2",
        paperGhost: "text-muted hover:bg-paper-2 hover:text-fg",
      },
      size: {
        default: "h-11 px-4 text-sm",
        sm: "h-9 px-3 text-xs tracking-wide",
        icon: "size-11",
        iconSm: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
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
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
