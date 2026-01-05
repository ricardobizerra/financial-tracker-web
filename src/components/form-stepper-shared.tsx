'use client';

import { Check, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

// ============================================================================
// Shared Types
// ============================================================================

export interface FormStepperStep {
  number: number;
  label: string;
}

export interface SelectedStepInfo {
  icon?: ReactNode;
  label: string;
}

// ============================================================================
// Step Indicator Component
// ============================================================================

export interface StepIndicatorProps {
  currentStep: number;
  steps: FormStepperStep[];
  /** Info for step 1 when completed */
  step1Info?: SelectedStepInfo;
  /** Info for step 2 when completed */
  step2Info?: SelectedStepInfo;
}

export function StepIndicator({
  currentStep,
  steps,
  step1Info,
  step2Info,
}: StepIndicatorProps) {
  const remainingSteps = steps.filter((s) => s.number > 2);

  const step1Completed = currentStep > 1 && step1Info;
  const step2Completed = currentStep > 2 && step2Info;

  return (
    <div className="flex flex-col gap-2">
      {/* Step 1: Show as full width row when completed */}
      {step1Completed && (
        <div className="flex items-center gap-2 rounded-md border border-muted px-3 py-1.5 text-sm text-foreground">
          <span className="font-semibold text-muted-foreground">
            {steps.find((s) => s.number === 1)?.label}
          </span>
          <div className="flex items-center gap-1">
            {step1Info.icon}
            <span>{step1Info.label}</span>
          </div>
        </div>
      )}

      {/* Step 2: Show as full width row when completed */}
      {step2Completed && (
        <div className="flex items-center gap-2 rounded-md border border-muted px-3 py-1 text-sm text-foreground">
          <span className="font-semibold text-muted-foreground">
            {steps.find((s) => s.number === 2)?.label}
          </span>
          <div className="flex items-center gap-1">
            {step2Info.icon}
            <span>{step2Info.label}</span>
          </div>
        </div>
      )}

      {/* Steps row: show incomplete steps 1/2 and all remaining steps */}
      <div className="flex items-center justify-center gap-2">
        {/* Step 1 if not completed */}
        {!step1Completed && (
          <div
            className={cn(
              'flex flex-1 items-center justify-center gap-1 rounded-md py-1',
              currentStep === 1
                ? 'bg-primary/80 text-primary-foreground'
                : 'bg-muted text-muted-foreground',
            )}
          >
            <div className="text-sm font-bold">1</div>
            <span className="hidden text-sm sm:block">
              {steps.find((s) => s.number === 1)?.label}
            </span>
          </div>
        )}

        {/* Step 2 if not completed */}
        {!step2Completed && steps.length > 1 && (
          <div
            className={cn(
              'flex flex-1 items-center justify-center gap-1 rounded-md py-1',
              currentStep > 1
                ? 'bg-primary text-primary-foreground'
                : currentStep === 2
                  ? 'bg-primary/80 text-primary-foreground'
                  : 'bg-muted text-muted-foreground',
            )}
          >
            <div className="text-sm font-bold">
              {currentStep > 2 ? <Check className="h-4 w-4" /> : 2}
            </div>
            <span
              className={cn(
                'hidden text-sm sm:block',
                currentStep >= 2 ? 'text-white' : 'text-muted-foreground',
              )}
            >
              {steps.find((s) => s.number === 2)?.label}
            </span>
          </div>
        )}

        {/* Remaining steps (3+) */}
        {remainingSteps.map((step) => (
          <div
            key={step.number}
            className={cn(
              'flex flex-1 items-center justify-center gap-1 rounded-md py-1',
              currentStep > step.number
                ? 'bg-primary text-primary-foreground'
                : currentStep === step.number
                  ? 'bg-primary/80 text-primary-foreground'
                  : 'bg-muted text-muted-foreground',
            )}
          >
            <div className="text-sm font-bold">
              {currentStep > step.number ? (
                <Check className="h-4 w-4" />
              ) : (
                step.number
              )}
            </div>
            <span
              className={cn(
                'hidden text-sm sm:block',
                currentStep >= step.number
                  ? 'text-white'
                  : 'text-muted-foreground',
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Type Selection Card Component
// ============================================================================

export interface TypeSelectionCardProps {
  icon: LucideIcon;
  label: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

export function TypeSelectionCard({
  icon: Icon,
  label,
  description,
  isSelected,
  onClick,
}: TypeSelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-4 rounded-lg border-2 p-4 text-left transition-all duration-200',
        'cursor-pointer hover:bg-accent',
        isSelected
          ? 'border-primary bg-primary/5'
          : 'border-transparent bg-muted/50',
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-6 w-6 text-foreground" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
    </button>
  );
}
