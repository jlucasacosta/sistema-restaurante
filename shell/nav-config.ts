import { LayoutDashboard, UtensilsCrossed, MessageSquare, CalendarClock, ClipboardList, Users, Settings, type LucideIcon } from "lucide-react"

export type NavItem = { label: string; href: string; icon: LucideIcon }

export const nav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Menú", href: "/menu", icon: UtensilsCrossed },
  { label: "Conversaciones", href: "/conversaciones", icon: MessageSquare },
  { label: "Reservas", href: "/reservas", icon: CalendarClock },
  { label: "Comandas", href: "/comandas", icon: ClipboardList },
  { label: "Contactos", href: "/contactos", icon: Users },
  { label: "Configuración", href: "/config", icon: Settings },
]

// Usuario de la demo (pie del menú). Ficticio: no es una cuenta real ni hay sesión.
export const usuarioDemo = { iniciales: "MR", etiqueta: "Cuenta demo" }
