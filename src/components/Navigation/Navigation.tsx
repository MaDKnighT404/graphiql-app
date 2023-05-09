import { Link } from 'react-router-dom';
import { auth } from 'firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAppDispatch } from 'redux/hooks';
import { chooseForm, setError } from 'redux/features/auth/authenticationSlice';
import { signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import styles from './Navigation.module.scss';

export const Navigation = () => {
  const user = useAuthState(auth)[0];
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(chooseForm('signIn'));
    dispatch(setError(''));
  };

  const handleSignUp = async () => {
    dispatch(setError(''));
    dispatch(chooseForm('signUp'));
  };

  const handleLogout = async () => {
    dispatch(setError(''));
    await signOut(auth);
  };

  return (
    <div className={styles.navigation}>
      <div className={styles.navigationContainer}>
        {!user ? (
          <div className={styles.navigationLinkWrapper}>
            <Link to="signin" className={styles.navigationLink} onClick={handleSignIn}>
              {t('Sign in')}
            </Link>

            <Link to="signup" className={styles.navigationLink} onClick={handleSignUp}>
              {t('Sign up')}
            </Link>
          </div>
        ) : (
          <div className={styles.navigationLinkWrapper}>
            <Link to="/graphql" className={styles.navigationLink}>
              {t('Go to the Main Page')}
            </Link>
            <button onClick={handleLogout} className={styles.navigationLink}>
              {t('Logout')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
