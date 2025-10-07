import { PaymentLinkForm } from "@/components/PaymentLinkForm";

export const metadata = {
  title: "Enviar Link de Pagamento | Admin",
};

export default function EnviarLinkPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Enviar Link de Pagamento
        </h1>
        <p className="text-muted-foreground">
          Envie o link de pagamento para clientes com reservas pendentes.
        </p>
      </div>

      <PaymentLinkForm />
    </div>
  );
}
