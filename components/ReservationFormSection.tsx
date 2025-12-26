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

// 2. DATOS DE NAVIDAD (Precios originales, pero se deshabilitarán)
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

// 3. DATOS DE REVEILLON (Precios Actualizados: Todo a 90 excepto la Cena a 280)
const reveillonOptions: MealOption[] = [
  {
    id: "reveillon-1",
    name: "Jantar de Boas-Vindas Italiano (30/12)",
    price: 90, // PRECIO FIJO 90
    originalPrice: 180,
    slug: "jantar-30",
  },
  {
    id: "reveillon-2",
    name: "Almoço de Véspera (31/12)",
    price: 90, // PRECIO FIJO 90
    originalPrice: 90,
    slug: "almoco-vespera-reveillon",
  },
  {
    id: "reveillon-3",
    name: "Jantar de Réveillon (31/12)",
    price: 280, // PRECIO REBAJADO A 280
    originalPrice: 380,
    slug: "jantar-vespera-reveillon",
  },
  {
    id: "reveillon-4",
    name: "Almoço de Ano Novo (01/01)",
    price: 90, // PRECIO FIJO 90
    originalPrice: 210,
    slug: "almoco-ano-novo",
  },
  {
    id: "reveillon-5",
    name: "Jantar de Ano Novo (01/01)",
    price: 90, // PRECIO FIJO 90
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
    setError(null);
    setIsSubmitting(true);

    if (selectedMeals.length === 0) {
      setError("Por favor, selecione pelo menos uma refeição.");
      setIsSubmitting(false);
      return;
    }

    const finalAdults = Number(adults) || 1;
    const finalChildren0_6 = Number(children_0_6) || 0;
    const finalChildren7_11 = Number(children_7_11) || 0;

    const selectedMealDetails = allMealOptions.filter((opt) =>
      selectedMeals.includes(opt.id)
    );

    try {
      await createReservationsForEvents(
        {
          name,
          email,
          adults: finalAdults,
          children_0_6: finalChildren0_6,
          children_7_11: finalChildren7_11,
          locator: null,
          is_verified: false,
        },
        selectedMealDetails
      );

      const eventsForEmail = selectedMealDetails.map((mealDetail) => {
        const eventPrice =
          mealDetail.price * finalAdults +
          mealDetail.price * finalChildren7_11 * 0.6;
        return {
          id: "Confirmado",
          name: mealDetail.name,
          date: mealDetail.id.includes("natal")
            ? "Dezembro de 2025"
            : "Final de Dezembro / Início de 2026",
          price: eventPrice,
        };
      });

      const emailPayload = {
        fullName: name,
        email: email,
        adults: finalAdults,
        children0to6: finalChildren0_6,
        children7to11: finalChildren7_11,
        bookedEvents: eventsForEmail,
        grandTotal: totalPrice,
        reservationDate: new Date().toLocaleDateString("pt-BR"),
      };

      try {
        await fetch("/api/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailPayload),
        });
      } catch (emailError) {
        console.warn("Error enviando email:", emailError);
      }

      setModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar");
    } finally {
      setIsSubmitting(false);
    }
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

          {/* --- BOTÓN LLAMATIVO DEL MENÚ --- */}
          <div className="mt-8 flex justify-center">
            <a
              href="https://online.fliphtml5.com/tollw/xttx/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-3 bg-[#0a3a2a] text-amber-200 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-200/30"
            >
              {/* Icono Menu */}
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
                Confira o Menu e a Programação
              </span>

              {/* Flecha animada */}
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
                required
                className="border-[#0a3a2a]/20 focus:border-[#0a3a2a] focus:ring-[#0a3a2a]"
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
                required
                className="border-[#0a3a2a]/20 focus:border-[#0a3a2a] focus:ring-[#0a3a2a]"
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
                onBlur={() => {
                  if (adults === "" || Number(adults) < 1) setAdults(1);
                }}
                required
                className="border-[#0a3a2a]/20 focus:border-[#0a3a2a] focus:ring-[#0a3a2a]"
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
                onBlur={() => {
                  if (children_0_6 === "" || Number(children_0_6) < 0)
                    setChildren0_6(0);
                }}
                className="border-[#0a3a2a]/20 focus:border-[#0a3a2a] focus:ring-[#0a3a2a]"
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
                onBlur={() => {
                  if (children_7_11 === "" || Number(children_7_11) < 0)
                    setChildren7_11(0);
                }}
                className="border-[#0a3a2a]/20 focus:border-[#0a3a2a] focus:ring-[#0a3a2a]"
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
                {/* Badge de Encerrado */}
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
                  {natalOptions.map((option) => {
                    return (
                      <div
                        key={option.id}
                        className="flex items-start space-x-2"
                      >
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
                    );
                  })}
                </div>
              </div>

              {/* --- Sección Reveillon (ACTIVA CON DESCUENTOS NUEVOS) --- */}
              <div className="bg-[#faf7f0] border border-amber-200/40 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Oferta Especial
                </div>

                <h4 className="font-greatvibes text-2xl text-[#0a3a2a] mb-1 text-center">
                  Celebração Dourada
                </h4>
                <p className="text-center text-xs text-red-600 font-semibold mb-4">
                  *Últimas vagas promocionais
                </p>

                <div className="space-y-4">
                  {reveillonOptions.map((option) => {
                    // Cálculo automático del porcentaje basado en los nuevos precios (90 o 280)
                    const discountPercentage = Math.round(
                      ((option.originalPrice - option.price) /
                        option.originalPrice) *
                        100
                    );
                    const hasDiscount = discountPercentage > 0;

                    return (
                      <div
                        key={option.id}
                        className="flex items-start space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={option.id}
                          checked={selectedMeals.includes(option.id)}
                          onChange={(e) =>
                            handleMealSelection(option.id, e.target.checked)
                          }
                          className="mt-1"
                        />
                        <label
                          htmlFor={option.id}
                          className="flex-1 font-radley text-[#0a3a2a]"
                        >
                          <div className="flex justify-between items-start">
                            <span>{option.name}</span>
                            {hasDiscount && (
                              <span className="bg-red-100 text-red-700 text-sm px-2 py-0.5 rounded ml-2 font-bold whitespace-nowrap border border-red-200">
                                -{discountPercentage}%
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {hasDiscount && (
                              <span className="text-sm text-gray-400 line-through">
                                R$ {option.originalPrice.toFixed(2)}
                              </span>
                            )}
                            <span
                              className={`font-bold ${
                                hasDiscount
                                  ? "text-md text-red-600"
                                  : "text-sm text-[#0a3a2a]/70"
                              }`}
                            >
                              R$ {option.price.toFixed(2)}
                            </span>
                          </div>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {error && (
              <p className="text-center text-red-600 font-semibold">{error}</p>
            )}
            <div className="text-center">
              {totalSavings > 0 && (
                <p className="text-sm text-red-600 font-medium mb-1">
                  Você está economizando: R$ {totalSavings.toFixed(2)} nesta
                  reserva!
                </p>
              )}
              <p className="font-radley text-lg text-[#0a3a2a]">
                <span className="font-semibold">Valor Total Estimado:</span>{" "}
                <span className="font-greatvibes text-2xl">
                  R$ {totalPrice.toFixed(2)}
                </span>
              </p>
            </div>
            <div className="text-center pt-4">
              <Button
                type="submit"
                variant="ghost"
                disabled={isSubmitting}
                className="w-full md:w-auto md:bg-transparent border-[1px] border-[#0a3a2a] text-[#0a3a2a] hover:text-amber-200 hover:bg-[#0a3a2a] italic font-light cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Enviando Reserva..." : "Finalizar Pré-Reserva"}
              </Button>
            </div>
          </div>
        </form>

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="bg-gradient-to-b from-[#faf7f0] to-white p-8 rounded-xl border-2 border-amber-100 shadow-lg max-w-md mx-auto">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-[#0a3a2a] p-3 rounded-full border-4 border-amber-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-200"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>

            <DialogHeader className="pt-4">
              <DialogTitle className="font-greatvibes text-4xl text-[#0a3a2a] text-center mt-2">
                Parabéns!
              </DialogTitle>
              <DialogDescription className="font-radley text-lg text-[#0a3a2a]/80 text-center mt-4 space-y-2">
                <span>Sua pré-reserva foi realizada com sucesso. </span>
                <span>
                  Em breve, nossa equipe comercial entrará em contato para
                  finalizar os detalhes e o pagamento com os valores
                  promocionais garantidos.
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-center gap-2 my-4">
              <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
              <div className="text-amber-300">✦</div>
              <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
            </div>

            <DialogFooter className="flex justify-center pt-2">
              <Button
                variant="ghost"
                className="bg-transparent cursor-pointer border-[1px] border-[#0a3a2a] text-[#0a3a2a] hover:text-amber-200 hover:bg-[#0a3a2a] italic font-light px-8"
                onClick={() => {
                  setModalOpen(false);
                  resetForm();
                }}
              >
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
