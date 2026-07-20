'use client';

import { useQuery } from '@apollo/client';
import { InstitutionLinksQuery } from '../graphql/institution-links-queries';
import { InstitutionLinkCard } from './institution-link-card';
import {
  OrdenationInstitutionLinkModel,
  OrderDirection,
} from '@/graphql/graphql';

export function InstitutionLinksGrid() {
  const { data, loading, error } = useQuery(InstitutionLinksQuery, {
    variables: {
      first: 50,
      orderDirection: OrderDirection.Asc,
      orderBy: OrdenationInstitutionLinkModel.InstitutionId,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Carregando contas...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Erro ao carregar contas.
      </div>
    );
  }

  const institutionLinks =
    data?.institutionLinks.edges?.map((e) => e.node) || [];

  if (institutionLinks.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Nenhuma conta ou instituição encontrada.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {institutionLinks.map((link) => (
        <InstitutionLinkCard key={link.id} institutionLink={link} />
      ))}
    </div>
  );
}
