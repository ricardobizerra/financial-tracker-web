import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';
import { generatePreviewDates, RecurrenceData } from '../../recurrence-utils';

interface RecurrenceTimelinePreviewProps {
  startDate: Date;
  data: RecurrenceData;
}

export const RecurrenceTimelinePreview: React.FC<
  RecurrenceTimelinePreviewProps
> = ({ startDate, data }) => {
  const previewDates = generatePreviewDates(startDate, data);

  if (previewDates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-muted p-8 text-center">
        <Calendar className="mb-2 h-8 w-8 text-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">
          Nenhuma ocorrência gerada com as regras atuais.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">
          Próximas ocorrências
        </h4>
      </div>

      <div className="relative space-y-3">
        {/* Vertical line for timeline */}
        <div className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-0.5 bg-muted" />

        {previewDates.map((date, index) => {
          const isCurrentYear = date.getFullYear() === new Date().getFullYear();
          const dateFormat = isCurrentYear
            ? "EEEE, dd 'de' MMMM"
            : "EEEE, dd 'de' MMMM 'de' yyyy";

          return (
            <div key={index} className="relative flex items-center gap-3 pl-8">
              {/* Timeline point */}
              <div
                className={`absolute left-0 flex h-[24px] w-[24px] items-center justify-center rounded-full border-2 bg-background transition-colors ${
                  index === 0
                    ? 'border-primary ring-4 ring-primary/10'
                    : 'border-muted'
                }`}
              >
                {index === 0 ? (
                  <CheckCircle2 className="h-3 w-3 text-primary" />
                ) : (
                  <Clock className="h-3 w-3 text-muted-foreground" />
                )}
              </div>

              <div
                className={`flex-1 rounded-lg border p-3 transition-all ${
                  index === 0
                    ? 'border-primary/20 bg-primary/5'
                    : 'border-transparent bg-muted/30 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-medium ${
                      index === 0 ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {index === 0 ? 'Próxima' : `${index + 1}ª ocorrência`}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {format(date, dateFormat, { locale: ptBR })}
                  </span>
                </div>
                {index === 0 && (
                  <p className="mt-1 text-xs text-primary/70">
                    Data de início selecionada
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
