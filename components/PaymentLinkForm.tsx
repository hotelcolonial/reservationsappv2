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
import { sendPaymentLinkEmail } from "@/lib/actions/payment-link";
import { Loader2 } from "lucide-react";

export function PaymentLinkForm() {
  const [email, setEmail] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      const result = await sendPaymentLinkEmail(email, paymentLink);

      if (result.success) {
        toast.success(result.message);
        setEmail("");
        setPaymentLink("");
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Enviar Link de Pagamento</CardTitle>
        <CardDescription>
          O sistema buscará as reservas pendentes do cliente, calculará o total
          e enviará o link de pagamento.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <div className="space-y-2">
            <Label htmlFor="paymentLink">Link de Pagamento</Label>
            <Input
              id="paymentLink"
              type="url"
              placeholder="https://mpago.la/..."
              value={paymentLink}
              onChange={(e) => setPaymentLink(e.target.value)}
              required
              disabled={isPending}
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar Email com Link de Pagamento"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
