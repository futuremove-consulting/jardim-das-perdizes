import { ReactNode } from "react";

interface EditorialGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function EditorialGrid({ children, columns = 3, className = "" }: EditorialGridProps) {
  const colClasses = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid gap-6 ${colClasses[columns]} ${className}`}>
      {children}
    </div>
  );
}
