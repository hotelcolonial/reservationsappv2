"use client";

import { useState, useEffect } from "react";
import { useReservations } from "@/lib/hooks/useRerservation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// 1. INTERFAZ
interface MealOption {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  slug: string;
}

// 2. DATOS DE NAVIDAD (CERRADO)
const natalOptions: MealOption[] = [
  {
    id: "natal-1",
    name: "Jantar de Boas-Vindas Italiano (23/12)",
    price: 110,
    originalPrice: 160,
    slug: "jantar-23",
  },
  {
    id: "natal-2",
    name: "Almoço de Véspera (24/12)",
    price: 90,
    originalPrice: 90,
    slug: "almoco-vespera-natal",
  },
  {
    id: "natal-3",
    name: "Jantar Especial de Véspera (24/12)",
    price: 220,
    originalPrice: 260,
    slug: "jantar-vespera-natal",
  },
  {
    id: "natal-4",
    name: "Almoço de Natal (25/12)",
    price: 110,
    originalPrice: 170,
    slug: "almoco-natal",
  },
  {
    id: "natal-5",
    name: "Jantar de Natal (25/12)",
    price: 110,
    originalPrice: 170,
    slug: "jantar-natal",
  },
];

// 3. DATOS DE REVEILLON (AHORA CERRADO TAMBIÉN)
const reveillonOptions: MealOption[] = [
  {
    id: "reveillon-1",
    name: "Jantar de Boas-Vindas Italiano (30/12)",
    price: 90,
    originalPrice: 180,
    slug: "jantar-30",
  },
  {
    id: "reveillon-2",
    name: "Almoço de Véspera (31/12)",
    price: 90,
    originalPrice: 90,
    slug: "almoco-vespera-reveillon",
  },
  {
    id: "reveillon-3",
    name: "Jantar de Réveillon (31/12)",
    price: 280,
    originalPrice: 380,
    slug: "jantar-vespera-reveillon",
  },
  {
    id: "reveillon-4",
    name: "Almoço de Ano Novo (01/01)",
    price: 90,
    originalPrice: 210,
    slug: "almoco-ano-novo",
  },
  {
    id: "reveillon-5",
    name: "Jantar de Ano Novo (01/01)",
    price: 90,
    originalPrice: 210,
    slug: "jantar-ano-novo",
  },
];

const allMealOptions: MealOption[] = [...natalOptions, ...reveillonOptions];

