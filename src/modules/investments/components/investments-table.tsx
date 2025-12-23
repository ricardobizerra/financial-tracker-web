import { DataTable } from '@/components/data-table';
import {
  OrdenationInvestmentModel,
  OrderDirection,
  Regime,
} from '@/graphql/graphql';
import { InvestmentsQuery } from '../graphql/investments-queries';
import { InvestmentCreateForm } from './investment-create-form';
import { investmentsTableColumns } from './investments-table-columns';

interface InvestmentsTableProps {
  regime: Regime;
  accountId?: string;
}

export function InvestmentsTable({ regime, accountId }: InvestmentsTableProps) {
  return (
    <DataTable
      mode="query"
      query={InvestmentsQuery}
      variables={{
        regime: regime,
        accountId: accountId,
      }}
      initialSorting={{
        key: OrdenationInvestmentModel.CorrectedAmount,
        direction: OrderDirection.Desc,
      }}
      columns={investmentsTableColumns({
        isPoupanca: regime === Regime.Poupanca,
      })}
      initialPageSize={50}
      actionButtons={<InvestmentCreateForm defaultRegime={regime} />}
    />
  );
}
