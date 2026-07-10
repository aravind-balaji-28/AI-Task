import clsx from 'clsx';
import styles from './StepperItem.module.scss';
import { type StepItem } from './types';

interface StepperItemProps {
  step: StepItem;
  index: number;
  activeStep: number;
  clickable: boolean;
  isLast: boolean;
  onStepChange?: (step: number) => void;
}

export const StepperItem = ({
  step,
  index,
  activeStep,
  clickable,
  isLast,
  onStepChange
}: StepperItemProps) => {
  const isCompleted = index < activeStep;
  const isCurrent = index === activeStep;

  return (
    <div
      className={clsx(styles.item, {
        [styles.completed]: isCompleted,
        [styles.active]: isCurrent,
        [styles.clickable]: clickable
      })}
    >
      <div className={styles.left}>
        <button
          type="button"
          className={clsx(styles.circle, {
            [styles.completedCircle]: isCompleted
          })}
        >
          {!isCompleted && index + 1}
        </button>
        {!isLast && <div className={styles.line} />}
      </div>

      <div className={styles.right}>
        <h3 className={styles.title}>{step.title}</h3>

        {step.description && (
          <p className={styles.description}>{step.description}</p>
        )}

        <div
          className={clsx(styles.content, {
            [styles.contentOpen]: isCurrent
          })}
        >
          <div className={styles.contentInner}>
            {step.content}
          </div>
        </div>
      </div>
    </div>
  );
};