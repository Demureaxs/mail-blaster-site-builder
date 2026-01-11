import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType; // allow 'section', 'div', etc.
}

export function Container({ className, as: Component = "div", ...props }: ContainerProps) {
  return (
    <Component
      className={cn("container mx-auto px-4 md:px-6 w-full max-w-7xl", className)}
      {...props}
    />
  );
}
