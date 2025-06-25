import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1  md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <Card
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between transition duration-200 hover:bg-muted/20",
        className
      )}
    >
      {header && <CardHeader className="p-4">{header}</CardHeader>}
      <CardContent className="p-4 transition-transform duration-200 group-hover/bento:translate-x-2">
        {icon}
        <h3 className="mt-2 mb-1 font-sans text-lg font-semibold text-foreground ">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};
