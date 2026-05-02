"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface VisitData {
  visitante: string;
  documento: string;
  departamento: string;
  fechaEntrada: string;
  fechaSalida?: string;
  motivo?: string;
  observaciones?: string;
  autorizado: boolean;
  portero: string;
  estado: "en_edificio" | "salio" | "no_autorizado";
}

interface VisitFormProps {
  onSubmit: (data: VisitData) => void | Promise<void>;
  initialData?: Partial<VisitData>;
}

const DEPARTAMENTOS = [
  { id: "101", label: "Depto 101 - Piso 1 - Torre A" },
  { id: "102", label: "Depto 102 - Piso 1 - Torre A" },
  { id: "201", label: "Depto 201 - Piso 2 - Torre A" },
  { id: "301", label: "Depto 301 - Piso 3 - Torre A" },
  { id: "401", label: "Depto 401 - Piso 4 - Torre A" },
  { id: "105", label: "Depto 105 - Piso 1 - Torre B" },
  { id: "205", label: "Depto 205 - Piso 2 - Torre B" },
];

const PORTEROS = [
  "Carlos Mendoza",
  "María López García",
  "Juan García Rodríguez",
  "Ana María Rodríguez",
  "Pedro Sánchez",
];

const MOTIVOS = [
  "Entrega de paquete",
  "Reparación",
  "Servicio técnico",
  "Visitante personal",
  "Mantenimiento",
  "Instalación",
];

