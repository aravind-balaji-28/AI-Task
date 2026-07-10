import { useCallback, useMemo, useState } from 'react';
import './App.css';

import { Stepper } from './components/Stepper/Stepper';
import type { StepItem } from './components/Stepper/types';

function StepperPage() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = useCallback(() => {
    setActiveStep((previous) => previous + 1);
  }, []);

  const handlePrevious = useCallback(() => {
    setActiveStep((previous) => Math.max(previous - 1, 0));
  }, []);

  const handleReset = useCallback(() => {
    setActiveStep(0);
  }, []);

  const steps = useMemo<StepItem[]>(
    () => [
      {
        id: 'campaign',
        title: 'Select campaign settings',
        description: "For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more.", content: (
          <div>
           <button className="primaryButton" onClick={handleNext}>
              Continue
            </button>
          </div>
        )
      },
      {
        id: 'group',
        title: 'Create an ad group',
        description:
          'An ad group contains one or more ads which target a shared set of keywords.',
        content: (
          <div>
            <button className="secondaryButton" onClick={handlePrevious}>
              Back
            </button>
            <button className="primaryButton" 
              style={{ marginLeft: 8 }}
            onClick={handleNext}>
              Continue
            </button>
          </div>
        )
      },
      {
        id: 'ad',
        title: 'Create an ad',
        description:
          `Try out different ad text to see what brings in the most customers, and learn how to enhance your ads using features like ad extensions. If you run into any problems with your ads, find out how to tell if they're running and how to resolve approval issues.`,
        content: (
          <div>
            <button className="secondaryButton" onClick={handlePrevious}>
              Back
            </button>
            <button
              style={{ marginLeft: 8 }}
              onClick={handleReset}
              className="primaryButton"
            >
              Finish
            </button>
          </div>
        )
      }
    ],
    [handleNext, handlePrevious, handleReset]
  );

  return (
    <div
      style={{
        width: 700,
        margin: '40px auto'
      }}
    >
      <Stepper
        steps={steps}
        activeStep={activeStep}
        onStepChange={setActiveStep}
        allowStepClick
      />
    </div>
  );
}

export default StepperPage;