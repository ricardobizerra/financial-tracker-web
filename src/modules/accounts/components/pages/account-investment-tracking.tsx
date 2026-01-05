'use client';

import {
  AccountFragmentFragment,
  AccountType,
  InvestmentEvolutionPeriod,
  Regime,
} from '@/graphql/graphql';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/formatters/currency';
import { AccountTypeBadge } from '../account-type-badge';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import { useQuery } from '@apollo/client';
import {
  InvestmentEvolutionQuery,
  InvestmentRegimesQuery,
} from '@/modules/investments/graphql/investments-queries';
import { VariationBadge } from '@/components/variation-badge';
import { Skeleton } from '@/components/ui/skeleton';
import { InvestmentCreateForm } from '@/modules/investments/components/investment-create-form';
import { InvestmentRegimeCardsGrid } from '@/modules/investments/components/investment-regime-cards';
import { InvestmentsTable } from '@/modules/investments/components/investments-table';
import { investmentRegimeLabel } from '@/modules/investments/investment-regime-label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import {
  TrendingUp,
  PiggyBank,
  BarChart3,
  Calendar,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AccountInvestmentTrackingProps {
  account: AccountFragmentFragment;
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(142, 76%, 36%)',
  'hsl(217, 91%, 60%)',
  'hsl(280, 87%, 50%)',
  'hsl(48, 96%, 53%)',
  'hsl(340, 82%, 52%)',
];

const PERIOD_OPTIONS = [
  { value: InvestmentEvolutionPeriod.Month, label: '1 Mês' },
  { value: InvestmentEvolutionPeriod.ThreeMonths, label: '3 Meses' },
  { value: InvestmentEvolutionPeriod.SixMonths, label: '6 Meses' },
  { value: InvestmentEvolutionPeriod.Year, label: '1 Ano' },
  { value: InvestmentEvolutionPeriod.All, label: 'Todo período' },
];

