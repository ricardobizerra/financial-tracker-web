import { Skeleton } from '@/components/ui/skeleton';

export function TimelineSkeleton() {
  return (
    <div className="flex flex-col gap-8 pt-6">
      {[1, 2].map((day) => (
        <div key={day} className="space-y-4">
          {/* Cabeçalho do dia */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-56 rounded-full" />
            <div className="h-px flex-1 bg-border/30" />
          </div>

          {/* Lista de transações */}
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-sm"
              >
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Skeleton className="h-5 w-20 rounded-md" />
                  <Skeleton className="h-3 w-12 rounded-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
