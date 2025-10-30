'use client';

import { differenceInDays } from 'date-fns';

export function LastUpdatedLabel({ updatedAt }: { updatedAt: string }) {
  const startDate = new Date(updatedAt);
  const today = new Date();

  const start = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
  );
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const diffInDays = differenceInDays(end, start);

  const years = today.getFullYear() - startDate.getFullYear();
  const months =
    (today.getFullYear() - startDate.getFullYear()) * 12 +
    today.getMonth() -
    startDate.getMonth();
  const weeks = Math.floor(diffInDays / 7);

  let timeAgo = '';

  if (diffInDays === 0) {
    timeAgo = 'hoje';
  } else if (diffInDays < 7) {
    timeAgo = `há ${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'}`;
  } else if (weeks < 4) {
    timeAgo = `há ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
  } else if (months < 12) {
    timeAgo = `há ${months} ${months === 1 ? 'mês' : 'meses'}`;
  } else {
    timeAgo = `há ${years} ${years === 1 ? 'ano' : 'anos'}`;
  }

  return (
    <div className="text-right">
      <p className="text-xs text-muted-foreground">Atualizado {timeAgo}</p>
    </div>
  );
}
