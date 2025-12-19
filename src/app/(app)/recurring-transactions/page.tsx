'use client';

import {
  RecurringTransactionsList,
  IncomeRecurringTransactionCreateForm,
  ExpenseRecurringTransactionCreateForm,
} from '@/modules/recurring-transactions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CalendarClock } from 'lucide-react';

export default function RecurringTransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Transações Recorrentes</h1>
          <p className="text-muted-foreground">
            Gerencie suas receitas e despesas que se repetem automaticamente.
          </p>
        </div>
        <div className="flex gap-2">
          <IncomeRecurringTransactionCreateForm />
          <ExpenseRecurringTransactionCreateForm />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5" />
            Recorrências ativas
          </CardTitle>
          <CardDescription>
            Suas transações programadas para acontecer regularmente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecurringTransactionsList />
        </CardContent>
      </Card>
    </div>
  );
}