export function AccountInvestmentTracking({
  account,
}: AccountInvestmentTrackingProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [period, setPeriod] = useState<InvestmentEvolutionPeriod>(
    InvestmentEvolutionPeriod.Year,
  );

  // Query para evolução - sempre ativa para exibir cards
  const { data: evolutionData, loading: evolutionLoading } = useQuery(
    InvestmentEvolutionQuery,
    {
      variables: { period, accountId: account.id },
    },
  );

  // Query para regimes na distribuição - filtrada por conta
  const { data: distributionRegimesData, loading: distributionLoading } =
    useQuery(InvestmentRegimesQuery, {
      variables: { accountId: account.id },
      skip: activeTab !== 'distribution',
    });

  // Query para regimes na tab investimentos - filtrada por conta
  const { data: investmentsRegimesData, loading: investmentsLoading } =
    useQuery(InvestmentRegimesQuery, {
      variables: { accountId: account.id },
      skip: activeTab !== 'investments',
    });

  const evolution = evolutionData?.investmentEvolution;
  const distributionRegimes =
    distributionRegimesData?.investmentRegimes?.edges?.map((e) => e.node) || [];
  const investmentsRegimes =
    investmentsRegimesData?.investmentRegimes?.edges?.map((e) => e.node) || [];

  // Data para gráfico de linha (evolução temporal)
  const chartData =
    evolution?.dataPoints?.map((point) => ({
      date: format(new Date(point.date), 'MMM/yy', { locale: ptBR }),
      investido: point.invested,
      montante: point.currentAmount,
      ganho: point.profit,
    })) || [];

  // Data para gráfico de pizza (distribuição por regime)
  const pieData = distributionRegimes.map((regime, index) => ({
    name:
      investmentRegimeLabel[
        regime.name as keyof typeof investmentRegimeLabel
      ] || regime.name,
    value: regime.currentInvested,
    invested: regime.totalInvested,
    color: COLORS[index % COLORS.length],
  }));

  const defaultRegime =
    account.type === AccountType.Savings ? Regime.Poupanca : undefined;
  const isSavings = account.type === AccountType.Savings;

  return (
    <div className="space-y-6">
      {/* Account Header Card */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <InstitutionLogo
            logoUrl={account.institution?.logoUrl}
            name={account.institution?.name || 'Sem instituição'}
            color={account.institution?.color}
            size="xl"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{account.name}</h1>
              <AccountTypeBadge type={account.type} />
              {!account.isActive && <Badge variant="secondary">Inativa</Badge>}
            </div>
            <p className="text-muted-foreground">
              {account.institution?.name}
              {account.description && ` • ${account.description}`}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards - sempre visíveis */}
      {evolutionLoading ? (
        <div
          className={cn(
            'grid grid-cols-2 gap-4',
            isSavings ? 'md:grid-cols-3' : 'md:grid-cols-4',
          )}
        >
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          {!isSavings && <Skeleton className="h-28" />}
        </div>
      ) : evolution ? (
        <div
          className={cn(
            'grid grid-cols-2 gap-4',
            isSavings ? 'md:grid-cols-3' : 'md:grid-cols-4',
          )}
        >
          <Card className="border-l-4 border-l-muted-foreground">
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Total Investido
              </p>
              <p className="mt-1 text-2xl font-bold">
                {formatCurrency(evolution.totalInvested)}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Montante Atual
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {formatCurrency(evolution.totalCurrentAmount)}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Ganho Total
              </p>
              <div className="mt-1 flex items-center gap-2">
                <p className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(Number(evolution.totalProfit))}
                </p>
                <VariationBadge
                  variation={evolution.totalProfitPercentage}
                  size="sm"
                />
              </div>
            </CardContent>
          </Card>

          {!isSavings && (
            <Card className="border-l-4 border-l-amber-500">
              <CardContent className="p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Após IRPF
                </p>
                <p className="mt-1 text-2xl font-bold text-amber-600">
                  {formatCurrency(evolution.totalTaxedAmount)}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      ) : null}

      {/* Tabs for different views */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Evolução</span>
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Distribuição</span>
          </TabsTrigger>
          <TabsTrigger value="investments" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Investimentos</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab - Evolução */}
        <TabsContent value="overview" className="mt-0 space-y-6">
          {/* Evolution Line Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Evolução do Patrimônio</CardTitle>
              <Select
                value={period}
                onValueChange={(v) => setPeriod(v as InvestmentEvolutionPeriod)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PERIOD_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              {evolutionLoading ? (
                <div className="flex h-[350px] items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : chartData.length > 0 ? (
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient
                          id="colorInvestido"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="hsl(var(--muted-foreground))"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="hsl(var(--muted-foreground))"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorMontante"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="hsl(var(--primary))"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="hsl(var(--primary))"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        strokeOpacity={0.3}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        tick={{
                          fontSize: 12,
                          fill: 'hsl(var(--muted-foreground))',
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tickFormatter={(value) =>
                          formatCurrency(value).replace('R$', '')
                        }
                        tick={{
                          fontSize: 12,
                          fill: 'hsl(var(--muted-foreground))',
                        }}
                        axisLine={false}
                        tickLine={false}
                        width={80}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        formatter={(value: number, name: string) => [
                          formatCurrency(value),
                          name === 'investido'
                            ? 'Investido'
                            : name === 'montante'
                              ? 'Montante'
                              : 'Ganho',
                        ]}
                      />
                      <Legend
                        formatter={(value) =>
                          value === 'investido'
                            ? 'Investido'
                            : value === 'montante'
                              ? 'Montante'
                              : 'Ganho'
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="investido"
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth={2}
                        fill="url(#colorInvestido)"
                        dot={false}
                      />
                      <Area
                        type="monotone"
                        dataKey="montante"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fill="url(#colorMontante)"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex h-[300px] flex-col items-center justify-center gap-4 text-center">
                  <PiggyBank className="h-12 w-12 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-muted-foreground">
                      Sem dados históricos para exibir
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Os dados de evolução aparecerão aqui após o primeiro mês
                      com investimentos registrados.
                    </p>
                  </div>
                  <InvestmentCreateForm defaultRegime={defaultRegime} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Distribution Tab */}
        <TabsContent value="distribution" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Pie Chart */}
            {distributionLoading ? (
              <Card>
                <CardContent className="flex h-[350px] items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </CardContent>
              </Card>
            ) : pieData.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Distribuição por Regime
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          labelLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                          formatter={(value: number) => formatCurrency(value)}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {/* Regime Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detalhes por Regime</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {distributionLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-20" />
                    <Skeleton className="h-20" />
                    <Skeleton className="h-20" />
                  </div>
                ) : distributionRegimes.length > 0 ? (
                  distributionRegimes.map((regime, index) => (
                    <div
                      key={regime.name}
                      className="flex items-center gap-4 rounded-lg border p-4"
                    >
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-medium">
                          {investmentRegimeLabel[
                            regime.name as keyof typeof investmentRegimeLabel
                          ] || regime.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {regime.quantity}{' '}
                          {regime.quantity === 1
                            ? 'investimento'
                            : 'investimentos'}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">
                            {formatCurrency(regime.currentInvested)}
                          </p>
                          <VariationBadge
                            variation={regime.currentInvestedPercentage}
                            size="sm"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Investido: {formatCurrency(regime.totalInvested)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground">
                      Nenhum investimento registrado nesta conta
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Investments Tab - Cards de Regimes ou Tabela para Savings */}
        <TabsContent value="investments" className="mt-0">
          {isSavings ? (
            <InvestmentsTable
              regime={Regime.Poupanca}
              accountIds={[account.id]}
              showFilters={false}
            />
          ) : (
            <InvestmentRegimeCardsGrid
              regimes={investmentsRegimes}
              loading={investmentsLoading}
              emptyMessage="Nenhum investimento registrado nesta conta"
              columns={3}
              accountId={account.id}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
