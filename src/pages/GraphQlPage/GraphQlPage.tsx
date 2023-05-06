import styles from './GraphQlPage.module.scss';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Panel } from 'components/GraphQlPage/Panel/Panel';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

export const GraphQlPage = () => {
  return (
    <ApolloProvider client={client}>
      <section className={styles.graphql}>
        <div className={styles.sessions}>
          <div className={styles.header}>
            <div>
              <div>tab</div>
            </div>
          </div>
          <Panel />
        </div>
      </section>
    </ApolloProvider>
  );
};
