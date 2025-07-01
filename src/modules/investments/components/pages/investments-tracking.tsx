import { InvestmentsTable } from '../investments-table';
import { InvestmentsCards } from '../investments-cards';

export function InvestmentsTracking() {
  return (
    <div className="flex flex-col gap-4">
      <InvestmentsCards />
      <InvestmentsTable />
    </div>
  );
}
