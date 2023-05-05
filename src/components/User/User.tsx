import { auth } from 'firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import styles from './User.module.scss';

export const User = () => {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);

  return (
    <>
      {user && (
        <div className={styles.userWrapper}>
          <h5 className={styles.userTitle}>{t('Hello')}</h5>
          <div className={styles.user}>
            <span className={styles.userName}>{user.displayName}</span>
          </div>
        </div>
      )}
    </>
  );
};
