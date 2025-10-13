import { DataTable } from '@/components/data-table';
import {
  OrdenationInvestmentModel,
  OrderDirection,
  Regime,
} from '@/graphql/graphql';
import { InvestmentsQuery } from '../graphql/investments-queries';
import { InvestmentCreateForm } from './investment-create-form';
import { investmentsTableColumns } from './investments-table-columns';

export function InvestmentsTable({ regime }: { regime?: Regime }) {
  return (
    <DataTable
      mode="query"
      query={InvestmentsQuery}
      variables={
        regime
          ? {
              regime: regime.toUpperCase(),
            }
          : undefined
      }
      initialSorting={{
        key: OrdenationInvestmentModel.CorrectedAmount,
        direction: OrderDirection.Desc,
      }}
      columns={investmentsTableColumns}
      initialPageSize={50}
      actionButtons={<InvestmentCreateForm defaultRegime={regime} />}
    />
  );
}
