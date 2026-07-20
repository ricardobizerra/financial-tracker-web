'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TransactionsTimelineView } from './transactions-timeline-view';
import { BalanceForecastChart } from './balance-forecast-chart';
import { TransactionsCalendar } from './transactions-calendar';
import { FinancialAgenda } from './financial-agenda';
import { LineChart, Calendar, ClipboardList, LayoutList } from 'lucide-react';
import { useParams } from 'next/navigation';

interface TransactionsViewsProps {
  accountId?: string;
  hideAccount?: boolean;
  isDebitCard?: boolean;
}

export function TransactionsViews({
  accountId,
  hideAccount = false,
  isDebitCard = false,
}: TransactionsViewsProps) {
  const [activeTab, setActiveTab] = useState('timeline');
  const params = useParams<{ accountId?: string }>();
  const effectiveAccountId = accountId || params.accountId;

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4 grid w-full grid-cols-4">
        <TabsTrigger value="timeline" className="flex items-center gap-2">
          <LayoutList className="h-4 w-4" />
          <span className="hidden sm:inline">Timeline</span>
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

      <TabsContent value="timeline" className="mt-0">
        <TransactionsTimelineView
          accountId={effectiveAccountId}
          hideAccount={hideAccount}
          isDebitCard={isDebitCard}
        />
      </TabsContent>

      <TabsContent value="forecast" className="mt-0">
        <BalanceForecastChart accountId={effectiveAccountId} />
      </TabsContent>

      <TabsContent value="calendar" className="mt-0">
        <TransactionsCalendar accountId={effectiveAccountId} />
      </TabsContent>

      <TabsContent value="agenda" className="mt-0">
        <FinancialAgenda accountId={effectiveAccountId} daysAhead={60} />
      </TabsContent>
    </Tabs>
  );
}
