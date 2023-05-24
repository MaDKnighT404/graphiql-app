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
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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

  useEffect(() => {
    console.log('test');
    if (error && !loading) {
      toast.error(t('Something went wrong'));
    } else if (!loading && data && !error) {
      toast.success(t('Data loaded'));
    }
  }, [data, error, loading, t]);

  const handleClick = useCallback(async () => {
    const tempVariables = parseString(variables);
    const tempHeaders = parseString(headers);
    try {
      await executeQuery({
        query: gql(query),
        variables: tempVariables,
        context: {
          headers: {
            tempHeaders,
          },
        },
      });
    } catch (e) {
      toast.error(t('Syntax error'));
    }
  }, [executeQuery, headers, query, variables, t]);

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
