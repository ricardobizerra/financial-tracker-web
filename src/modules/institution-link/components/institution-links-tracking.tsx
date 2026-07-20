import { InstitutionLinksGrid } from './institution-links-grid';
import { InstitutionLinkCreateForm } from './institution-link-create-form';

export function InstitutionLinksTracking() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contas</h1>
        <InstitutionLinkCreateForm />
      </div>
      <InstitutionLinksGrid />
    </div>
  );
}
