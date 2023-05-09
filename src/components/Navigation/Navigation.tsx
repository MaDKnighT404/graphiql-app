import { Link } from 'react-router-dom';
import { auth } from 'firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAppDispatch } from 'redux/hooks';
import { setError } from 'redux/features/auth/authenticationSlice';
import { signOut } from 'firebase/auth';
import styles from './Navigation.module.scss';

export const Navigation = () => {
  const user = useAuthState(auth)[0];
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(setError(''));
    await signOut(auth);
  };

  return (
    <div className={styles.navigation}>
      <div className={styles.navigationContainer}>
        {!user ? (
          <div className={styles.navigationLinkWrapper}>
            <Link to="signin" className={styles.navigationLink}>
              Sign In
            </Link>

            <Link to="signup" className={styles.navigationLink}>
              Sign Up
            </Link>
          </div>
        ) : (
          <div className={styles.navigationLinkWrapper}>
            <Link to="/" className={styles.navigationLink}>
              Go to the Main Page
            </Link>
            <button onClick={handleLogout} className={styles.navigationLink}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
