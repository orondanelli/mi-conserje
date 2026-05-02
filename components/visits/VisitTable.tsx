"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVerticalIcon, ClockIcon, CheckIcon, XIcon } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"
import { es } from "date-fns/locale"

interface Visita {
  id: string
  visitante: string
  documento: string
  departamento: string
  piso: number
  fechaEntrada: Date
  fechaSalida?: Date
  estado: "en_edificio" | "salio" | "no_autorizado"
  motivo?: string
  autorizado: boolean
  portero: string
}

interface VisitTableProps {
  visitas?: Visita[]
  onCheckOut?: (id: string) => void
}

const mockVisitas: Visita[] = [
  {
    id: "V001",
    visitante: "María Fernández",
    documento: "12345678",
    departamento: "4B",
    piso: 4,
    fechaEntrada: new Date(Date.now() - 3600000),
    estado: "en_edificio",
    autorizado: true,
    portero: "Carlos Menéndez",
    motivo: "Visita personal",
  },
  {
    id: "V002",
    visitante: "Juan Rodríguez",
    documento: "87654321",
    departamento: "2A",
    piso: 2,
    fechaEntrada: new Date(Date.now() - 7200000),
    fechaSalida: new Date(Date.now() - 3600000),
    estado: "salio",
    autorizado: true,
    portero: "Pedro García",
    motivo: "Reparación",
  },
  {
    id: "V003",
    visitante: "Ana Martínez",
    documento: "45678901",
    departamento: "6C",
    piso: 6,
    fechaEntrada: new Date(Date.now() - 1800000),
    estado: "en_edificio",
    autorizado: true,
    portero: "Carlos Menéndez",
    motivo: "Entrega",
  },
  {
    id: "V004",
    visitante: "Roberto López",
    documento: "23456789",
    departamento: "3D",
    piso: 3,
    fechaEntrada: new Date(Date.now() - 86400000),
    fechaSalida: new Date(Date.now() - 82800000),
    estado: "salio",
    autorizado: true,
    portero: "Pedro García",
  },
  {
    id: "V005",
    visitante: "Luis Gómez",
    documento: "56789012",
    departamento: "1A",
    piso: 1,
    fechaEntrada: new Date(Date.now() - 1200000),
    estado: "no_autorizado",
    autorizado: false,
    portero: "Carlos Menéndez",
  },
]

function getStatusColor(
  estado: "en_edificio" | "salio" | "no_autorizado",
  autorizado: boolean
) {
  if (!autorizado) return "destructive"
  if (estado === "en_edificio") return "default"
  if (estado === "salio") return "secondary"
  return "outline"
}

function getStatusLabel(
  estado: "en_edificio" | "salio" | "no_autorizado",
  autorizado: boolean
) {
  if (!autorizado) return "No autorizado"
  if (estado === "en_edificio") return "En edificio"
  if (estado === "salio") return "Salió"
  return "Desconocido"
}

function getStatusIcon(
  estado: "en_edificio" | "salio" | "no_autorizado",
  autorizado: boolean
) {
  if (!autorizado) return <XIcon className="size-3.5" />
  if (estado === "en_edificio") return <ClockIcon className="size-3.5" />
  if (estado === "salio") return <CheckIcon className="size-3.5" />
  return null
}

export function VisitTable({ visitas = mockVisitas, onCheckOut }: VisitTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow className="border-slate-200 hover:bg-slate-50">
            <TableHead className="h-12 px-4 py-3 text-sm font-semibold text-slate-900">
              Visitante
            </TableHead>
            <TableHead className="h-12 px-4 py-3 text-sm font-semibold text-slate-900">
              Documento
            </TableHead>
            <TableHead className="h-12 px-4 py-3 text-sm font-semibold text-slate-900">
              Departamento
            </TableHead>
            <TableHead className="h-12 px-4 py-3 text-sm font-semibold text-slate-900">
              Entrada
            </TableHead>
            <TableHead className="h-12 px-4 py-3 text-sm font-semibold text-slate-900">
              Estado
            </TableHead>
            <TableHead className="h-12 px-4 py-3 text-center text-sm font-semibold text-slate-900">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visitas.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-sm text-slate-500"
              >
                No hay visitas registradas
              </TableCell>
            </TableRow>
          ) : (
            visitas.map((visita) => (
              <TableRow
                key={visita.id}
                className="border-slate-200 hover:bg-slate-50/50 transition-colors"
              >
                <TableCell className="px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {visita.visitante}
                    </p>
                    {visita.motivo && (
                      <p className="text-xs text-slate-500">{visita.motivo}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-slate-600">
                  {visita.documento}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="text-sm font-medium text-slate-900">
                    {visita.departamento}
                  </div>
                  <div className="text-xs text-slate-500">
                    Piso {visita.piso}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-slate-600">
                  <div>{format(visita.fechaEntrada, "dd/MM/yyyy")}</div>
                  <div className="text-xs text-slate-500">
                    {formatDistanceToNow(visita.fechaEntrada, {
                      addSuffix: true,
                      locale: es,
                    })}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Badge
                    variant={getStatusColor(visita.estado, visita.autorizado)}
                    className="flex w-fit items-center gap-1.5 px-2.5 py-1"
                  >
                    {getStatusIcon(visita.estado, visita.autorizado)}
                    {getStatusLabel(visita.estado, visita.autorizado)}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      >
                        <EllipsisVerticalIcon className="size-4" />
                        <span className="sr-only">Abrir menú</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer">
                        Ver detalles
                      </DropdownMenuItem>
                      {visita.estado === "en_edificio" && (
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => onCheckOut?.(visita.id)}
                        >
                          Registrar salida
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="cursor-pointer">
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600">
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
