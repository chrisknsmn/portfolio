// BentoGrid.tsx
import { ReactNode } from "react";
import clsx from "clsx";

const BentoGrid = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  span,
  children,
}: {
  span: number;
  children: React.ReactNode;
}) => {
  return (
    <div className={`h-full md:col-span-1 lg:col-span-${span}`}>{children}</div>
  );
};

export { BentoCard, BentoGrid };
