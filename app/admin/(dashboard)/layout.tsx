import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { Toaster } from "sonner";

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
