import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Gift,
  PartyPopper,
  Utensils,
  Sun,
  MoonStar,
  Sparkles,
  CalendarDays,
  GlassWater,
  ChevronDown,
  Bell, // <-- Nuevo ícono
  Send, // <-- Nuevo ícono
  Link2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "./ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const menuGroups = [
  {
    label: "Natal",
    icon: Gift,
    subItems: [
      {
        title: "Jantar do dia 23",
        href: "/admin/reservas/jantar-23",
        icon: Utensils,
      },
      {
        title: "Almoço de Véspera",
        href: "/admin/reservas/almoco-vespera-natal",
        icon: Sun,
      },
      {
        title: "Jantar de Véspera",
        href: "/admin/reservas/jantar-vespera-natal",
        icon: Sparkles,
      },
      {
        title: "Almoço de Natal",
        href: "/admin/reservas/almoco-natal",
        icon: Gift,
      },
      {
        title: "Jantar de Natal",
        href: "/admin/reservas/jantar-natal",
        icon: MoonStar,
      },
    ],
  },
  {
    label: "Réveillon",
    icon: PartyPopper,
    subItems: [
      {
        title: "Jantar do dia 30",
        href: "/admin/reservas/jantar-30",
        icon: Utensils,
      },
      {
        title: "Almoço de Véspera",
        href: "/admin/reservas/almoco-vespera-reveillon",
        icon: Sun,
      },
      {
        title: "Jantar de Véspera",
        href: "/admin/reservas/jantar-vespera-reveillon",
        icon: PartyPopper,
      },
      {
        title: "Almoço de Ano Novo",
        href: "/admin/reservas/almoco-ano-novo",
        icon: CalendarDays,
      },
      {
        title: "Jantar de Ano Novo",
        href: "/admin/reservas/jantar-ano-novo",
        icon: GlassWater,
      },
    ],
  },
  {
    label: "Açoes", // Título de la nueva sección: "Recordatorios"
    icon: Bell, // Ícono de campana para la sección
    subItems: [
      {
        title: "Enviar Link", // Nuevo título
        href: "/admin/enviar-link", // Nueva ruta
        icon: Link2, // Nuevo ícono
      },
      {
        title: "Enviar Lembrete", // Título del sub-ítem: "Enviar Recordatorios"
        href: "/admin/lembretes", // Nueva ruta para la página de envío
        icon: Send, // Ícono de enviar
      },
    ],
  },
];

const AppSidebar = () => {
  return (
    <TooltipProvider>
      <Sidebar collapsible="icon">
        {/* SECCIÓN 1: HEADER */}
        <SidebarHeader className="py-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton asChild>
                    <Link href="/admin">
                      <Image
                        src="/logotipo-hotel-colonial.png"
                        alt="Logotipo do Hotel Colonial"
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      <span>Hotel Colonial Iguaçu</span>
                    </Link>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Hotel Colonial Iguaçu
                </TooltipContent>
              </Tooltip>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarSeparator />

        {/* SECCIÓN 2: CONTENIDO PRINCIPAL */}
        <SidebarContent className="pt-6">
          <SidebarMenu>
            <SidebarMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton asChild>
                    <Link className="flex items-center pl-4" href="/admin">
                      <Home />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Dashboard
                </TooltipContent>
              </Tooltip>
            </SidebarMenuItem>
          </SidebarMenu>

          {/* SECCIÓN 3: GRUPO DE RESERVAS MEJORADO */}
          <SidebarGroup>
            <SidebarGroupLabel>Reservas</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuGroups.map((group) => (
                  <SidebarMenuItem key={group.label}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {/* El botón principal que abre/cierra el sub-menú */}
                        <SidebarMenuButton>
                          {/* PASO 1: REINTRODUCIR EL ICONO */}
                          {/*        <group.icon /> */}
                          <span>{group.label}</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      {/* PASO 2: AÑADIR EL CONTENIDO DEL TOOLTIP */}
                      <TooltipContent side="right" sideOffset={5}>
                        {group.label}
                      </TooltipContent>
                    </Tooltip>

                    {/* El contenedor del sub-menú no cambia */}
                    <SidebarMenuSub>
                      {group.subItems.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={item.href} className="text-[13px]">
                              <item.icon className="mr-2 h-4 w-4" />
                              {item.title}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        {/* SECCIÓN 4: FOOTER (sin cambios) */}
        <SidebarFooter>
          {" "}
          <SignOutButton>
            <Button className="cursor-pointer text-sm">Sair</Button>
          </SignOutButton>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
};

export default AppSidebar;
