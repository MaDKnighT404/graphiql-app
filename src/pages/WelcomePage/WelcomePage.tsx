import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'firebase/firebase';
import { Loader } from 'components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import styles from './WelcomePage.module.scss';

export const WelcomePage = () => {
  const { t } = useTranslation();
  return (
    <section className={styles.welcome}>
      <h1 className={styles.welcomeHeader}>{t('Welcome')}</h1>
      <div className={styles.welcomeTextWrapper}>
        <p>
          {t('GraphQl is')}
          <br />
          <br />
          {t('To start')}
        </p>
      </div>
    </section>
  );
};
