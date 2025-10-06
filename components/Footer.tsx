import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0a3a2a] py-12 px-6 text-center">
      <div className="container mx-auto max-w-4xl">
        {/* Nombre del Hotel */}
        <h3 className="font-greatvibes text-xl sm:text-2xl font-semibold text-amber-100 mb-4">
          Hotel Colonial Iguaçu
        </h3>

        {/* Separador decorativo */}
        <div className="flex justify-center gap-3 my-4 items-center">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent"></div>
          <div className="text-amber-200/40 text-xs">✦</div>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent"></div>
        </div>

        {/* Información de contacto */}
        <div className="font-radley text-amber-100/90 space-y-2 mt-6">
          <p className="hover:text-white transition-colors">
            Email:{" "}
            <a
              href="mailto:reservas@hotelcolonalfoz.com.br"
              className="underline-offset-4 hover:underline"
            >
              reservas@hotelcolonalfoz.com.br
            </a>
          </p>
          <p className="hover:text-white transition-colors">
            Telefone:{" "}
            <a
              href="tel:08008191993"
              className="underline-offset-4 hover:underline"
            >
              0800 819 1993
            </a>
          </p>
          <p className="max-w-2xl mx-auto leading-relaxed">
            Rodovia das Cataratas Km 20, 11237 - Parque Nacional do Iguaçu,
            <br className="hidden sm:inline" /> Foz do Iguaçu - PR, 85855-733
          </p>
        </div>

        {/* Línea de copyright */}
        <div className="mt-8 text-amber-100/60 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Hotel Colonial Iguaçu. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
