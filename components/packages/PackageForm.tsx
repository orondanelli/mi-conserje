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

export interface PackageData {
  numeroGuia?: string;
  empresa: string;
  departamento: string;
  descripcion?: string;
  fechaRecepcion: string;
  fechaEntrega?: string;
  porteroRecepcion: string;
  porteroEntrega?: string;
  receptorEntrega?: string;
  documentoReceptor?: string;
  observaciones?: string;
  estado: "pendiente" | "entregado" | "devuelto";
  notificado: boolean;
}

interface PackageFormProps {
  mode: "reception" | "delivery";
  onSubmit: (data: PackageData) => void | Promise<void>;
  initialData?: Partial<PackageData>;
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

const EMPRESAS = [
  "DHL Express",
  "FedEx",
  "Correo Argentino",
  "Mercado Envíos",
  "OCA",
  "Andreani",
  "Urgente 24",
  "TBA Logística",
];

export function PackageForm({
  mode,
  onSubmit,
  initialData,
}: PackageFormProps) {
  const isReception = mode === "reception";
  const isDelivery = mode === "delivery";

  const [formData, setFormData] = useState<PackageData>({
    numeroGuia: initialData?.numeroGuia || "",
    empresa: initialData?.empresa || "",
    departamento: initialData?.departamento || "",
    descripcion: initialData?.descripcion || "",
    fechaRecepcion:
      initialData?.fechaRecepcion ||
      new Date().toISOString().slice(0, 16),
    fechaEntrega: initialData?.fechaEntrega || "",
    porteroRecepcion: initialData?.porteroRecepcion || "",
    porteroEntrega: initialData?.porteroEntrega || "",
    receptorEntrega: initialData?.receptorEntrega || "",
    documentoReceptor: initialData?.documentoReceptor || "",
    observaciones: initialData?.observaciones || "",
    estado: initialData?.estado || "pendiente",
    notificado: initialData?.notificado ?? false,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof PackageData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.empresa.trim())
      newErrors.empresa = "La empresa de envío es requerida";
    if (!formData.departamento)
      newErrors.departamento = "El departamento es requerido";

    if (isReception) {
      if (!formData.fechaRecepcion)
        newErrors.fechaRecepcion = "La fecha de recepción es requerida";
      if (!formData.porteroRecepcion)
        newErrors.porteroRecepcion = "El portero de recepción es requerido";
    }

    if (isDelivery) {
      if (!formData.fechaEntrega)
        newErrors.fechaEntrega = "La fecha de entrega es requerida";
      if (!formData.porteroEntrega)
        newErrors.porteroEntrega = "El portero de entrega es requerido";
      if (!formData.receptorEntrega)
        newErrors.receptorEntrega = "El receptor es requerido";
    }

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
        numeroGuia: "",
        empresa: "",
        departamento: "",
        descripcion: "",
        fechaRecepcion: new Date().toISOString().slice(0, 16),
        fechaEntrega: "",
        porteroRecepcion: "",
        porteroEntrega: "",
        receptorEntrega: "",
        documentoReceptor: "",
        observaciones: "",
        estado: "pendiente",
        notificado: false,
      });

      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      console.error("Error submitting package:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    field: keyof PackageData,
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

  const title = isReception
    ? "Registrar Recepción de Paquete"
    : "Registrar Entrega de Paquete";
  const subtitle = isReception
    ? "Completa la información del paquete recibido"
    : "Completa la información de la entrega";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl">
      <Card className="border-slate-200">
        <CardHeader className="border-b border-slate-200 bg-slate-50">
          <CardTitle className="text-base font-semibold text-slate-900">
            {title}
          </CardTitle>
          <p className="mt-1 text-sm text-slate-600">
            {subtitle}
          </p>
        </CardHeader>

        <CardContent className="space-y-8 p-6">
          {/* Información del paquete */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Información del Paquete
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="numeroGuia"
                  className="text-sm font-medium text-slate-700"
                >
                  Número de guía/tracking
                </Label>
                <Input
                  id="numeroGuia"
                  placeholder="Ej: 1234567890AB"
                  value={formData.numeroGuia}
                  onChange={(e) =>
                    handleChange("numeroGuia", e.target.value)
                  }
                  className="border-slate-300"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="empresa"
                  className="text-sm font-medium text-slate-700"
                >
                  Empresa de envío <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.empresa}
                  onValueChange={(value) =>
                    handleChange("empresa", value)
                  }
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    id="empresa"
                    className={cn(
                      "border-slate-300",
                      errors.empresa &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  >
                    <SelectValue placeholder="Seleccionar empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPRESAS.map((empresa) => (
                      <SelectItem key={empresa} value={empresa}>
                        {empresa}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.empresa && (
                  <p className="text-xs text-red-500">
                    {errors.empresa}
                  </p>
                )}
              </div>
            </div>

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
                htmlFor="descripcion"
                className="text-sm font-medium text-slate-700"
              >
                Descripción del contenido
              </Label>
              <Textarea
                id="descripcion"
                placeholder="Ej: 2 cajas con accesorios electrónicos, 1 paquete con libros..."
                value={formData.descripcion}
                onChange={(e) =>
                  handleChange("descripcion", e.target.value)
                }
                className="border-slate-300 min-h-20"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Sección de recepción */}
          {isReception && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">
                Datos de Recepción
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="fechaRecepcion"
                    className="text-sm font-medium text-slate-700"
                  >
                    Fecha y hora de recepción{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fechaRecepcion"
                    type="datetime-local"
                    value={formData.fechaRecepcion}
                    onChange={(e) =>
                      handleChange("fechaRecepcion", e.target.value)
                    }
                    className={cn(
                      "border-slate-300",
                      errors.fechaRecepcion &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                    disabled={isSubmitting}
                  />
                  {errors.fechaRecepcion && (
                    <p className="text-xs text-red-500">
                      {errors.fechaRecepcion}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="porteroRecepcion"
                    className="text-sm font-medium text-slate-700"
                  >
                    Portero que recibe{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.porteroRecepcion}
                    onValueChange={(value) =>
                      handleChange("porteroRecepcion", value)
                    }
                    disabled={isSubmitting}
                  >
                    <SelectTrigger
                      id="porteroRecepcion"
                      className={cn(
                        "border-slate-300",
                        errors.porteroRecepcion &&
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
                  {errors.porteroRecepcion && (
                    <p className="text-xs text-red-500">
                      {errors.porteroRecepcion}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <input
                    id="notificado"
                    type="checkbox"
                    checked={formData.notificado}
                    onChange={(e) =>
                      handleChange("notificado", e.target.checked)
                    }
                    className="mt-1 h-4 w-4 rounded border-slate-300"
                    disabled={isSubmitting}
                  />
                  <Label
                    htmlFor="notificado"
                    className="text-sm font-medium text-slate-700 cursor-pointer"
                  >
                    ¿Se notificó al departamento sobre la llegada del paquete?
                  </Label>
                </div>
              </div>
            </div>
          )}

          {/* Sección de entrega */}
          {isDelivery && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">
                Datos de Entrega
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="fechaEntrega"
                    className="text-sm font-medium text-slate-700"
                  >
                    Fecha y hora de entrega{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fechaEntrega"
                    type="datetime-local"
                    value={formData.fechaEntrega}
                    onChange={(e) =>
                      handleChange("fechaEntrega", e.target.value)
                    }
                    className={cn(
                      "border-slate-300",
                      errors.fechaEntrega &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                    disabled={isSubmitting}
                  />
                  {errors.fechaEntrega && (
                    <p className="text-xs text-red-500">
                      {errors.fechaEntrega}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="porteroEntrega"
                    className="text-sm font-medium text-slate-700"
                  >
                    Portero que entrega{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.porteroEntrega}
                    onValueChange={(value) =>
                      handleChange("porteroEntrega", value)
                    }
                    disabled={isSubmitting}
                  >
                    <SelectTrigger
                      id="porteroEntrega"
                      className={cn(
                        "border-slate-300",
                        errors.porteroEntrega &&
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
                  {errors.porteroEntrega && (
                    <p className="text-xs text-red-500">
                      {errors.porteroEntrega}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="receptorEntrega"
                    className="text-sm font-medium text-slate-700"
                  >
                    Quien recibe el paquete{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="receptorEntrega"
                    placeholder="Ej: María González"
                    value={formData.receptorEntrega}
                    onChange={(e) =>
                      handleChange("receptorEntrega", e.target.value)
                    }
                    className={cn(
                      "border-slate-300",
                      errors.receptorEntrega &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                    disabled={isSubmitting}
                  />
                  {errors.receptorEntrega && (
                    <p className="text-xs text-red-500">
                      {errors.receptorEntrega}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="documentoReceptor"
                    className="text-sm font-medium text-slate-700"
                  >
                    Documento del receptor
                  </Label>
                  <Input
                    id="documentoReceptor"
                    placeholder="Ej: 34567890B"
                    value={formData.documentoReceptor}
                    onChange={(e) =>
                      handleChange("documentoReceptor", e.target.value)
                    }
                    className="border-slate-300"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Estado y observaciones */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Estado y Observaciones
            </h3>

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
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="entregado">Entregado</SelectItem>
                  <SelectItem value="devuelto">Devuelto</SelectItem>
                </SelectContent>
              </Select>
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
                placeholder="Notas o comentarios sobre el paquete..."
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
                ✓ Paquete registrado correctamente
              </p>
              <p className="mt-1 text-xs text-green-800">
                El registro está disponible en el historial de auditoría
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="rounded-md border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-900">
                ✕ Error al registrar el paquete
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
                    {isReception
                      ? "Registrando recepción..."
                      : "Registrando entrega..."}
                  </span>
                ) : isReception ? (
                  "Registrar recepción"
                ) : (
                  "Registrar entrega"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
