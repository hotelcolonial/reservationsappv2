"use client";

import { useState, useTransition } from "react";
import { Reservation } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { verifyReservation } from "@/lib/actions/reservations";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";

interface VerificationCellProps {
  reservation: Reservation;
  eventSlug: string;
}

export function VerificationCell({
  reservation,
  eventSlug,
}: VerificationCellProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleConfirmVerification = () => {
    // 3. Cierra el modal inmediatamente y luego inicia la acción del servidor
    setOpen(false);
    startTransition(async () => {
      const result = await verifyReservation(reservation.id, eventSlug);

      if (result.success) {
        toast.success(`Reserva de ${reservation.name} verificada com sucesso.`);
      } else {
        toast.error(`Falha ao verificar: ${result.error}`);
      }
    });
  };

  if (isPending) {
    return (
      <Button size="sm" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Verificando...
      </Button>
    );
  }

  // 1. Si la reserva ya está verificada, mostramos el estado final
  if (reservation.is_verified) {
    return (
      <div className="flex items-center space-x-2 text-green-600 font-medium">
        <CheckCircle2 className="h-4 w-4" />
        <span>Verificado</span>
      </div>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="cursor-pointer">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Verificar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação marcará a reserva como verificada e não pode ser desfeita.
            Isso confirma que o pagamento foi recebido.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmVerification}
            disabled={isPending} // Es importante mantener esto para evitar dobles clics
            className="bg-green-600 hover:bg-green-700 cursor-pointer"
          >
            {/* --- 2. Lógica para mostrar el spinner --- */}
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verificando...
              </>
            ) : (
              "Sim, confirmar verificação"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
