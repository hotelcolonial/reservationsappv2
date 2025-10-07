"use client";

import { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { sendReminderEmail } from "@/lib/actions/reminders";

export function ReminderForm() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      const result = await sendReminderEmail(email);

      if (result.success) {
        toast.success(result.message);
        setEmail(""); // Limpia el campo después del envío exitoso
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Enviar Lembrete por Email</CardTitle>
        <CardDescription>
          Insira o e-mail do cliente para enviar um aviso automático sobre a
          pendência de pagamento da reserva.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email do Cliente</Label>
            <Input
              id="email"
              type="email"
              placeholder="cliente@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isPending}
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full cursor-pointer"
          >
            {isPending ? "Enviando..." : "Enviar Lembrete"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
