"use client";

import * as React from "react";
import Image from "next/image";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { H2, H3, H4, P } from "@/components/ui/main";

/* Container variants (tweak freely) */
const experienceVariants = cva("bg-background text-foreground", {
  variants: {
    variant: {
      default: "",
      ghost: "border-transparent bg-transparent",
      outlined: "bg-transparent",
    },
    size: {
      default: "p-0",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

type ExperienceProps = React.ComponentProps<"div"> &
  VariantProps<typeof experienceVariants> & {
    asChild?: boolean;
    company: string;
    role: string;
    dates: string;
    logoSrc: string;
    logoAlt?: string;
  };

const ExperienceCard = React.forwardRef<HTMLDivElement, ExperienceProps>(
  (
    {
      asChild = false,
      className,
      variant,
      size,
      company,
      role,
      dates,
      logoSrc,
      logoAlt = `${company} logo`,
      children,
      ...props
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const detailsRef = React.useRef<HTMLDivElement>(null);
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        data-slot="experience"
        className={cn(experienceVariants({ variant, size }), className)}
        {...props}
      >
        <div className="flex flex-col gap-4">
          <div
            className="flex gap-4 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex flex-grow gap-4 flex-col sm:flex-row">
              <div className="flex w-12">
                <div className="flex items-center justify-center">
                  <div className="border aspect-square p-3 rounded-full w-12 flex items-center justify-center">
                    <Image
                      src={logoSrc}
                      alt={logoAlt}
                      width={48}
                      height={48}
                      className="w-full h-auto m-auto invert-0 dark:invert"
                      priority
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex flex-col flex-grow">
                <H4 size="h4">{company}</H4>
                <P>{role}</P>
                <P>{dates}</P>
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-lg transition-transform duration-200 ease-in-out">
                {isExpanded ? "−" : "+"}
              </span>
            </div>
          </div>
          <div
            ref={detailsRef}
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: isExpanded
                ? detailsRef.current?.scrollHeight + "px"
                : "0px",
            }}
          >
            <div className="flex gap-4">
              {/* Row 2 Col 1 Divider */}
              <div className="hidden sm:flex w-12 flex-none justify-center pt-[5px]">
                <div className="h-full w-[2px] bg-border"></div>
              </div>
              {/* Details */}
              <div className="flex flex-grow flex-col gap-2">{children}</div>
            </div>
          </div>
        </div>
      </Comp>
    );
  }
);
ExperienceCard.displayName = "Experience";

export { ExperienceCard };
