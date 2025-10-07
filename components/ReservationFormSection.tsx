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

// Definición de los paquetes de comida con el SLUG
const natalOptions = [
  {
    id: "natal-1",
    name: "Jantar de Boas-Vindas Italiano",
    price: 160,
    slug: "jantar-23",
  },
  {
    id: "natal-2",
    name: "Almoço de Véspera (buffet simples)",
    price: 90,
    slug: "almoco-vespera-natal",
  },
  {
    id: "natal-3",
    name: "Jantar Especial de Véspera de Natal",
    price: 260,
    slug: "jantar-vespera-natal",
  },
  { id: "natal-4", name: "Almoço de Natal", price: 170, slug: "almoco-natal" },
  { id: "natal-5", name: "Jantar de Natal", price: 170, slug: "jantar-natal" },
];

const reveillonOptions = [
  {
    id: "reveillon-1",
    name: "Jantar de Boas-Vindas Italiano",
    price: 180,
    slug: "jantar-30",
  },
  {
    id: "reveillon-2",
    name: "Almoço de Véspera",
    price: 90,
    slug: "almoco-vespera-reveillon",
  },
  {
    id: "reveillon-3",
    name: "Jantar de Réveillon",
    price: 380,
    slug: "jantar-vespera-reveillon",
  },
  {
    id: "reveillon-4",
    name: "Almoço de Ano Novo",
    price: 210,
    slug: "almoco-ano-novo",
  },
  {
    id: "reveillon-5",
    name: "Jantar de Ano Novo",
    price: 210,
    slug: "jantar-ano-novo",
  },
];

const allMealOptions = [...natalOptions, ...reveillonOptions];

