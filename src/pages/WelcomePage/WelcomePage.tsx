import { useEffect } from 'react';
import { Authentication } from 'components/Authentication/Authentication';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'firebase/firebase';
import styles from './WelcomePage.module.scss';
import { Loader } from 'components/Loader/Loader';

export const WelcomePage = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      navigate('/graphql');
    }
  }, [user, loading, navigate]);

  return (
    <>
      {!loading ? (
        <section className={styles.welcome}>
          <Authentication />
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};
