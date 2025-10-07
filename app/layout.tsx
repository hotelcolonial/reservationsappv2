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
  title: "Reserva de Refeição | Hotel Colonial Iguaçu",
  description:
    "Garanta sua refeição no Hotel Colonial Iguaçu com praticidade e conforto. Preencha o formulário de reserva e aproveite momentos agradáveis em nosso restaurante.",

  openGraph: {
    title: "Reserva de Refeição | Hotel Colonial Iguaçu",
    description:
      "Faça sua reserva de refeição de forma rápida e segura. Desfrute de pratos preparados com carinho no Hotel Colonial Iguaçu.",
    url: "https://reservas.menucolonial.com.br",
    siteName: "Hotel Colonial Iguaçu",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Restaurante do Hotel Colonial Iguaçu",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },

  alternates: {
    canonical: "https://reservas.menucolonial.com.br",
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
