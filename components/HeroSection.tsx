"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="relative h-screen w-full flex flex-col overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Background Texture"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
        {/* Green overlay */}
        <div className="absolute inset-0 bg-[#0a3a2a]/85" />
      </div>

      {/* La capa de copos de nieve ahora se maneja globalmente a través del componente SnowEffect */}

      {/* Header */}
      <header className="w-full py-4 px-6 sm:px-10 z-20 flex items-center justify-between ">
        <div className="relative w-48 h-24">
          <Image
            src="/logotipo-hotel-colonial.png"
            alt="Hotel Colonial Iguaçu"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </header>

      {/* Main Hero Content */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10 z-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="font-pinyon text-4xl sm:text-5xl md:text-6xl text-amber-300 leading-tight">
            Celebre a Magia do Natal e a Energia do Réveillon
          </h1>
          <h2 className="font-serif text-xl sm:text-2xl text-amber-200 mt-4">
            Momentos inesquecíveis esperam por você no Hotel Colonial Iguaçu.
          </h2>
          <p className="font-radley text-lg text-amber-100/90 max-w-2xl mx-auto leading-relaxed">
            Reserve já sua experiência especial de fim de ano e desfrute de
            noites únicas repletas de encanto, boa gastronomia e celebração em
            grande estilo.
          </p>
          <Button
            onClick={() => {
              const section = document.getElementById("reservation-form");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
            variant="ghost"
            className="w-full md:w-auto md:bg-transparent border-[1px] border-amber-200 text-amber-200 hover:text-green-700 hover:bg-[#0a3a2a]/70 italic font-light cursor-pointer"
          >
            Reserve Agora
          </Button>
        </div>
      </div>

      {/* Decorative Images */}
      <div className="absolute bottom-0 left-0 w-auto h-[60vh] z-[2] opacity-40 md:opacity-100">
        <Image
          src="/gold-tree.png"
          alt="Decorative Christmas Tree"
          width={500}
          height={800}
          style={{ objectFit: "contain", height: "60vh", width: "auto" }}
        />
      </div>

      <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 z-[2]">
        <Image
          src="/gold-balls.png"
          alt="Decorative Christmas Ornaments"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
