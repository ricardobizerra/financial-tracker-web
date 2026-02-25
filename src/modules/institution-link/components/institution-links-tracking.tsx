import { InstitutionLinksGrid } from './institution-links-grid';

export function InstitutionLinksTracking() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Contas</h1>
      <InstitutionLinksGrid />
    </div>
  );
}
