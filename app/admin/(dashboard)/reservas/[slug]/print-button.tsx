"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export function PrintButton() {
  const handlePrint = () => {
    window.print(); // Llama a la API de impresión del navegador
  };

  return (
    <Button
      onClick={handlePrint}
      className="bg-green-600 hover:bg-green-700 no-print" // <-- Añadimos la clase 'no-print'
    >
      <Printer className="mr-2 h-4 w-4" />
      Imprimir Lista
    </Button>
  );
}
