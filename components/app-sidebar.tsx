"use client"

import * as React from "react"
import Link from "next/link"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  UsersIcon,
  PackageIcon,
  FileTextIcon,
  Settings2Icon,
  ShieldCheckIcon,
} from "lucide-react"

const data = {
  user: {
    name: "Orlando Rondanelli",
    email: "orlando.rondanelliortiz@cencosud.cl",
    avatar: "/avatars/orlando.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: <LayoutDashboardIcon className="size-4" />,
    },
    {
      title: "Visitas",
      url: "/visitas",
      icon: <UsersIcon className="size-4" />,
    },
    {
      title: "Paquetes",
      url: "/paquetes",
      icon: <PackageIcon className="size-4" />,
    },
    {
      title: "Auditoría",
      url: "/auditoria",
      icon: <FileTextIcon className="size-4" />,
    },
  ],
  navSecondary: [
    {
      title: "Configuración",
      url: "/configuracion",
      icon: <Settings2Icon className="size-4" />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <ShieldCheckIcon className="size-5!" />
                <span className="text-base font-semibold">Mi Conserje</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
