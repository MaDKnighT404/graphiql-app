import { useTranslation } from 'react-i18next';
import { auth } from 'firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './User.module.scss';

export const User = () => {
  const userName = useAuthState(auth)[0]?.displayName as string;
  const { t } = useTranslation();

  return (
    <>
      {userName && (
        <div className={styles.userWrapper}>
          <h5 className={styles.userTitle}>{t('Hello')}</h5>
          <div className={styles.user}>
            <span className={styles.userName}>{userName}</span>
          </div>
        </div>
      )}
    </>
  );
};
