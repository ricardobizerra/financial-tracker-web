import { formatCurrency } from '@/lib/formatters/currency';
import { InvestmentFragmentFragment } from '@/graphql/graphql';
import { Info } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

export function InvestmentTaxesDetail({
  investment,
}: {
  investment: InvestmentFragmentFragment;
}) {
  const taxesAndFees = investment.taxesAndFees;

  if (!taxesAndFees) return <span>{formatCurrency(0)}</span>;

  return (
    <div className="flex items-center gap-2">
      <span>{formatCurrency(taxesAndFees.totalTaxesAndFees)}</span>
      <HoverCard>
        <HoverCardTrigger className="cursor-help text-muted-foreground transition-colors hover:text-primary">
          <Info className="h-4 w-4" />
        </HoverCardTrigger>
        <HoverCardContent className="w-[280px] border-white/10 bg-background/90 p-4 shadow-2xl backdrop-blur-xl duration-200 animate-in fade-in zoom-in-95">
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Detalhamento
            </h4>
            <div className="grid gap-2 text-sm">
              {taxesAndFees.details.map((taxDetail, index) => (
                <div key={index} className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium text-muted-foreground">
                      {taxDetail.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {taxDetail.reason}
                    </span>
                  </div>
                  <span className="font-medium">
                    {formatCurrency(taxDetail.amount)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between border-t pt-2 font-medium">
              <span>Total</span>
              <span className="font-semibold">
                {formatCurrency(taxesAndFees.totalTaxesAndFees)}
              </span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