export default function ReservationFormSection() {
  const { createReservationsForEvents } = useReservations();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Estados para inputs numéricos
  const [adults, setAdults] = useState<number | string>(1);
  const [children_0_6, setChildren0_6] = useState<number | string>(0);
  const [children_7_11, setChildren7_11] = useState<number | string>(0);

  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMealSelection = (mealId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedMeals([...selectedMeals, mealId]);
    } else {
      setSelectedMeals(selectedMeals.filter((id) => id !== mealId));
    }
  };

  useEffect(() => {
    const selectedMealsWithPrices = allMealOptions.filter((option) =>
      selectedMeals.includes(option.id)
    );

    const numAdults = Number(adults) || 0;
    const numChildren7_11 = Number(children_7_11) || 0;

    const sumOfSelectedPrices = selectedMealsWithPrices.reduce(
      (sum, meal) => sum + meal.price,
      0
    );

    const total =
      sumOfSelectedPrices * numAdults +
      sumOfSelectedPrices * numChildren7_11 * 0.6;
    setTotalPrice(total);

    const sumOfOriginalPrices = selectedMealsWithPrices.reduce((sum, meal) => {
      return sum + meal.originalPrice;
    }, 0);

    const totalOriginal =
      sumOfOriginalPrices * numAdults +
      sumOfOriginalPrices * numChildren7_11 * 0.6;
    setTotalSavings(totalOriginal - total);
  }, [adults, children_7_11, selectedMeals]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setAdults(1);
    setChildren0_6(0);
    setChildren7_11(0);
    setSelectedMeals([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Bloqueo adicional por seguridad
    return;
  };

  return (
    <section
      id="reservation-form"
      className="relative py-24 px-6 sm:px-10 bg-white"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 space-y-4">
          <div className="space-y-2">
            <p className="text-[#0a3a2a]">Faça sua</p>
            <h2 className="text-4xl sm:text-5xl font-greatvibes font-bold text-[#0a3a2a]">
              Reserva Especial
            </h2>
            <p className="text-[#0a3a2a] mt-1">de Natal & Ano Novo</p>
          </div>
          <p className="font-radley text-[#0a3a2a]/90 max-w-2xl mx-auto">
            Reserve sua mesa para as celebrações mais especiais do ano no Hotel
            Colonial Iguaçu.
          </p>

          {/* --- BOTÓN MENÚ (AÚN VISIBLE PARA CONSULTA) --- */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <a
              href="https://online.fliphtml5.com/tollw/Pacotes-Reveillon/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-3 bg-[#0a3a2a] text-amber-200 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-200/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-90"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>

              <span className="font-radley text-lg font-medium tracking-wide">
                ✨ Confira os Pacotes de Réveillon 2026
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>

            <p className="font-greatvibes text-3xl text-[#0a3a2a] animate-pulse mt-2">
              Nos vemos em 2026! 🥂
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label
                htmlFor="name"
                className="font-radley mb-2 block text-[#0a3a2a]"
              >
                Nome Titular da Reserva
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled // Input deshabilitado
                className="border-[#0a3a2a]/20 focus:border-[#0a3a2a] focus:ring-[#0a3a2a] opacity-70"
              />
            </div>

            <div className="md:col-span-2">
              <Label
                htmlFor="email"
                className="font-radley mb-2 block text-[#0a3a2a]"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled // Input deshabilitado
                className="border-[#0a3a2a]/20 focus:border-[#0a3a2a] focus:ring-[#0a3a2a] opacity-70"
              />
            </div>

            {/* --- ADULTOS --- */}
            <div>
              <Label
                htmlFor="adults"
                className="font-radley mb-2 block text-[#0a3a2a]"
              >
                Adultos (Valor Integral)
              </Label>
              <Input
                id="adults"
                type="number"
                min="1"
                value={adults}
                onChange={(e) => {
                  const val = e.target.value;
                  setAdults(val === "" ? "" : parseInt(val));
                }}
                disabled // Input deshabilitado
                className="border-[#0a3a2a]/20 focus:border-[#0a3a2a] focus:ring-[#0a3a2a] opacity-70"
              />
            </div>

            {/* --- NIÑOS 0-6 --- */}
            <div>
              <Label
                htmlFor="children06"
                className="font-radley mb-2 block text-[#0a3a2a]"
              >
                Crianças 0-6 anos (Cortesia)
              </Label>
              <Input
                id="children06"
                type="number"
                min="0"
                value={children_0_6}
                onChange={(e) => {
                  const val = e.target.value;
                  setChildren0_6(val === "" ? "" : parseInt(val));
                }}
                disabled // Input deshabilitado
                className="border-[#0a3a2a]/20 focus:border-[#0a3a2a] focus:ring-[#0a3a2a] opacity-70"
              />
            </div>

            {/* --- NIÑOS 7-11 --- */}
            <div className="md:col-span-2">
              <Label
                htmlFor="children712"
                className="font-radley mb-2 block text-[#0a3a2a]"
              >
                Crianças 7-11 anos (40% desc.)
              </Label>
              <Input
                id="children712"
                type="number"
                min="0"
                value={children_7_11}
                onChange={(e) => {
                  const val = e.target.value;
                  setChildren7_11(val === "" ? "" : parseInt(val));
                }}
                disabled // Input deshabilitado
                className="border-[#0a3a2a]/20 focus:border-[#0a3a2a] focus:ring-[#0a3a2a] opacity-70"
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#0a3a2a]/5 to-[#0a3a2a]/10 rounded-xl p-6 sm:p-8">
            <h3 className="text-center font-greatvibes text-3xl text-[#0a3a2a] mb-8">
              Escolha suas Celebrações
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* --- Sección de Navidad (CERRADA) --- */}
              <div className="bg-[#faf7f0] border border-[#0a3a2a]/10 rounded-lg p-6 relative overflow-hidden opacity-60 grayscale-[0.5] cursor-not-allowed select-none">
                <div className="absolute top-0 right-0 bg-gray-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Vendas Encerradas
                </div>
                <h4 className="font-greatvibes text-2xl text-[#0a3a2a] mb-1 text-center">
                  Festividades Natalinas
                </h4>
                <p className="text-center text-xs text-gray-600 font-semibold mb-4">
                  *Evento finalizado
                </p>
                <div className="space-y-4 pointer-events-none">
                  {natalOptions.map((option) => (
                    <div key={option.id} className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id={option.id}
                        disabled={true}
                        className="mt-1"
                      />
                      <label
                        htmlFor={option.id}
                        className="flex-1 font-radley text-[#0a3a2a]"
                      >
                        <div className="flex justify-between items-start">
                          <span>{option.name}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-[#0a3a2a]/70">
                            R$ {option.price.toFixed(2)}
                          </span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- Sección Reveillon (AHORA TAMBIÉN CERRADA) --- */}
              <div className="bg-[#faf7f0] border border-[#0a3a2a]/10 rounded-lg p-6 relative overflow-hidden opacity-60 grayscale-[0.5] cursor-not-allowed select-none">
                {/* Badge de Esgotado */}
                <div className="absolute top-0 right-0 bg-gray-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Vagas Esgotadas
                </div>

                <h4 className="font-greatvibes text-2xl text-[#0a3a2a] mb-1 text-center">
                  Celebração Dourada
                </h4>
                <p className="text-center text-xs text-gray-600 font-semibold mb-4">
                  *Reservas Encerradas
                </p>

                <div className="space-y-4 pointer-events-none">
                  {reveillonOptions.map((option) => (
                    <div key={option.id} className="flex items-start space-x-2">
                      {/* Checkbox Desactivado */}
                      <input
                        type="checkbox"
                        id={option.id}
                        disabled={true}
                        className="mt-1"
                      />
                      <label
                        htmlFor={option.id}
                        className="flex-1 font-radley text-[#0a3a2a]"
                      >
                        <div className="flex justify-between items-start">
                          <span>{option.name}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-[#0a3a2a]/70">
                            R$ {option.price.toFixed(2)}
                          </span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center pt-4">
              {/* BOTÓN DESHABILITADO */}
              <Button
                type="button"
                variant="ghost"
                disabled={true}
                className="w-full md:w-auto bg-[#0a3a2a]/10 border-[1px] border-[#0a3a2a]/30 text-[#0a3a2a]/50 italic font-light cursor-not-allowed"
              >
                Reservas Encerradas
              </Button>
            </div>
          </div>
        </form>

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          {/* El modal se mantiene por si acaso, pero no se abrirá */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reserva</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
