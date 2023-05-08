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
          <h1 className={styles.welcomeHeader}>Welcome to the GraphiQl clone!</h1>
          <div className={styles.welcomeTextWrapper}>
            <p>
              GraphQL is a query language for APIs and a runtime for fulfilling those queries with
              your existing data. GraphQL provides a complete and understandable description of the
              data in your API, gives clients the power to ask for exactly what they need and
              nothing more, makes it easier to evolve APIs over time, and enables powerful developer
              tools.
              <br />
              <br />
              To start using the application you must fill out the registration form or login if you
              are already register.
            </p>
          </div>
          <Authentication />
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};