export function VisitForm({ onSubmit, initialData }: VisitFormProps) {
  const [formData, setFormData] = useState<VisitData>({
    visitante: initialData?.visitante || "",
    documento: initialData?.documento || "",
    departamento: initialData?.departamento || "",
    fechaEntrada:
      initialData?.fechaEntrada ||
      new Date().toISOString().slice(0, 16),
    fechaSalida: initialData?.fechaSalida || "",
    motivo: initialData?.motivo || "",
    observaciones: initialData?.observaciones || "",
    autorizado: initialData?.autorizado ?? true,
    portero: initialData?.portero || "",
    estado: initialData?.estado || "en_edificio",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof VisitData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.visitante.trim())
      newErrors.visitante = "El nombre del visitante es requerido";
    if (!formData.documento.trim())
      newErrors.documento = "El documento es requerido";
    if (!formData.departamento)
      newErrors.departamento = "El departamento es requerido";
    if (!formData.fechaEntrada)
      newErrors.fechaEntrada = "La fecha de entrada es requerida";
    if (!formData.portero) newErrors.portero = "El portero es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await onSubmit(formData);
      setSubmitStatus("success");

      setFormData({
        visitante: "",
        documento: "",
        departamento: "",
        fechaEntrada: new Date().toISOString().slice(0, 16),
        fechaSalida: "",
        motivo: "",
        observaciones: "",
        autorizado: true,
        portero: "",
        estado: "en_edificio",
      });

      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      console.error("Error submitting visit:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    field: keyof VisitData,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl">
      <Card className="border-slate-200">
        <CardHeader className="border-b border-slate-200 bg-slate-50">
          <CardTitle className="text-base font-semibold text-slate-900">
            Registrar Nueva Visita
          </CardTitle>
          <p className="mt-1 text-sm text-slate-600">
            Completa la información del visitante y sus detalles de acceso
          </p>
        </CardHeader>

        <CardContent className="space-y-8 p-6">
          {/* Información del visitante */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Información del Visitante
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="visitante"
                  className="text-sm font-medium text-slate-700"
                >
                  Nombre completo <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="visitante"
                  placeholder="Ej: Roberto Carlos Fernández"
                  value={formData.visitante}
                  onChange={(e) =>
                    handleChange("visitante", e.target.value)
                  }
                  className={cn(
                    "border-slate-300",
                    errors.visitante &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                  disabled={isSubmitting}
                />
                {errors.visitante && (
                  <p className="text-xs text-red-500">
                    {errors.visitante}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="documento"
                  className="text-sm font-medium text-slate-700"
                >
                  Documento (DNI/Pasaporte){" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="documento"
                  placeholder="Ej: 12345678A"
                  value={formData.documento}
                  onChange={(e) =>
                    handleChange("documento", e.target.value)
                  }
                  className={cn(
                    "border-slate-300",
                    errors.documento &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                  disabled={isSubmitting}
                />
                {errors.documento && (
                  <p className="text-xs text-red-500">
                    {errors.documento}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Ubicación y personal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Ubicación y Personal
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="departamento"
                  className="text-sm font-medium text-slate-700"
                >
                  Departamento <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.departamento}
                  onValueChange={(value) =>
                    handleChange("departamento", value)
                  }
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    id="departamento"
                    className={cn(
                      "border-slate-300",
                      errors.departamento &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  >
                    <SelectValue placeholder="Seleccionar departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTAMENTOS.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.departamento && (
                  <p className="text-xs text-red-500">
                    {errors.departamento}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="portero"
                  className="text-sm font-medium text-slate-700"
                >
                  Portero <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.portero}
                  onValueChange={(value) =>
                    handleChange("portero", value)
                  }
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    id="portero"
                    className={cn(
                      "border-slate-300",
                      errors.portero &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  >
                    <SelectValue placeholder="Seleccionar portero" />
                  </SelectTrigger>
                  <SelectContent>
                    {PORTEROS.map((portero) => (
                      <SelectItem key={portero} value={portero}>
                        {portero}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.portero && (
                  <p className="text-xs text-red-500">
                    {errors.portero}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Horarios */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Horarios</h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="fechaEntrada"
                  className="text-sm font-medium text-slate-700"
                >
                  Fecha y hora de entrada{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fechaEntrada"
                  type="datetime-local"
                  value={formData.fechaEntrada}
                  onChange={(e) =>
                    handleChange("fechaEntrada", e.target.value)
                  }
                  className={cn(
                    "border-slate-300",
                    errors.fechaEntrada &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                  disabled={isSubmitting}
                />
                {errors.fechaEntrada && (
                  <p className="text-xs text-red-500">
                    {errors.fechaEntrada}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="fechaSalida"
                  className="text-sm font-medium text-slate-700"
                >
                  Fecha y hora de salida
                </Label>
                <Input
                  id="fechaSalida"
                  type="datetime-local"
                  value={formData.fechaSalida}
                  onChange={(e) =>
                    handleChange("fechaSalida", e.target.value)
                  }
                  className="border-slate-300"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Detalles de la visita */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Detalles de la Visita
            </h3>

            <div className="space-y-2">
              <Label
                htmlFor="motivo"
                className="text-sm font-medium text-slate-700"
              >
                Motivo de la visita
              </Label>
              <Select
                value={formData.motivo}
                onValueChange={(value) =>
                  handleChange("motivo", value)
                }
                disabled={isSubmitting}
              >
                <SelectTrigger
                  id="motivo"
                  className="border-slate-300"
                >
                  <SelectValue placeholder="Seleccionar motivo (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  {MOTIVOS.map((motivo) => (
                    <SelectItem key={motivo} value={motivo}>
                      {motivo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="estado"
                className="text-sm font-medium text-slate-700"
              >
                Estado actual <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.estado}
                onValueChange={(value) =>
                  handleChange("estado", value as any)
                }
                disabled={isSubmitting}
              >
                <SelectTrigger
                  id="estado"
                  className="border-slate-300"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en_edificio">
                    En el edificio
                  </SelectItem>
                  <SelectItem value="salio">Salió</SelectItem>
                  <SelectItem value="no_autorizado">
                    No autorizado
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <input
                  id="autorizado"
                  type="checkbox"
                  checked={formData.autorizado}
                  onChange={(e) =>
                    handleChange("autorizado", e.target.checked)
                  }
                  className="mt-1 h-4 w-4 rounded border-slate-300"
                  disabled={isSubmitting}
                />
                <Label
                  htmlFor="autorizado"
                  className="text-sm font-medium text-slate-700 cursor-pointer"
                >
                  Visita autorizada por el departamento
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="observaciones"
                className="text-sm font-medium text-slate-700"
              >
                Observaciones adicionales
              </Label>
              <Textarea
                id="observaciones"
                placeholder="Notas o comentarios sobre la visita..."
                value={formData.observaciones}
                onChange={(e) =>
                  handleChange("observaciones", e.target.value)
                }
                className="border-slate-300 min-h-24"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Status messages */}
          {submitStatus === "success" && (
            <div className="rounded-md border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-medium text-green-900">
                ✓ Visita registrada correctamente
              </p>
              <p className="mt-1 text-xs text-green-800">
                El registro está disponible en el historial de auditoría
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="rounded-md border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-900">
                ✕ Error al registrar la visita
              </p>
              <p className="mt-1 text-xs text-red-800">
                Intenta nuevamente o contacta al administrador
              </p>
            </div>
          )}

          {/* Submit buttons */}
          <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-6">
            <p className="text-xs text-slate-500">
              Los campos marcados con * son obligatorios
            </p>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-slate-900 text-white hover:bg-slate-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Registrando...
                  </span>
                ) : (
                  "Registrar visita"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
