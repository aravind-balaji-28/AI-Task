import {type ReactNode } from 'react';

export interface StepItem {
  id: string;
  title: string;
  description?: string;
  content?: ReactNode;
  optional?: boolean;
  disabled?: boolean;
}

export type StepStatus =
  | 'completed'
  | 'current'
  | 'upcoming';

export interface StepperProps {
  steps: readonly StepItem[];
  activeStep: number;
  onStepChange?: (step: number) => void;
  allowStepClick?: boolean;
  className?: string;
}

export interface StepperContextValue {
  activeStep: number;
  goNext: () => void;
  goPrevious: () => void;
  goTo: (step: number) => void;
}