export default function ReservationFormSection() {
  // --- LÓGICA DEL HOOK ---
  const { createReservationsForEvents } = useReservations(); // Obtenemos la función de creación del hook

  // --- ESTADOS DE LA UI DEL FORMULARIO ---/*  */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adults, setAdults] = useState(1);
  const [children_0_6, setChildren0_6] = useState(0); // Corregido: guion bajo
  const [children_7_11, setChildren7_11] = useState(0); // Corregido: guion bajo
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [createdReservationsInfo, setCreatedReservationsInfo] = useState<
    { id: number; name: string }[]
  >([]);

  // --- ESTADOS DE ENVÍO Y ERROR (UI) ---
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
    const sumOfSelectedPrices = selectedMealsWithPrices.reduce(
      (sum, meal) => sum + meal.price,
      0
    );
    const total =
      sumOfSelectedPrices * adults + sumOfSelectedPrices * children_7_11 * 0.6;
    setTotalPrice(total);
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

    const selectedMealDetails = allMealOptions.filter((opt) =>
      selectedMeals.includes(opt.id)
    );

    try {
      // Esto se mantiene igual: creas las reservas en la BBDD
      const newReservations = await createReservationsForEvents(
        {
          name,
          email,
          adults,
          children_0_6,
          children_7_11,
          locator: null,
          is_verified: false,
        },
        selectedMealDetails
      );

      // --- INICIA EL NUEVO BLOQUE: ENVÍO DE EMAIL DE CONFIRMACIÓN ---
      if (newReservations) {
        // 1. Preparamos los datos que el email necesita
        const eventsForEmail = newReservations.map((reservation, index) => {
          const mealDetail = selectedMealDetails[index];
          const eventPrice =
            mealDetail.price * adults + mealDetail.price * children_7_11 * 0.6;

          return {
            id: reservation.id.toString(), // El email espera un string
            name: mealDetail.name,
            date: mealDetail.id.includes("natal")
              ? "Dezembro de 2024"
              : "Final de Dezembro / Início de 2025", // Puedes hacer esto más dinámico si quieres
            price: eventPrice,
          };
        });

        const emailPayload = {
          fullName: name,
          email: email,
          adults: adults,
          children0to6: children_0_6,
          children7to11: children_7_11,
          bookedEvents: eventsForEmail,
          grandTotal: totalPrice,
          reservationDate: new Date().toLocaleDateString("pt-BR"),
        };

        // 2. Hacemos la llamada a nuestra API para enviar el email
        try {
          await fetch("/api/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(emailPayload),
          });
        } catch (emailError) {
          // Si el email falla, no bloqueamos al usuario.
          // La reserva ya está en la BBDD.
          console.warn(
            "La reserva se creó, pero el email de confirmación falló:",
            emailError
          );
        }

        // --- FIN DEL NUEVO BLOQUE ---

        // Esto se mantiene igual: preparamos la info para el modal
        const infoForModal = newReservations.map((reservation, index) => ({
          id: reservation.id,
          name: selectedMealDetails[index].name,
        }));
        setCreatedReservationsInfo(infoForModal);
      }

      // Abrimos el modal al final
      setModalOpen(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao enviar a reserva. Tente novamente."
      );
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
            Colonial Iguaçu. Preencha o formulário abaixo para garantir sua
            vaga.
          </p>
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
                type="text"
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
                onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                required
                className="border-[#0a3a2a]/20 focus:border-[#0a3a2a] focus:ring-[#0a3a2a]"
              />
            </div>

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
                onChange={(e) => setChildren0_6(parseInt(e.target.value) || 0)}
                className="border-[#0a3a2a]/20 focus:border-[#0a3a2a] focus:ring-[#0a3a2a]"
              />
            </div>

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
                onChange={(e) => setChildren7_11(parseInt(e.target.value) || 0)}
                className="border-[#0a3a2a]/20 focus:border-[#0a3a2a] focus:ring-[#0a3a2a]"
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#0a3a2a]/5 to-[#0a3a2a]/10 rounded-xl p-6 sm:p-8">
            <h3 className="text-center font-greatvibes text-3xl text-[#0a3a2a] mb-8">
              Escolha suas Celebrações
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#faf7f0] border border-[#0a3a2a]/10 rounded-lg p-6">
                <h4 className="font-greatvibes text-2xl text-[#0a3a2a] mb-4 text-center">
                  Festividades Natalinas
                </h4>
                <div className="space-y-4">
                  {natalOptions.map((option) => (
                    <div key={option.id} className="flex items-start space-x-2">
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
                        {option.name}
                        <span className="block text-sm text-[#0a3a2a]/70">
                          R$ {option.price.toFixed(2)}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#faf7f0] border border-amber-200/40 rounded-lg p-6">
                <h4 className="font-greatvibes text-2xl text-[#0a3a2a] mb-4 text-center">
                  Celebração Dourada
                </h4>
                <div className="space-y-4">
                  {reveillonOptions.map((option) => (
                    <div key={option.id} className="flex items-start space-x-2">
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
                        {option.name}
                        <span className="block text-sm text-[#0a3a2a]/70">
                          R$ {option.price.toFixed(2)}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {error && (
              <p className="text-center text-red-600 font-semibold">{error}</p>
            )}
            <div className="text-center">
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
        {/* Parte 5: Modal de Confirmación */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="bg-gradient-to-b from-[#faf7f0] to-white p-8 rounded-xl border-2 border-amber-100 shadow-lg max-w-md mx-auto">
            {/* Decoración superior */}
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
                <span>Sua pré-reserva foi realizada com sucesso.</span>
                <span>
                  Em breve, nossa equipe comercial entrará em contato para
                  finalizar os detalhes e o pagamento.
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="my-6 py-4 px-6 bg-[#0a3a2a]/5 rounded-lg border border-[#0a3a2a]/10">
              <div className="text-center mb-3">
                <span className="font-radley text-sm text-[#0a3a2a]/60">
                  Detalhes da sua Pré-Reserva
                </span>
              </div>
              <div className="space-y-2 text-center">
                {/* Iteramos sobre el estado para mostrar cada reserva */}
                {createdReservationsInfo.map((info) => (
                  <div key={info.id}>
                    <span className="font-serif text-lg text-[#0a3a2a] font-bold tracking-wider">
                      ID: #{info.id}
                    </span>
                    <p className="font-radley text-sm text-[#0a3a2a] -mt-1">
                      {info.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decoración festiva */}
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
