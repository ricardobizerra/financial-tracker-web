import { InvestmentCreateForm } from '../investment-create-form';
import { InvestmentsCards } from '../investments-cards';
import { InvestmentRegimesTable } from '../investments-regime-table';

export function InvestmentsTracking() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Investimentos</h1>
        <InvestmentCreateForm />
      </div>
      <InvestmentsCards />
      <InvestmentRegimesTable />
    </div>
  );
}
