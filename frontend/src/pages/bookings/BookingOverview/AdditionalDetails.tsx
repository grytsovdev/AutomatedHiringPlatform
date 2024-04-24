import React, { FC } from 'react';
import styles from './BookingOverview.module.css';

interface AdditionalDetailsProps {
  [key: string]: any;
  companyName: string;
  createdAt: string;
  englishLevel: string;
  degree: string;
  position: string;
  experience: number;
  skills: string;
  avatar?: string;
}

const LABELS: {
  [key: string]: {
    display: string;
  };
} = {
  position: { display: 'Position' },
  companyName: { display: 'Company name' },
  createdAt: { display: 'Published' },
  englishLevel: { display: 'Level of english' },
  degree: { display: 'Degree' },
  experience: { display: 'Work experience' },
  skills: { display: 'Skills' },
};

const AdditionalDetails: FC<{ data: AdditionalDetailsProps }> = ({ data }) => (
  <div className={`${styles.bookingCard} ${styles.cardDetails}`}>
    <h6 className={styles.bookingCardTitle}>Additional Details</h6>
    <ul className={styles.additionalDeailsContainer}>
      {Object.keys(LABELS).map(key => {
        const label = LABELS[key].display;
        let value = data[key];

        if (key === 'createdAt' && value instanceof Date) {
          value = `${value.getDay}-${value.getMonth}-`;
        }

        return (
          <li key={key} className={styles.additionalDeailsElement}>
            <div className={styles.additionalDeailsProp}>{label}</div>
            <div className={styles.additionalDeailsData}>
              {key === 'employer' && data.avatar ? (
                <>
                  <img src={data.avatar} alt={value as string} />
                  <span>{value}</span>
                </>
              ) : (
                value
              )}
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

export default AdditionalDetails;
