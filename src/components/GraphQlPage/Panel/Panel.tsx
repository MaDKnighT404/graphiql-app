import styles from './Panel.module.scss';
import { Button, ButtonSize, ButtonTheme } from 'components/Button/Button';
import { Editor } from 'components/GraphQlPage/Editor/Editor';
import { ReactComponent as Play } from '@/shared/assets/icons/play.svg';
import classNames from 'classnames';
import { Tools } from '../Tools/Tools';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Suspense, memo, useCallback, useEffect, useState } from 'react';
import { Result } from '../Result/Result';
import { parseString } from 'helpers';
import { GraphQLSchema } from 'graphql';

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

type Props = {
  schema?: GraphQLSchema;
};

export const Panel = memo(({ schema }: Props) => {
  console.log('Panel rendered');
  const [query, setQuery] = useState(tempQuery);
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');
  const [executeQuery, { loading, data, error }] = useLazyQuery(gql(tempQuery));

  const props = {
    variables,
    headers,
    setVariables,
    setHeaders,
  };

  const handleClick = useCallback(() => {
    const tempVariables = parseString(variables);
    const tempHeaders = parseString(headers);
    console.log('variables', variables);
    executeQuery({
      query: gql(query),
      variables: tempVariables,
      context: {
        headers: {
          tempHeaders,
        },
      },
    });
  }, [executeQuery, headers, query, variables]);

  return (
    <div className={styles.panel}>
      <div className={styles.session}>
        <div className={styles.queryEditor}>
          <Editor query={query} setQuery={setQuery} schema={schema} />
          <Button
            onClick={() => handleClick()}
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
    </div>
  );
});
