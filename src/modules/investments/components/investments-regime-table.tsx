'use client';

import { DataTable, useDataTable } from '@/components/data-table';
import {
  InvestmentRegimeSummaryFragmentFragment,
  Regime,
} from '@/graphql/graphql';
import { InvestmentRegimesQuery } from '../graphql/investments-queries';
import { InvestmentCreateForm } from './investment-create-form';
import { NetworkStatus, useQuery } from '@apollo/client';
import { Spinner } from '@/components/spinner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatCurrency } from '@/lib/formatters/currency';
import { cn } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import { VariationBadge } from '@/components/variation-badge';

export function InvestmentRegimesTable() {
  const regimesQuery = useQuery(InvestmentRegimesQuery);

  return (
    <DataTable
      mode="no-query"
      data={
        regimesQuery.data?.investmentRegimes.edges?.map((e) => e.node) || []
      }
      networkStatus={regimesQuery.networkStatus}
      columns={[]}
      CustomBody={<InvestmentRegimesTableBody />}
    />
  );
}

function InvestmentRegimesTableBody() {
  const { table, columns, networkStatus } =
    useDataTable<InvestmentRegimeSummaryFragmentFragment>();

  const loading = networkStatus === NetworkStatus.loading;

  return loading ? (
    <div className="flex items-center justify-center gap-2">
      <Spinner className="aspect-square h-4 w-4" />
      Carregando...
    </div>
  ) : table.getRowModel().rows?.length ? (
    <div className="grid grid-cols-4 gap-4">
      {table.getRowModel().rows.map((row) => (
        <Card key={row.id}>
          <CardContent
            className={cn(row.original.quantity === 0 && 'opacity-50')}
          >
            <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 px-0">
              <CardTitle>{row.original.name}</CardTitle>
              <CardDescription>
                <span className="font-semibold">{row.original.quantity}</span>{' '}
                {row.original.quantity === 1 ? 'investimento' : 'investimentos'}
              </CardDescription>
            </CardHeader>

            <div className="flex flex-wrap gap-2">
              <div className="flex flex-1 flex-col">
                <p className="text-xs text-muted-foreground">Total investido</p>
                <p className="text-sm font-semibold">
                  {formatCurrency(row.original.totalInvested)}
                </p>
              </div>

              <div className="flex flex-1 flex-col">
                <p className="text-xs text-muted-foreground">Total atual</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">
                    {formatCurrency(row.original.currentInvested)}
                  </p>
                  <VariationBadge
                    variation={row.original.currentInvestedPercentage}
                    size="sm"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col">
                <p className="text-xs text-muted-foreground">
                  Total c/ dedução IRPF
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">
                    {formatCurrency(row.original.taxedInvested)}
                  </p>
                  <VariationBadge
                    variation={row.original.taxedInvestedPercentage}
                    size="sm"
                  />
                </div>
              </div>
            </div>

            <CardFooter className="flex flex-wrap gap-4 px-0 pb-0 pt-6">
              <Button
                variant="outline"
                size="sm"
                disabled={row.original.quantity === 0}
                className="flex-1"
                asChild
              >
                <Link
                  href={`/investments/${row.original.name.toLowerCase()}`}
                  className="flex items-center gap-1"
                >
                  <EyeIcon className="h-4 w-4" />
                  Ver investimentos
                </Link>
              </Button>

              <InvestmentCreateForm
                defaultRegime={row.original.name as Regime}
                triggerClassName="flex-1"
              />
            </CardFooter>
          </CardContent>
        </Card>
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center gap-2">
      Sem resultados.
    </div>
  );
}
