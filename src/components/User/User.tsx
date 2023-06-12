import { useTranslation } from 'react-i18next';
import { auth } from 'firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './User.module.scss';

interface UserProps {
  scrollTop: number;
}

export const User: React.FC<UserProps> = ({ scrollTop }) => {
  const userName = useAuthState(auth);
  const { t } = useTranslation();
  console.log(userName)
  return (
    <>
      {userName && (
        <div className={`${styles.userWrapper} ${scrollTop && styles.userWrapperAnimated}`}>
          <h5 className={styles.userTitle}>{t('Hello')}</h5>
          <div className={styles.user}>

          </div>
        </div>
      )}
    </>
  );
};
