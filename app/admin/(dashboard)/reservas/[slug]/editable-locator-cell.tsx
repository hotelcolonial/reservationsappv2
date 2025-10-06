"use client";

import { useState, useTransition } from "react";
import { Reservation } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { updateReservationLocator } from "@/lib/actions/reservations";
import { toast } from "sonner"; // Usaremos un toast para notificaciones (opcional pero recomendado)

interface EditableLocatorCellProps {
  reservation: Reservation;
  eventSlug: string;
}

export function EditableLocatorCell({
  reservation,
  eventSlug,
}: EditableLocatorCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentLocator, setCurrentLocator] = useState(
    reservation.locator || ""
  );
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    // No hacer nada si el valor no ha cambiado
    if (currentLocator === (reservation.locator || "")) {
      setIsEditing(false);
      return;
    }

    startTransition(async () => {
      const result = await updateReservationLocator(
        reservation.id,
        currentLocator,
        eventSlug
      );

      if (result.success) {
        toast.success(`Localizador de ${reservation.name} atualizado.`);
      } else {
        toast.error(`Falha ao atualizar: ${result.error}`);
        // Revertir el cambio en la UI si falla
        setCurrentLocator(reservation.locator || "");
      }
      setIsEditing(false);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      // Cancelar edición al presionar Escape
      setCurrentLocator(reservation.locator || "");
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <Input
        type="text"
        value={currentLocator}
        onChange={(e) => setCurrentLocator(e.target.value)}
        onBlur={handleSave} // Guardar también cuando pierde el foco
        onKeyDown={handleKeyDown}
        autoFocus // Enfocar automáticamente al hacer clic
        disabled={isPending} // Deshabilitar mientras se guarda
        className="w-40"
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="cursor-pointer min-h-[40px] flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {currentLocator ? (
        <span className="font-medium text-sky-600">{currentLocator}</span>
      ) : (
        <span className="text-muted-foreground italic">Adicionar...</span>
      )}
    </div>
  );
}
