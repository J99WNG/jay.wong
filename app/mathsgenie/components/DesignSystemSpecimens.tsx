import { ArrowUp, ChevronDown, FileText, Home, Search, Settings, Sparkles, X } from 'lucide-react';
import { ComponentSpecimen } from './ComponentSpecimen';
import styles from '../mathsgenie.module.css';

const subjects = ['Full', 'GCSE Maths', 'GCSE Statistics', 'Edexcel IGCSE (Mathematics A)', 'AS Level Maths', 'A Level Maths'];
const sidebarItems = ['Home', 'My Subjects', 'Ask Genie AI', 'Cheatsheets', 'Exam Builder', 'Study Planner'];

export type AlertState = {
  welcome: boolean;
  subjects: boolean;
};

type DesignSystemSpecimensProps = {
  selectedSubject: string;
  onSelectSubject: (subject: string) => void;
  held: string | null;
  onToggleHeld: (name: string) => void;
  alerts: AlertState;
  onDismissAlert: (name: keyof AlertState) => void;
  onResetAlerts: () => void;
};

export function DesignSystemSpecimens({
  selectedSubject,
  onSelectSubject,
  held,
  onToggleHeld,
  alerts,
  onDismissAlert,
  onResetAlerts,
}: DesignSystemSpecimensProps) {
  return (
    <>
      <NavigationSpecimen />
      <SearchSpecimen />
      <SegmentedControlSpecimen selectedSubject={selectedSubject} onSelectSubject={onSelectSubject} />
      <ButtonsAndCardsSpecimen held={held} onToggleHeld={onToggleHeld} />
      <PaperPillsSpecimen />
      <CarouselAlertSpecimen
        alerts={alerts}
        onDismissAlert={onDismissAlert}
        onResetAlerts={onResetAlerts}
      />
      <SidebarSpecimen />
    </>
  );
}

function NavigationSpecimen() {
  return (
    <ComponentSpecimen title="Navigation">
      <nav className={styles.demoNav} aria-label="Example MathsGenie navigation">
        <strong className={styles.wordmark}><span aria-hidden="true">🧞</span> MathsGenie</strong>
        <div className={styles.navLinks}>
          {['GCSE', 'AS Level', 'A Level', 'IGCSE', 'KS2'].map((item) => (
            <button type="button" key={item}>{item} <ChevronDown size={16} aria-hidden="true" /></button>
          ))}
        </div>
        <div className={styles.navActions}>
          <span className={styles.navSearch}><Search aria-hidden="true" size={16} /> Search</span>
          <button type="button" className={styles.loginButton}>Log in</button>
          <button type="button" className={`${styles.sampleButton} ${styles.primary}`}>Sign up</button>
        </div>
      </nav>
    </ComponentSpecimen>
  );
}

function SearchSpecimen() {
  return (
    <ComponentSpecimen title="Search inputs">
      <div className={styles.searchRow}>
        <label className={styles.searchInput}>
          <Search aria-hidden="true" />
          <span className="sr-only">Search</span>
          <input type="search" placeholder="Search" />
        </label>
        <label className={`${styles.searchInput} ${styles.heroSearch}`}>
          <Search aria-hidden="true" />
          <span className="sr-only">What are you studying for?</span>
          <input type="search" placeholder="What are you studying for?" />
        </label>
      </div>
    </ComponentSpecimen>
  );
}

