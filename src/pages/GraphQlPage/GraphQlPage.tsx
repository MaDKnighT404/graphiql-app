import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { auth } from 'firebase/firebase';
import styles from './GraphQlPage.module.scss';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Panel } from 'components/GraphQlPage/Panel/Panel';
import { DocExplorer } from '../../components/GraphQlPage/DocExplorer/DocExplorer';
import { fetchSchema } from 'helpers';
import { GraphQLSchema } from 'graphql';
import { NavigationProvider } from '../../components/GraphQlPage/DocExplorer/NavContext';
import { Sidebar } from '../../components/GraphQlPage/Sidebar/Sidebar';

const initUrl = 'https://rickandmortyapi.com/graphql';
const client = new ApolloClient({
  uri: initUrl,
  cache: new InMemoryCache(),
});

export const GraphQlPage = () => {
  const [schema, setSchema] = useState<GraphQLSchema>();
  const [user, loading] = useAuthState(auth);
  const [url, _] = useState(initUrl);
  const navigate = useNavigate();
  const [docsOpen, setDocsOpen] = useState(false);
  const [reloading, setReloading] = useState(false);

  const buildSchemaFromData = useCallback(async () => {
    setReloading(() => true);
    const schema = await fetchSchema(url);
    setSchema(schema);
    setReloading(() => false);
  }, [url]);

  useEffect(() => {
    buildSchemaFromData();
  }, [buildSchemaFromData]);

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
        <Sidebar
          setDocsOpen={setDocsOpen}
          reloading={reloading}
          buildSchemaFromData={buildSchemaFromData}
        />
        <NavigationProvider>
          <DocExplorer docsOpen={docsOpen} schema={schema} />
        </NavigationProvider>

        <div className={styles.sessions}>
          <Panel schema={schema} />
        </div>
      </section>
    </ApolloProvider>
  );
};
