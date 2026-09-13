import { CheckCircle2, CircleAlert, Info, TriangleAlert } from 'lucide-react';
import styles from '../mathsgenie.module.css';

const feedbackStates = [
  { name: 'Positive', copy: 'Answer saved', icon: CheckCircle2, tone: 'positive' },
  { name: 'Information', copy: 'A hint is available', icon: Info, tone: 'info' },
  { name: 'Warning', copy: 'Check this step', icon: TriangleAlert, tone: 'warning' },
  { name: 'Negative', copy: 'Answer needs attention', icon: CircleAlert, tone: 'negative' },
] as const;

export function TokenArchitectureFigure() {
  return (
    <figure className={`${styles.systemPanel} ${styles.tokenArchitecture}`}>
      <figcaption className="sr-only">
        Primitive OKLCH values flow into semantic roles, component states and reusable product patterns.
      </figcaption>

      {/* Designer reference: the labels mirror the naming path recorded in DESIGN.md. */}
      <ol className={styles.tokenFlow}>
        <li>
          <span className={styles.tokenLayer}>Primitive</span>
          <code>primary.400</code>
          <span className={`${styles.tokenSwatch} ${styles.swatchPrimitive}`} aria-hidden="true" />
          <small>oklch(0.726 0.141 267.2)</small>
        </li>
        <li>
          <span className={styles.tokenLayer}>Semantic</span>
          <code>action.primary.background</code>
          <span className={`${styles.tokenSwatch} ${styles.swatchSemantic}`} aria-hidden="true" />
          <small>Role remains stable across themes</small>
        </li>
        <li>
          <span className={styles.tokenLayer}>Component</span>
          <code>button.primary.rest</code>
          <button type="button" className={`${styles.sampleButton} ${styles.primary}`}>Continue</button>
          <small>Rest, hover, focus and disabled</small>
        </li>
        <li>
          <span className={styles.tokenLayer}>Pattern</span>
          <code>revision.next-step</code>
          <span className={styles.patternPreview}>12 questions <strong>Continue</strong></span>
          <small>Assembled from tested atoms</small>
        </li>
      </ol>

      <div className={styles.tokenDemoGrid}>
        <section aria-labelledby="action-hierarchy-title">
          <h4 id="action-hierarchy-title">Action hierarchy</h4>
          <div className={styles.actionHierarchy}>
            <button type="button" className={`${styles.sampleButton} ${styles.primary}`}>Primary</button>
            <button type="button" className={`${styles.sampleButton} ${styles.secondary}`}>Secondary</button>
            <button type="button" className={`${styles.sampleButton} ${styles.tertiary}`}>Tertiary</button>
            <button type="button" className={`${styles.sampleButton} ${styles.quaternary}`}>Quaternary</button>
          </div>
        </section>

        <section aria-labelledby="border-states-title">
          <h4 id="border-states-title">Border states</h4>
          <ul className={styles.borderStates}>
            <li data-state="rest"><span>Rest</span></li>
            <li data-state="hover"><span>Hover</span></li>
            <li data-state="focus"><span>Focus</span></li>
            <li data-state="invalid"><span>Invalid</span></li>
            <li data-state="disabled"><span>Disabled</span></li>
          </ul>
        </section>
      </div>

      <section className={styles.feedbackDemo} aria-labelledby="feedback-states-title">
        <h4 id="feedback-states-title">Feedback and validation</h4>
        <ul className="p-0">
          {feedbackStates.map(({ name, copy, icon: StateIcon, tone }) => (
            <li key={name} className={styles[tone]}>
              <StateIcon aria-hidden="true" size={18} />
              <span><strong>{name}</strong>{copy}</span>
            </li>
          ))}
        </ul>
      </section>
    </figure>
  );
}
