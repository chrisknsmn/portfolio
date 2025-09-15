import * as React from "react";
import { cn } from "@/lib/utils";

function Section({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="section"
      className={cn("min-h-[100vh] p-8", className)}
      {...props}
    >
      {children}
    </section>
  );
}

function SectionInner({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="section-inner"
      className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Section, SectionInner };
