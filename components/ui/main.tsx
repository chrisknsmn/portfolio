import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* Variants */
const sectionVariants = cva("", {
  variants: {
    variant: { default: "" },
    size: { default: "h-9 px-4 py-2 has-[>svg]:px-3" },
  },
  defaultVariants: { variant: "default", size: "default" },
});

const headingVariants = cva("leading-tight", {
  variants: {
    variant: {
      default: "",
      border: "border-b pb-2",
      borderxs: "border-b pb-2 max-w-xs",
    },
    size: {
      default: "",
      h1: "",
      h2: "text-[clamp(1.75rem,calc(1rem+6vw),5rem)]",
      h3: "text-[clamp(1.75rem,calc(1rem+6vw),2rem)] font-semibold",
      h4: "text-lg font-semibold",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

const pVariants = cva("", {
  variants: {
    variant: { default: "" },
    size: { default: "text-sm", xs: "text-xs" },
  },
  defaultVariants: { variant: "default", size: "default" },
});

/* Section */
type SectionProps = React.ComponentProps<"section"> &
  VariantProps<typeof sectionVariants> & { asChild?: boolean };

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "section";
    return (
      <Comp
        ref={ref}
        data-slot="section"
        className={cn(sectionVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Section.displayName = "Section";

/* H2 */
type H2Props = React.ComponentProps<"h2"> &
  VariantProps<typeof headingVariants> & { asChild?: boolean };

const H2 = React.forwardRef<HTMLHeadingElement, H2Props>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h2";
    return (
      <h2
        ref={ref}
        data-slot="h2"
        className={cn(
          "leading-tight text-[clamp(1.75rem,calc(1rem+6vw),5rem)]",
          headingVariants({ variant, size }),
          className
        )}
        {...props}
      />
    );
  }
);
H2.displayName = "H2";

/* H3 */
type H3Props = React.ComponentProps<"h3"> &
  VariantProps<typeof headingVariants> & { asChild?: boolean };

const H3 = React.forwardRef<HTMLHeadingElement, H2Props>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h3";
    return (
      <h3
        ref={ref}
        data-slot="h2"
        className={cn(
          "leading-tight text-[clamp(1.75rem,calc(1rem+6vw),2rem)]",
          headingVariants({ variant, size }),
          className
        )}
        {...props}
      />
    );
  }
);
H3.displayName = "H3";

/* H4 */
type H4Props = React.ComponentProps<"h4"> &
  VariantProps<typeof headingVariants> & { asChild?: boolean };

const H4 = React.forwardRef<HTMLHeadingElement, H4Props>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h4";
    return (
      <h4
        ref={ref}
        data-slot="h4"
        className={cn(
          "leading-tight text-[clamp(1.75rem,calc(1rem+6vw),1rem)]",
          headingVariants({ variant, size }),
          className
        )}
        {...props}
      />
    );
  }
);
H4.displayName = "H4";

/* P */
type PProps = React.ComponentProps<"p"> &
  VariantProps<typeof pVariants> & { asChild?: boolean };

const P = React.forwardRef<HTMLParagraphElement, PProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";
    return (
      <p
        ref={ref}
        data-slot="p"
        className={cn(pVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
P.displayName = "P";

export { Section, H2, H3, H4, P };
