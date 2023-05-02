import { useEffect } from 'react';
import styles from './WelcomePage.module.scss';
import { Auth } from 'components/AuthForm/AuthForm';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'firebase/firebase';

export const WelcomePage = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/graphql');
  }, [user, loading]);

  return (
    <section className={styles.welcome}>
      <Auth />
    </section>
  );
};
