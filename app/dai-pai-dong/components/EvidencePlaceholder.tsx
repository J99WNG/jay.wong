import { Camera } from 'lucide-react';

import styles from '../dai-pai-dong.module.css';

type EvidencePlaceholderProps = {
  title: string;
  brief: string;
};

export default function EvidencePlaceholder({ title, brief }: EvidencePlaceholderProps) {
  return (
    <figure className={`${styles.evidencePlaceholder} m-0 flex min-h-44 items-center gap-4 p-5`}>
      <Camera aria-hidden="true" size={24} />
      <div>
        <p className="small">Editorial image placeholder</p>
        <strong>{title}</strong>
        <p>{brief}</p>
      </div>
    </figure>
  );
}
