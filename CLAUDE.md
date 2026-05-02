# mi-conserje

Sistema de registro de visitas y paquetes para edificios con trazabilidad completa para auditorías

## Stack
- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS + shadcn/ui
- Vercel

## Design System
- Estilo: institutional clean record-focused
- Color: slate
- Display font: Inter Tight
- Body font: Inter
- Dark mode: No

## Páginas
- **Dashboard** (`/`): Vista principal con resumen diario y acceso rápido a registros
- **Visitas** (`/visitas`): Registro y listado de todas las visitas
- **Paquetes** (`/paquetes`): Control de paquetes recibidos y entregados
- **Auditoria** (`/auditoria`): Historial completo para revisión y auditoría

## Componentes
- **MainLayout**: Layout principal con sidebar de navegación
- **Header**: Header con título y usuario actual
- **DashboardStats**: Cards con estadísticas diarias
- **RecentActivity**: Lista de actividad reciente
- **QuickActions**: Botones de acceso rápido
- **VisitForm**: Formulario para registrar nueva visita
- **VisitTable**: Tabla de visitas con acciones
- **VisitFilters**: Filtros para búsqueda de visitas
- **PackageForm**: Formulario para registrar paquete
- **PackageTable**: Tabla de paquetes con estado
- **PackageFilters**: Filtros para paquetes
- **DeliveryStatus**: Componente para cambiar estado de entrega
- **AuditTable**: Tabla de auditoría con todos los registros
- **AuditFilters**: Filtros avanzados para auditoría
- **ExportActions**: Opciones de exportación de reportes
