import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Package,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "warning" | "success";
}

function StatCard({
  label,
  value,
  icon,
  trend,
  variant = "default",
}: StatCardProps) {
  const variantClasses = {
    default: "border-slate-200 bg-white",
    warning: "border-amber-200 bg-amber-50",
    success: "border-emerald-200 bg-emerald-50",
  };

  const iconClasses = {
    default: "text-slate-600",
    warning: "text-amber-600",
    success: "text-emerald-600",
  };

  const valueClasses = {
    default: "text-slate-900",
    warning: "text-amber-900",
    success: "text-emerald-900",
  };

  return (
    <Card className={cn("border", variantClasses[variant])}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600">{label}</p>
            <p
              className={cn(
                "mt-2 text-3xl font-bold font-display",
                valueClasses[variant]
              )}
            >
              {value}
            </p>
            {trend && (
              <div className="mt-2 flex items-center gap-1">
                <TrendingUp
                  size={16}
                  className={
                    trend.isPositive ? "text-emerald-600" : "text-red-600"
                  }
                />
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend.isPositive ? "text-emerald-600" : "text-red-600"
                  )}
                >
                  {trend.isPositive ? "+" : "-"}
                  {Math.abs(trend.value)}% vs ayer
                </span>
              </div>
            )}
          </div>
          <div className={cn("rounded-lg p-3", iconClasses[variant])}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export interface DashboardStatsProps {
  visitasHoy?: number;
  paquetesPendientes?: number;
  paquetesEntregadosHoy?: number;
  totalMensual?: number;
  tasaAutorizacion?: number;
}

export function DashboardStats({
  visitasHoy = 12,
  paquetesPendientes = 5,
  paquetesEntregadosHoy = 8,
  totalMensual = 247,
  tasaAutorizacion = 95,
}: DashboardStatsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Visitas hoy"
        value={visitasHoy}
        icon={<Users size={24} />}
        trend={{ value: 8, isPositive: true }}
      />
      <StatCard
        label="Paquetes pendientes"
        value={paquetesPendientes}
        icon={<Package size={24} />}
        variant={paquetesPendientes > 0 ? "warning" : "success"}
      />
      <StatCard
        label="Entregados hoy"
        value={paquetesEntregadosHoy}
        icon={<CheckCircle2 size={24} />}
        variant="success"
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        label="Total mensual"
        value={totalMensual}
        icon={<AlertCircle size={24} />}
        trend={{ value: 5, isPositive: true }}
      />
    </div>
  );
}
