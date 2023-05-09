import { useEffect } from 'react';
import { Authentication } from 'components/Authentication/Authentication';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'firebase/firebase';
import { Loader } from 'components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import styles from './WelcomePage.module.scss';

export const WelcomePage = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // useEffect(() => {
  //   if (user) {
  //     navigate('/graphql');
  //   }
  // }, [user, loading, navigate]);

  return (
    <>
      {!loading ? (
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
          {/* <Authentication /> */}
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};
