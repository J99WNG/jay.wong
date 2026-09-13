import type { ReactNode } from 'react';
import styles from '../mathsgenie.module.css';

type ComponentSpecimenProps = {
  title: string;
  hint?: string;
  children: ReactNode;
};

export function ComponentSpecimen({ title, hint, children }: ComponentSpecimenProps) {
  return (
    <section className={styles.specimen} aria-label={`${title} component specimen`}>
      <div className={styles.specimenHeading}>
        <h4>{title}</h4>
        {hint && <p>{hint}</p>}
      </div>
      <div className={styles.specimenCanvas}>
        <div className={styles.specimenStage}>{children}</div>
      </div>
    </section>
  );
}
