import Image from 'next/image';

import styles from '../dai-pai-dong.module.css';

export default function AnnotatedRushPhoto() {
  return (
    <figure className="overflow-visible">
      <div className={`${styles.photoFrame} relative overflow-hidden`}>
        <Image
          src="/assets/images/dai-pai-dong/restaurant-crowd.jpg"
          alt="A busy dinner service at 新志興, with customers gathered near the manager and the handwritten reservation ledger in the foreground."
          width={1350}
          height={1800}
          sizes="(min-width: 768px) 70vw, 100vw"
          className="block h-auto w-full"
        />

        <div className={`${styles.annotation} ${styles.managerAnnotation} absolute z-2 flex items-center gap-2`}>
          <span>Manager</span>
          <i aria-hidden="true" />
        </div>

        <div className={`${styles.annotation} ${styles.ledgerAnnotation} absolute z-2 flex flex-row-reverse items-center gap-2`}>
          <span>Reservation record</span>
          <i aria-hidden="true" />
        </div>
      </div>
      <figcaption>
        Friday dinner service. The manager in the purple shirt is handling the crowd while the handwritten ledger sits in the foreground. <strong>新志興訂座記錄</strong> translates as “Supreme Roast Goose King reservation record.”
      </figcaption>
      <p className={styles.editorialNote}>
        Editorial check before publication: confirm portfolio-use clearance for identifiable customers or obscure non-essential bystanders.
      </p>
    </figure>
  );
}
