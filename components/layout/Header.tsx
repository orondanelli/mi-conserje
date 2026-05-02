"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  UserIcon,
  LogOutIcon,
  HelpCircleIcon,
  SettingsIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  title: string
  subtitle?: string
  userName?: string
  userEmail?: string
  userInitials?: string
}

export function Header({
  title,
  subtitle,
  userName = "Orlando Rondanelli",
  userEmail = "orlando.rondanelliortiz@cencosud.cl",
  userInitials = "OR",
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left section - Title */}
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-semibold text-slate-900 truncate font-display">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-slate-500 truncate">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right section - User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto flex items-center gap-2 h-auto px-2 py-1"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage alt={userName} />
                <AvatarFallback className="bg-slate-100 text-slate-700 text-xs font-medium">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:grid grid-cols-1 gap-0.5 text-left">
                <span className="text-sm font-medium text-slate-900 leading-none">
                  {userName}
                </span>
                <span className="text-xs text-slate-500 leading-none truncate">
                  {userEmail}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage alt={userName} />
                  <AvatarFallback className="bg-slate-100 text-slate-700 text-xs font-medium">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <span className="text-sm font-medium text-slate-900">
                    {userName}
                  </span>
                  <span className="text-xs text-slate-500 break-all">
                    {userEmail}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Mi perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircleIcon className="mr-2 h-4 w-4" />
                <span>Ayuda</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
