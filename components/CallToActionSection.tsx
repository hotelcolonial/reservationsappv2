"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CallToActionSection() {
  return (
    <section className="relative py-12">
      {/* Fondo dorado crema suave y elegante */}
      <div className="absolute inset-0 bg-[#e6d9b8]"></div>

      <div className="relative z-10 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Columna Izquierda (Contenido de Texto) */}
          <div className="py-12 mb-3 px-6 sm:px-10 md:px-16 space-y-8">
            <div className="inline-block">
              <span className="px-4 py-1.5 rounded-full border border-[#c9b175] text-[#0a3a2a] text-sm font-radley">
                Temporada de Celebração 2025
              </span>
            </div>

            {/* Título Principal con font Great Vibes */}
            <div>
              <h2 className="font-greatvibes text-5xl sm:text-6xl md:text-7xl text-[#0a3a2a] leading-tight">
                Celebre Conosco
              </h2>
            </div>

            {/* Párrafo de Descripción con font Radley (igual al Hero) */}
            <p className="font-radley text-lg text-[#0a3a2a]/90 max-w-xl leading-relaxed">
              Momentos especiais em um ambiente acolhedor, com foco na sua
              experiência e bem-estar durante as festividades de fim de ano.
            </p>

            {/* Botón CTA con el mismo estilo que el del Hero */}
            <div className="pt-3">
              <Button
                variant="ghost"
                className="w-full md:w-auto md:bg-transparent border-[1px] border-[#0a3a2a] text-[#0a3a2a] hover:text-amber-200 hover:bg-[#0a3a2a] italic font-light cursor-pointer"
              >
                Fazer uma Reserva
              </Button>
            </div>
          </div>

          {/* Columna Derecha (Imagen) */}
          <div className="relative h-full min-h-[200px] md:min-h-[300px]">
            {/* Contenedor para la imagen con efecto sutil */}
            <div className="absolute inset-0 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/hotel-cta.jpg"
                alt="Hotel Colonial Iguaçu"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                className="rounded-lg"
                priority
              />
              {/* Overlay muy sutil para mantener la estética minimalista */}
              <div className="absolute inset-0 bg-[#0a3a2a]/5"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
