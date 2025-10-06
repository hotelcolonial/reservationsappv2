"use client";

import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import Image from "next/image";

export default function PackagesSection() {
  return (
    <section className="relative py-24 px-6 sm:px-10">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hotel-table.jpg"
          alt="Mesa de restaurante elegante"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-[#0a3a2a]/85" />
      </div>

      <div className="container relative z-10 mx-auto">
        {/* Parte 1: Tarjetas de Presentación de Paquetes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Tarjeta de Navidad (Izquierda) */}
          <div className="relative overflow-hidden rounded-xl bg-[#0a3a2a]/90 backdrop-blur-sm p-8 shadow-md border border-amber-200/20">
            {/* Icono de estrella */}
            <div className="absolute top-4 right-4 text-amber-300">
              <StarIcon size={24} />
            </div>

            <div className="space-y-4">
              {/* Título */}
              <h3 className="font-greatvibes text-4xl text-amber-200">
                Celebração Natalina
              </h3>

              {/* Subtítulo */}
              <h4 className="text-xl font-serif text-white">
                Experiência Completa
              </h4>

              {/* Descripción */}
              <p className="font-radley text-amber-100/90 leading-relaxed">
                Desfrute de uma atmosfera mágica com decoração festiva, músicos
                ao vivo e um menu tradicional de Natal preparado com
                ingredientes premium. Uma experiência inesquecível para toda a
                família.
              </p>

              {/* Etiquetas inferiores */}
              <div className="flex flex-wrap gap-3 pt-4">
                <span className="px-3 py-1 rounded-full bg-[#0a3a2a] border border-amber-200/40 text-amber-200 text-sm font-radley">
                  24-25 Dezembro
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0a3a2a] border border-amber-200/40 text-amber-200 text-sm font-radley">
                  Especial
                </span>
              </div>
            </div>
          </div>

          {/* Tarjeta de Réveillon (Derecha) */}
          <div className="relative overflow-hidden rounded-xl bg-amber-200/90 backdrop-blur-sm p-8 shadow-md border border-amber-300/20">
            {/* Icono de estrella */}
            <div className="absolute top-4 right-4 text-[#0a3a2a]">
              <StarIcon size={24} />
            </div>

            <div className="space-y-4">
              {/* Título */}
              <h3 className="font-greatvibes text-4xl text-[#0a3a2a]">
                Réveillon Dourado
              </h3>

              {/* Subtítulo */}
              <h4 className="text-xl font-serif text-[#0a3a2a]">
                Ano Novo Especial
              </h4>

              {/* Descripción */}
              <p className="font-radley text-[#0a3a2a]/90 leading-relaxed">
                Receba o Ano Novo com elegância em nosso evento exclusivo.
                Jantar de gala, champagne à meia-noite e vista privilegiada para
                os fogos de artifício. Uma celebração sofisticada para começar
                2025 com estilo.
              </p>

              {/* Etiquetas inferiores */}
              <div className="flex flex-wrap gap-3 pt-4">
                <span className="px-3 py-1 rounded-full bg-[#e6d9b8] border border-[#0a3a2a]/40 text-[#0a3a2a] text-sm font-radley">
                  31 Dez - 01 Jan
                </span>
                <span className="px-3 py-1 rounded-full bg-[#e6d9b8] border border-[#0a3a2a]/40 text-[#0a3a2a] text-sm font-radley">
                  Premium
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Parte 3: Llamada a la Acción Final */}
        <div className="text-center space-y-6">
          <p className="font-radley text-lg text-amber-200">
            Pronto para criar memórias inesquecíveis? Garanta já o seu lugar.
          </p>

          <div>
            <Button
              variant="ghost"
              className="w-full md:w-auto md:bg-transparent border-[1px] border-amber-200 text-amber-200 hover:text-green-700 hover:bg-amber-200 italic font-light cursor-pointer"
            >
              Reservar Refeição
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
