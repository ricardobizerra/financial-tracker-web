import { CashFlowOverview } from '@/modules/cash-flow/components/cash-flow-overview';

export default function CashFlowPage() {
  return (
    <div className="flex flex-col gap-4 lg:min-h-0 lg:flex-1">
      <h1 className="text-2xl font-bold">Fluxo de Caixa</h1>
      <CashFlowOverview />
    </div>
  );
}
