import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { auth } from 'firebase/firebase';
import { Input } from 'components/Input/Input';
import styles from './GraphQlPage.module.scss';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Panel } from 'components/GraphQlPage/Panel/Panel';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

export const GraphQlPage = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  return (
    <ApolloProvider client={client}>
      <section className={styles.graphql}>
        <div className={styles.sessions}>
          {/* <div className={styles.header}>
            <div>
              <div>tab</div>
            </div>
          </div> */}
          <Panel />
        </div>
      </section>
    </ApolloProvider>
  );
};
