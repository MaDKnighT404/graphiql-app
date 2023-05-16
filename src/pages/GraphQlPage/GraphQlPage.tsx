import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from 'firebase/firebase';
import { Input } from 'components/Input/Input';
import styles from './GraphQlPage.module.scss';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Panel } from 'components/GraphQlPage/Panel/Panel';
import { Button } from '../../components/Button/Button';
import { ReactComponent as DocIcon } from '@/shared/assets/icons/doc.svg';
import { DocExplorer } from '../../components/GraphQlPage/DocExplorer/DocExplorer';
import { fetchSchema } from 'helpers';
import { GraphQLSchema } from 'graphql';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

export const GraphQlPage = () => {
  const [schema, setSchema] = useState<GraphQLSchema>();
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [docsOpen, setDocsOpen] = useState(false);

  useEffect(() => {
    const buildSchemaFromData = async () => {
      const schema = await fetchSchema();
      // console.log('schema', schema);
      console.log('schema', schema?.getQueryType());
      // console.log('test', schema?.getQueryType()?.getFields());
      setSchema(schema);

      console.log('types', schema.getTypeMap());
      console.log('types', schema.getType('IDD'));
      // const fieldsMap = schema?.getQueryType()?.getFields();
      // setFieldsMap(fieldsMap);
      // if (fieldsMap) {
      //   setFields(Object.values(fieldsMap));
      //   console.log(fileds);
      // }
    };
    buildSchemaFromData();
  }, []);

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
          <Button onClick={() => setDocsOpen((prev) => !prev)}>
            <DocIcon />
          </Button>
        </div>
        <DocExplorer docsOpen={docsOpen} schema={schema} />

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
