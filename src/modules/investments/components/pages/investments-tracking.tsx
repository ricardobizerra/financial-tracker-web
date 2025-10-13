import { InvestmentsCards } from '../investments-cards';
import { InvestmentRegimesTable } from '../investments-regime-table';

export function InvestmentsTracking() {
  return (
    <div className="flex flex-col gap-4">
      <InvestmentsCards />
      <InvestmentRegimesTable />
    </div>
  );
}