function SegmentedControlSpecimen({
  selectedSubject,
  onSelectSubject,
}: Pick<DesignSystemSpecimensProps, 'selectedSubject' | 'onSelectSubject'>) {
  return (
    <ComponentSpecimen title="Segmented control" hint="The full-width control is deliberately clipped by the specimen frame.">
      <div className={styles.segmentedViewport}>
        <div className={styles.segmentedControl} role="group" aria-label="Qualification filter">
          {subjects.map((subject) => (
            <button
              key={subject}
              type="button"
              className={styles.segmentedTab}
              aria-pressed={selectedSubject === subject}
              onClick={() => onSelectSubject(subject)}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>
    </ComponentSpecimen>
  );
}

function ButtonsAndCardsSpecimen({
  held,
  onToggleHeld,
}: Pick<DesignSystemSpecimensProps, 'held' | 'onToggleHeld'>) {
  return (
    <ComponentSpecimen title="Buttons and cards">
      <div className={styles.buttonRow}>
        {(['primary', 'secondary', 'tertiary'] as const).map((variant) => (
          <button
            key={variant}
            type="button"
            className={`${styles.sampleButton} ${styles[variant]}`}
            data-held={held === variant}
            aria-pressed={held === variant}
            onClick={() => onToggleHeld(variant)}
          >
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </button>
        ))}
      </div>
      <div className={styles.cardGrid}>
        <button
          type="button"
          className={styles.sampleCard}
          data-held={held === 'revision'}
          aria-pressed={held === 'revision'}
          onClick={() => onToggleHeld('revision')}
        >
          <span className={styles.cardTitle}>GCSE Revision</span>
          <span className={styles.cardBody}>Video tutorials, practice exam style questions and answers</span>
        </button>
        <button
          type="button"
          className={styles.sampleCard}
          data-held={held === 'metrics'}
          aria-pressed={held === 'metrics'}
          onClick={() => onToggleHeld('metrics')}
        >
          <span className={styles.cardMeta}>2 hours ago</span>
          <span className={styles.cardTitle}>Metrics Conversions</span>
          <span className={styles.cardBody}>Revisit a recent lesson and continue your progress.</span>
          <span className={`${styles.sampleButton} ${styles.secondary}`}>Revisit</span>
        </button>
        <article className={styles.sampleCard}>
          <span className={`${styles.paperPill} ${styles.paperOne}`}><FileText aria-hidden="true" size={16} /> Paper 1</span>
          <span className={styles.cardTitle}>Thursday 14 May 2026</span>
          <span className={styles.cardBody}>9:00</span>
          <span className={styles.cardFooter}><span className={`${styles.sampleButton} ${styles.secondary}`}>Revise</span><small>11 days left</small></span>
        </article>
        <article className={styles.sampleCard}>
          <span className={styles.cardMeta}>GB <span>May 12, 2025</span></span>
          <span className={styles.cardTitle}>Marcus R. <span className={styles.stars} aria-label="4.5 out of 5 stars">★★★★½</span></span>
          <span className={styles.cardBody}>“YesGenie helps me understand the ‘why’ behind the maths.”</span>
        </article>
      </div>
    </ComponentSpecimen>
  );
}

function PaperPillsSpecimen() {
  return (
    <ComponentSpecimen title="Paper pills">
      <div className={styles.pillRow}>
        <span className={`${styles.paperPill} ${styles.paperOne}`}><FileText aria-hidden="true" size={16} /> Paper 1</span>
        <span className={`${styles.paperPill} ${styles.paperTwo}`}><FileText aria-hidden="true" size={16} /> Paper 2</span>
        <span className={`${styles.paperPill} ${styles.paperThree}`}><FileText aria-hidden="true" size={16} /> Paper 3</span>
      </div>
    </ComponentSpecimen>
  );
}

function CarouselAlertSpecimen({
  alerts,
  onDismissAlert,
  onResetAlerts,
}: Pick<DesignSystemSpecimensProps, 'alerts' | 'onDismissAlert' | 'onResetAlerts'>) {
  return (
    <ComponentSpecimen title="Carousel alert">
      {alerts.welcome || alerts.subjects ? (
        <div className={styles.alertStack}>
          {alerts.welcome && (
            <div className={`${styles.carouselAlert} ${styles.welcomeAlert}`} role="status">
              <span>Welcome to the new MathsGenie! <u>Tell us what you think</u></span>
              <button type="button" aria-label="Dismiss welcome alert" onClick={() => onDismissAlert('welcome')}><X aria-hidden="true" size={16} /></button>
            </div>
          )}
          {alerts.subjects && (
            <div className={styles.carouselAlert} role="status">
              <span>We&apos;ve expanded the magic. Explore 100+ subjects tailored for your exact exam board. <u>Find my subject</u></span>
              <button type="button" aria-label="Dismiss subjects alert" onClick={() => onDismissAlert('subjects')}><X aria-hidden="true" size={16} /></button>
            </div>
          )}
        </div>
      ) : (
        <button type="button" className={`${styles.sampleButton} ${styles.secondary}`} onClick={onResetAlerts}>Reset alerts</button>
      )}
    </ComponentSpecimen>
  );
}

function SidebarSpecimen() {
  return (
    <ComponentSpecimen title="Sidebar">
      <aside className={styles.demoSidebar} aria-label="Example study navigation">
        <p>Study</p>
        {sidebarItems.map((item, index) => (
          <button type="button" key={item} aria-current={index === 2 ? 'page' : undefined}>
            {index === 2
              ? <Sparkles aria-hidden="true" size={16} />
              : <Home aria-hidden="true" size={16} />}
            <span>{item}</span>
            {index > 0 && <small>{index === 2 ? '60% off' : 'New'}</small>}
          </button>
        ))}
        <div className={styles.sidebarFooter}>
          <button type="button"><ArrowUp aria-hidden="true" size={16} /> Upgrade <small>60% off</small></button>
          <span><span className={styles.avatar} />Firstname Surname <Settings aria-hidden="true" size={16} /></span>
        </div>
      </aside>
    </ComponentSpecimen>
  );
}
