'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TransactionFragmentFragment,
  TransactionStatus,
  TransactionType,
} from '@/graphql/graphql';
import { TransactionsTable } from './transactions-table';
import { BalanceForecastChart } from './balance-forecast-chart';
import { TransactionsCalendar } from './transactions-calendar';
import { FinancialAgenda } from './financial-agenda';
import { TableIcon, LineChart, Calendar, ClipboardList } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { TransactionsQuery } from '../graphql/transactions-queries';
import { useParams, useSearchParams } from 'next/navigation';

interface TransactionsViewsProps {
  accountId?: string;
  initialBalance?: number;
  hiddenColumns?: string[];
}

export function TransactionsViews({
  accountId,
  initialBalance = 0,
  hiddenColumns = [],
}: TransactionsViewsProps) {
  const [activeTab, setActiveTab] = useState('table');
  const params = useParams<{ accountId?: string }>();
  const effectiveAccountId = accountId || params.accountId;

  // Query para obter todas as transações (para visualizações que precisam de dados completos)
  const { data, loading } = useQuery(TransactionsQuery, {
    variables: {
      first: 500, // Buscar mais transações para as visualizações
      accountId: effectiveAccountId,
    },
  });

  const transactions =
    data?.transactions?.edges?.map((edge) => edge.node) || [];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4 grid w-full grid-cols-4">
        <TabsTrigger value="table" className="flex items-center gap-2">
          <TableIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Transações</span>
        </TabsTrigger>
        <TabsTrigger value="forecast" className="flex items-center gap-2">
          <LineChart className="h-4 w-4" />
          <span className="hidden sm:inline">Projeção</span>
        </TabsTrigger>
        <TabsTrigger value="calendar" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Calendário</span>
        </TabsTrigger>
        <TabsTrigger value="agenda" className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4" />
          <span className="hidden sm:inline">Agenda</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="table" className="mt-0">
        <TransactionsTable
          hiddenColumns={[...hiddenColumns, 'account']}
          showSummary
          showFilters
        />
      </TabsContent>

      <TabsContent value="forecast" className="mt-0">
        <BalanceForecastChart accountId={effectiveAccountId} />
      </TabsContent>

      <TabsContent value="calendar" className="mt-0">
        <TransactionsCalendar transactions={transactions} />
      </TabsContent>

      <TabsContent value="agenda" className="mt-0">
        <FinancialAgenda transactions={transactions} daysAhead={60} />
      </TabsContent>
    </Tabs>
  );
}
