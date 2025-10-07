import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Dashboard Geral | Admin Hotel Colonial Iguaçu",
  description:
    "Painel de administração para visualizar o resumo geral das reservas dos eventos especiais de fim de ano.",

  // ¡MUY IMPORTANTE! Esto evita que Google y otros buscadores indexen tu panel de admin.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },

  // Opcional: Añade un favicon para una apariencia más profesional
  icons: {
    icon: "/favicon.ico", // Asegúrate de tener un favicon.ico en tu carpeta /public
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider defaultOpen={defaultOpen}>
        <div className="font-geist antialiased flex min-h-screen w-full">
          <div className="no-print">
            <AppSidebar />
          </div>
          <main className="w-full px-2">
            <div className="no-print">
              <Navbar />
            </div>
            <div className="px-4">{children}</div>
          </main>
          <Toaster richColors />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
