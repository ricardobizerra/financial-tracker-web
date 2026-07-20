'use client';

import { Regime, InvestmentFragmentFragment } from '@/graphql/graphql';
import { InvestmentsTable } from './investments-table';
import { RegimeAnalyticsTab } from './regime-analytics-tab';
import { Row } from '@tanstack/react-table';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { InvestmentDetailsDrawer } from './investment-details-drawer';

interface RegimeUnifiedViewProps {
  regime: Regime;
  institutionLinkIds?: string[];
}

export function RegimeUnifiedView({ regime, institutionLinkIds }: RegimeUnifiedViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleRowClick = (row: Row<InvestmentFragmentFragment>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('investmentId', row.original.id);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-col gap-6 w-full relative">
      {/* Top Pane: Full Width Analytics */}
      <div className="w-full">
        <h3 className="font-semibold text-lg mb-4">Evolução Patrimonial</h3>
        <RegimeAnalyticsTab regime={regime} institutionLinkIds={institutionLinkIds} />
      </div>

      {/* Bottom Pane: Table */}
      <div className="w-full">
        <InvestmentsTable 
          regime={regime} 
          institutionLinkIds={institutionLinkIds} 
          onRowClick={handleRowClick}
        />
      </div>
      
      <InvestmentDetailsDrawer />
    </div>
  );
}
