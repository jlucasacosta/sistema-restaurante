import { LayoutDashboard, UtensilsCrossed, MessageSquare, CalendarClock, ClipboardList, Users, Settings, type LucideIcon } from "lucide-react"

export type NavItem = { label: string; href: string; icon: LucideIcon }

export const nav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Menu", href: "/menu", icon: UtensilsCrossed },
  { label: "Conversaciones", href: "/conversaciones", icon: MessageSquare },
  { label: "Reservas", href: "/reservas", icon: CalendarClock },
  { label: "Comandas", href: "/comandas", icon: ClipboardList },
  { label: "Contactos", href: "/contactos", icon: Users },
  { label: "Configuracion", href: "/config", icon: Settings },
]
