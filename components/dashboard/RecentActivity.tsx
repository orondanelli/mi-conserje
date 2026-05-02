import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  Package,
  Truck,
  RotateCw,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface Activity {
  id: string;
  type:
    | "visita_entrada"
    | "visita_salida"
    | "paquete_recepcion"
    | "paquete_entrega"
    | "paquete_devolucion";
  fecha: Date;
  usuario: string;
  departamento: string;
  descripcion: string;
  detalles?: string;
}

function getActivityIcon(type: Activity["type"]) {
  switch (type) {
    case "visita_entrada":
      return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    case "visita_salida":
      return <Clock className="h-4 w-4 text-blue-600" />;
    case "paquete_recepcion":
      return <Package className="h-4 w-4 text-amber-600" />;
    case "paquete_entrega":
      return <Truck className="h-4 w-4 text-emerald-600" />;
    case "paquete_devolucion":
      return <RotateCw className="h-4 w-4 text-orange-600" />;
    default:
      return null;
  }
}

function getActivityBadge(type: Activity["type"]) {
  const variants: Record<Activity["type"], string> = {
    visita_entrada: "bg-green-50 text-green-700 border-green-200",
    visita_salida: "bg-blue-50 text-blue-700 border-blue-200",
    paquete_recepcion: "bg-amber-50 text-amber-700 border-amber-200",
    paquete_entrega: "bg-emerald-50 text-emerald-700 border-emerald-200",
    paquete_devolucion: "bg-orange-50 text-orange-700 border-orange-200",
  };

  const labels: Record<Activity["type"], string> = {
    visita_entrada: "Visita - Entrada",
    visita_salida: "Visita - Salida",
    paquete_recepcion: "Paquete - Recibido",
    paquete_entrega: "Paquete - Entregado",
    paquete_devolucion: "Paquete - Devuelto",
  };

  return (
    <Badge variant="outline" className={variants[type]}>
      {labels[type]}
    </Badge>
  );
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "visita_entrada",
    fecha: new Date(Date.now() - 0.5 * 60 * 60 * 1000),
    usuario: "Carlos González",
    departamento: "4B",
    descripcion: "Roberto Silva ingresó para reunion de mantenimiento",
    detalles: "DNI: 15.234.567",
  },
  {
    id: "2",
    type: "paquete_recepcion",
    fecha: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
    usuario: "María López",
    departamento: "12A",
    descripcion: "Paquete de DHL recibido",
    detalles: "Guía: DHL123456789",
  },
  {
    id: "3",
    type: "paquete_entrega",
    fecha: new Date(Date.now() - 2 * 60 * 60 * 1000),
    usuario: "Carlos González",
    departamento: "8C",
    descripcion: "Paquete entregado a Javier Martínez",
    detalles: "Correos Argentinos",
  },
  {
    id: "4",
    type: "visita_salida",
    fecha: new Date(Date.now() - 3 * 60 * 60 * 1000),
    usuario: "María López",
    departamento: "4B",
    descripcion: "Roberto Silva egresó del edificio",
  },
  {
    id: "5",
    type: "paquete_recepcion",
    fecha: new Date(Date.now() - 4 * 60 * 60 * 1000),
    usuario: "Pedro Ruiz",
    departamento: "15D",
    descripcion: "Paquete de FedEx recibido",
    detalles: "Guía: FED987654321",
  },
  {
    id: "6",
    type: "visita_entrada",
    fecha: new Date(Date.now() - 5 * 60 * 60 * 1000),
    usuario: "Carlos González",
    departamento: "2A",
    descripcion: "Técnico de gasista ingresó",
    detalles: "Revisión de instalación",
  },
  {
    id: "7",
    type: "paquete_devolucion",
    fecha: new Date(Date.now() - 6 * 60 * 60 * 1000),
    usuario: "María López",
    departamento: "7E",
    descripcion: "Paquete devuelto a DHL",
    detalles: "Destinatario no se encontraba",
  },
  {
    id: "8",
    type: "visita_entrada",
    fecha: new Date(Date.now() - 7 * 60 * 60 * 1000),
    usuario: "Pedro Ruiz",
    departamento: "5C",
    descripcion: "Inspección de control de plagas",
    detalles: "DNI: 18.901.234",
  },
  {
    id: "9",
    type: "paquete_entrega",
    fecha: new Date(Date.now() - 8 * 60 * 60 * 1000),
    usuario: "Carlos González",
    departamento: "3B",
    descripcion: "Paquete entregado a Cristina Fernández",
    detalles: "Transportes Flash",
  },
  {
    id: "10",
    type: "visita_salida",
    fecha: new Date(Date.now() - 9 * 60 * 60 * 1000),
    usuario: "Pedro Ruiz",
    departamento: "2A",
    descripcion: "Técnico de gasista egresó",
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">
          Actividad Reciente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 pb-3 last:pb-0 border-b last:border-b-0"
            >
              <div className="mt-1 flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  {getActivityBadge(activity.type)}
                  <span className="text-xs text-slate-500">
                    Depto. {activity.departamento}
                  </span>
                </div>
                <p className="text-sm text-slate-900 font-medium break-words">
                  {activity.descripcion}
                </p>
                {activity.detalles && (
                  <p className="text-xs text-slate-500 mt-1">
                    {activity.detalles}
                  </p>
                )}
                <p className="text-xs text-slate-400 mt-2">
                  {activity.usuario} •{" "}
                  {formatDistanceToNow(activity.fecha, {
                    addSuffix: true,
                    locale: es,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
