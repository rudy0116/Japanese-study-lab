import type { ReactNode } from "react";

const sizeMap = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
} as const;

interface PageContainerProps {
  children: ReactNode;
  size?: keyof typeof sizeMap;
  className?: string;
}

export function PageContainer({
  children,
  size = "xl",
  className = "",
}: PageContainerProps) {
  return (
    <div
      className={`mx-auto ${sizeMap[size]} px-4 py-10 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
