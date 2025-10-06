"use client";

import Image from "next/image";

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      scriptText: "Relaxe em nossa",
      mainText: "PISCINA",
      image: "/hotel-piscina.jpg",
      alt: "Piscina do Hotel Colonial Iguaçu",
    },
    {
      id: 2,
      scriptText: "Explore nosso",
      mainText: "PARQUE",
      image: "/hotel-parque.jpg",
      alt: "Parque do Hotel Colonial Iguaçu",
    },
    {
      id: 3,
      scriptText: "Desfrute do nosso",
      mainText: "RESTAURANTE",
      image: "/hotel-restaurante.jpg",
      alt: "Restaurante do Hotel Colonial Iguaçu",
    },
  ];

  return (
    <section className="py-20 px-6 sm:px-10 bg-[#0a3a2a]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-amber-300 mb-4">
            Nosso Hotel
          </h2>
          <p className="font-radley text-lg md:text-xl text-amber-100/80 max-w-3xl mx-auto">
            Conheça os ambientes elegantes e acolhedores do Hotel Colonial
            Iguaçu.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="relative aspect-square overflow-hidden rounded-md shadow-lg group"
            >
              {/* Card Background Image */}
              <Image
                src={feature.image}
                alt={feature.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />

              {/* Green Overlay */}
              <div className="absolute inset-0 bg-[#0a3a2a]/70 group-hover:bg-[#0a3a2a]/60 transition-colors duration-300"></div>

              {/* Card Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <p className="font-pinyon text-xl md:text-2xl text-amber-200 mb-2">
                  {feature.scriptText}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-white tracking-wider mb-4">
                  {feature.mainText}
                </h3>

                {/* Golden Accent Line */}
                <div className="w-12 h-1 bg-amber-300 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
