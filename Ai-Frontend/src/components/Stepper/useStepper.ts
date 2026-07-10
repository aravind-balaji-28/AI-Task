import { useCallback } from 'react';

interface UseStepperOptions {
  activeStep: number;
  totalSteps: number;
  onStepChange?: (step: number) => void;
}

export const useStepper = ({
  activeStep,
  totalSteps,
  onStepChange
}: UseStepperOptions) => {
  const goNext = useCallback(() => {
    if (activeStep >= totalSteps - 1) return;

    onStepChange?.(activeStep + 1);
  }, [activeStep, totalSteps, onStepChange]);

  const goPrevious = useCallback(() => {
    if (activeStep <= 0) return;

    onStepChange?.(activeStep - 1);
  }, [activeStep, onStepChange]);

  const goTo = useCallback(
    (step: number) => {
      if (step < 0 || step >= totalSteps) return;

      onStepChange?.(step);
    },
    [onStepChange, totalSteps]
  );

  return {
    goNext,
    goPrevious,
    goTo
  };
};