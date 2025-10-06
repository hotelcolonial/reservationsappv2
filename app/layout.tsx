import type { Metadata } from "next";
import {
  Pinyon_Script,
  Radley,
  Open_Sans,
  Great_Vibes,
  Geist,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import SupabaseProvider from "@/lib/supabase/supabaseProvider";
import { Toaster } from "sonner";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pinyonScript = Pinyon_Script({
  weight: "400",
  variable: "--font-pinyon",
  subsets: ["latin"],
  display: "swap",
});

const radley = Radley({
  weight: "400",
  variable: "--font-radley",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-greatvibes",
  subsets: ["latin"],
  display: "swap",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${openSans.variable} ${pinyonScript.variable} ${radley.variable} ${greatVibes.variable} ${geistSans.variable} ${geistMono.variable} font-  antialiased`}
        >
          <SupabaseProvider>
            <Providers>{children}</Providers>
          </SupabaseProvider>
          <Toaster richColors />
        </body>
      </html>{" "}
    </ClerkProvider>
  );
}
