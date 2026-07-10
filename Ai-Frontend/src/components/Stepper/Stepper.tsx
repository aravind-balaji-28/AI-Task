import clsx from 'clsx';
import styles from './Stepper.module.scss';
import { StepperItem } from './StepperItem';
import {type StepperProps } from './types';

export const Stepper = ({
  steps,
  activeStep,
  onStepChange,
  allowStepClick = false,
  className
}: StepperProps) => {
  return (
    <div
      className={clsx(styles.stepper, className)}
      role="list"
    >
      {steps.map((step, index) => (
        <StepperItem
          key={step.id}
          step={step}
          index={index}
          activeStep={activeStep}
          clickable={allowStepClick}
          onStepChange={onStepChange}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  );
};