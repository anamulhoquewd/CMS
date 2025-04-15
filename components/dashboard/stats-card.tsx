import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ShoppingCart,
  Users,
  User,
  CreditCard,
  Activity,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: "shopping-cart" | "users" | "user" | "credit-card";
  plaintext?: boolean;
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  plaintext = false,
  className,
}: StatsCardProps) {
  const isNegative = description.includes("-");

  const renderIcon = () => {
    switch (icon) {
      case "shopping-cart":
        return <ShoppingCart className="h-4 w-4 text-muted-foreground" />;
      case "users":
        return <Users className="h-4 w-4 text-muted-foreground" />;
      case "user":
        return <User className="h-4 w-4 text-muted-foreground" />;
      case "credit-card":
        return <CreditCard className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {renderIcon()}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs flex items-center gap-1 mt-1">
          {plaintext ? (
            ""
          ) : !isNegative ? (
            <TrendingUp className="h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-500" />
          )}
          <span
            className={
              plaintext
                ? cn("text-gray-500", className)
                : !isNegative
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {description}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
