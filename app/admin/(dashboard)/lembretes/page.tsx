import { ReminderForm } from "@/components/ReminderForm";

export default function LembretesPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Envio de Lembretes de Pagamento
        </h1>
        <p className="text-muted-foreground">
          Use esta ferramenta para lembrar os clientes que ainda não realizaram
          o pagamento de suas reservas.
        </p>
      </div>

      <ReminderForm />
    </div>
  );
}
