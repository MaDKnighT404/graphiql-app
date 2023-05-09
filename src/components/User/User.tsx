import { useTranslation } from 'react-i18next';
import { auth } from 'firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAppSelector } from 'redux/hooks';
import { selectAuthValues } from 'redux/features/auth/authenticationSlice';
import styles from './User.module.scss';
import { useEffect } from 'react';

export const User = () => {
  const { ...state } = useAppSelector(selectAuthValues);
  const userName = useAuthState(auth)[0]?.displayName as string;
  const { t } = useTranslation();

  useEffect(() => {
    console.log(userName);
  }, [userName]);

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
