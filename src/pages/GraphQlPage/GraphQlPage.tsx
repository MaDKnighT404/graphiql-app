import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { auth } from 'firebase/firebase';
import styles from './GraphQlPage.module.scss';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Panel } from 'components/GraphQlPage/Panel/Panel';
import { Button } from '../../components/Button/Button';
import { ReactComponent as DocIcon } from '@/shared/assets/icons/doc.svg';
import { ReactComponent as Reload } from '@/shared/assets/icons/reload.svg';
import { DocExplorer } from '../../components/GraphQlPage/DocExplorer/DocExplorer';
import { fetchSchema } from 'helpers';
import { GraphQLSchema } from 'graphql';
import { NavigationProvider } from '../../components/GraphQlPage/DocExplorer/NavContext';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

const initUrl = 'https://rickandmortyapi.com/graphql';
const client = new ApolloClient({
  uri: initUrl,
  cache: new InMemoryCache(),
});

export const GraphQlPage = () => {
  const { t } = useTranslation();
  const [schema, setSchema] = useState<GraphQLSchema>();
  const [user, loading] = useAuthState(auth);
  const [url, setUrl] = useState(initUrl);
  const [reloading, setReloading] = useState(false);
  const navigate = useNavigate();
  const [docsOpen, setDocsOpen] = useState(false);

  const buildSchemaFromData = useCallback(async () => {
    setReloading(() => true);
    const schema = await fetchSchema(url);
    setSchema(schema);
    setReloading(() => false);
  }, [url]);

  useEffect(() => {
    buildSchemaFromData();
  }, [buildSchemaFromData]);

  const refetchSchema = () => {
    buildSchemaFromData();
  };

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
        <div className={styles.sidebar}>
          <Button
            title={t('Show documentation Explorer')!}
            className={styles.btn}
            onClick={() => setDocsOpen((prev) => !prev)}
          >
            <DocIcon />
          </Button>
          <Button
            title={t('Re-fetch GraphQL schema')!}
            className={styles.btn}
            onClick={() => refetchSchema()}
          >
            <Reload className={classNames({ [styles.rotateEffect]: reloading })} />
          </Button>
        </div>
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
