import { InvestmentFragmentFragment } from '@/graphql/graphql';
import { formatCurrency } from '@/lib/formatters/currency';
import { formatDate } from '@/lib/formatters/date';
import { VariationBadge } from '@/components/variation-badge';

interface InvestmentTimelineProps {
  investment: InvestmentFragmentFragment;
}

export function InvestmentTimeline({ investment }: InvestmentTimelineProps) {
  const isClosed = investment.status === 'CLOSED';
  
  return (
    <div className="relative border-l border-muted pl-4 ml-2 space-y-6">
      
      {/* Start Point */}
      <div className="relative">
        <div className="absolute -left-[1.35rem] top-1 h-3 w-3 rounded-full bg-primary" />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">Aporte Inicial</span>
          <span className="text-xs text-muted-foreground">{formatDate(investment.startDate)}</span>
          <span className="font-medium mt-1">{formatCurrency(investment.amount)}</span>
        </div>
      </div>

      {/* Taxes & Fees */}
      {(investment.taxesAndFees?.totalTaxesAndFees ?? 0) > 0 && (
        <div className="relative">
          <div className="absolute -left-[1.35rem] top-1 h-3 w-3 rounded-full bg-destructive" />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-destructive">Descontos (IR / IOF / Taxas)</span>
            <span className="font-medium text-destructive mt-1">
              - {formatCurrency(investment.taxesAndFees!.totalTaxesAndFees)}
            </span>
            {investment.taxesAndFees?.details.map((tax, i) => (
              <div key={i} className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                <span>{tax.label} {tax.reason && `(${tax.reason})`}</span>
                <span>{formatCurrency(tax.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* End Point / Current Status */}
      <div className="relative">
        <div className={`absolute -left-[1.35rem] top-1 h-3 w-3 rounded-full ${isClosed ? 'bg-muted-foreground' : 'bg-primary animate-pulse'}`} />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">
            {isClosed ? 'Resgate Final' : 'Situação Atual'}
          </span>
          {investment.maturityDate && !isClosed && (
            <span className="text-xs text-muted-foreground">Vencimento em: {formatDate(investment.maturityDate)}</span>
          )}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold">{formatCurrency(investment.correctedAmount || 0)}</span>
            <VariationBadge variation={investment.currentVariation || '0'} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
