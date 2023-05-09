import styles from './Panel.module.scss';
import { Button, ButtonSize, ButtonTheme } from 'components/Button/Button';
import { Editor } from 'components/GraphQlPage/Editor/Editor';
import { ReactComponent as Play } from '@/shared/assets/icons/play.svg';
import classNames from 'classnames';
import { getIntrospectionQuery, buildClientSchema, printSchema } from 'graphql';
import { Tools } from '../Tools/Tools';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Suspense, useEffect, useState } from 'react';
import { Result } from '../Result/Result';
import { parseString } from 'helpers';
import { fetcher } from 'helpers';
import { Voyager, voyagerIntrospectionQuery } from 'graphql-voyager';

const tempQuery = `
query AllCharacters {
  characters {
    results {
      id
      name
    }
  }
}
`;
const buildSchemaFromData = async () => {
  // const introspectionQuery = getIntrospectionQuery();
  const tempData = await fetcher(voyagerIntrospectionQuery);
  // console.log('tempData', tempData.data);
  // const schema = buildClientSchema(tempData.data);
  // console.log('schema', schema);
  return tempData;
  // console.log('sdl schema', printSchema(schema));F
};

export const Panel = () => {
  console.log('Panel rendered');
  const [query, setQuery] = useState(tempQuery);
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');
  const [executeQuery, { loading, data, error }] = useLazyQuery(gql(tempQuery));
  const [docVisible, setDocVisible] = useState(true);

  const props = {
    variables,
    headers,
    setVariables,
    setHeaders,
  };

  function handleClick() {
    const tempVariables = parseString(variables);
    const tempHeaders = parseString(headers);
    console.log('test', variables);
    executeQuery({
      query: gql(query),
      variables: tempVariables,
      context: {
        headers: {
          tempHeaders,
        },
      },
    });
  }

  useEffect(() => {
    if (data) {
      buildSchemaFromData();
    }
  }, [data]);

  return (
    <div className={styles.panel}>
      <div className={styles.session}>
        <div className={styles.queryEditor}>
          <Editor query={query} setQuery={setQuery} />
          <Button
            onClick={handleClick}
            size={ButtonSize.M}
            theme={ButtonTheme.OUTLINE}
            className={styles.btn}
          >
            <Play className={styles.playBtn} />
          </Button>
        </div>
        <Tools {...props} />
      </div>
      <Result value={error ? error : data} loading={loading} />
      {/* <div className={classNames({ [styles.docsVisible]: docVisible }, styles.docs)}>
        <Button
          className={styles.schemaBtn}
          size={ButtonSize.M}
          theme={ButtonTheme.OUTLINE}
          onClick={() => setDocVisible((prev) => !prev)}
        >
          Schema
        </Button>
        <Voyager introspection={buildSchemaFromData} />
      </div> */}
    </div>
  );
};
