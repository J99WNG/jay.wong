'use client';

import { useState } from 'react';
import { ArrowDown, ArrowUp, ChevronDown, FileText, Home, Search, Settings, Sparkles, X } from 'lucide-react';
import styles from './MathsGenieShowcase.module.css';

const subjects = ['Full', 'GCSE Maths', 'GCSE Statistics', 'Edexcel IGCSE (Mathematics A)', 'AS Level Maths', 'A Level Maths'];
const sidebarItems = ['Home', 'My Subjects', 'Ask Genie AI', 'Cheatsheets', 'Exam Builder', 'Study Planner'];

export default function MathsGenieLibraryDemo() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [selectedSubject, setSelectedSubject] = useState('Full');
  const [held, setHeld] = useState<string | null>(null);
  const [alerts, setAlerts] = useState({ welcome: true, subjects: true });

  return (
    <div className={styles.systemPanel} data-theme={mode}>
      <div className={styles.libraryHeader}>
        <div>
          <p className={styles.eyebrow}>YesGenie library</p>
          <p className={styles.libraryIntro}>Reusable foundations for navigation, discovery, revision and feedback.</p>
        </div>
        <div className={styles.modeSwitch} role="group" aria-label="Component preview theme">
          {(['light', 'dark'] as const).map((theme) => (
            <button key={theme} type="button" className={styles.themeControl}
              aria-pressed={mode === theme} onClick={() => setMode(theme)}>
              {theme === 'light' ? 'Light' : 'Dark'}
            </button>
          ))}
        </div>
      </div>

      <Specimen title="Navigation">
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
      </Specimen>

      <Specimen title="Search inputs">
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
      </Specimen>

      <Specimen title="Segmented control" hint="The full-width control is deliberately clipped by the specimen frame.">
        <div className={styles.segmentedViewport}>
          <div className={styles.segmentedControl} role="group" aria-label="Qualification filter">
            {subjects.map((subject) => (
              <button key={subject} type="button" className={styles.segmentedTab}
                aria-pressed={selectedSubject === subject} onClick={() => setSelectedSubject(subject)}>
                {subject}
              </button>
            ))}
          </div>
        </div>
      </Specimen>

      <Specimen title="Buttons and cards">
        <div className={styles.buttonRow}>
          {(['primary', 'secondary', 'tertiary'] as const).map((variant) => (
            <button key={variant} type="button"
              className={`${styles.sampleButton} ${styles[variant]}`}
              data-held={held === variant} aria-pressed={held === variant}
              onClick={() => setHeld(held === variant ? null : variant)}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </button>
          ))}
        </div>
        <div className={styles.cardGrid}>
          <button type="button" className={styles.sampleCard} data-held={held === 'revision'}
            aria-pressed={held === 'revision'} onClick={() => setHeld(held === 'revision' ? null : 'revision')}>
            <span className={styles.cardTitle}>GCSE Revision</span>
            <span className={styles.cardBody}>Video tutorials, practice exam style questions and answers</span>
          </button>
          <button type="button" className={styles.sampleCard} data-held={held === 'metrics'}
            aria-pressed={held === 'metrics'} onClick={() => setHeld(held === 'metrics' ? null : 'metrics')}>
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
      </Specimen>

      <Specimen title="Paper pills">
        <div className={styles.pillRow}>
          <span className={`${styles.paperPill} ${styles.paperOne}`}><FileText aria-hidden="true" size={16} /> Paper 1</span>
          <span className={`${styles.paperPill} ${styles.paperTwo}`}><FileText aria-hidden="true" size={16} /> Paper 2</span>
          <span className={`${styles.paperPill} ${styles.paperThree}`}><FileText aria-hidden="true" size={16} /> Paper 3</span>
        </div>
      </Specimen>

      <Specimen title="Carousel alert">
        {alerts.welcome || alerts.subjects ? (
          <div className={styles.alertStack}>
            {alerts.welcome && (
              <div className={`${styles.carouselAlert} ${styles.welcomeAlert}`} role="status">
                <span>Welcome to the new MathsGenie! <u>Tell us what you think</u></span>
                <button type="button" aria-label="Dismiss welcome alert" onClick={() => setAlerts((current) => ({ ...current, welcome: false }))}><X aria-hidden="true" size={16} /></button>
              </div>
            )}
            {alerts.subjects && (
              <div className={styles.carouselAlert} role="status">
                <span>We&apos;ve expanded the magic. Explore 100+ subjects tailored for your exact exam board. <u>Find my subject</u></span>
                <button type="button" aria-label="Dismiss subjects alert" onClick={() => setAlerts((current) => ({ ...current, subjects: false }))}><X aria-hidden="true" size={16} /></button>
              </div>
            )}
          </div>
        ) : (
          <button type="button" className={`${styles.sampleButton} ${styles.secondary}`} onClick={() => setAlerts({ welcome: true, subjects: true })}>Reset alerts</button>
        )}
      </Specimen>

      <Specimen title="Sidebar">
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
      </Specimen>
    </div>
  );
}

function Specimen({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
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
