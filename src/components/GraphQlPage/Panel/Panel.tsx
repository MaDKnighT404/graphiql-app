import styles from './Panel.module.scss';
import { Button, ButtonSize, ButtonTheme } from 'components/Button/Button';
import { Editor } from 'components/GraphQlPage/Editor/Editor';
import { ReactComponent as Play } from '@/shared/assets/icons/play.svg';
import classNames from 'classnames';
import { Tools } from '../Tools/Tools';
import { graphql } from 'gql';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';

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

export const Panel = () => {
  const [query, setQuery] = useState(tempQuery);
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');
  const [getData, { loading, data, error }] = useLazyQuery(gql(tempQuery));
  const props = {
    variables,
    headers,
    setVariables,
    setHeaders,
  };

  function handleClick() {
    let tempVariables;
    try {
      tempVariables = JSON.parse(variables);
    } catch (e) {
      tempVariables = '';
    }
    console.log('test', variables);
    getData({ query: gql(query), variables: tempVariables });
  }

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
        <div className={classNames(styles.toolsEditor, { [styles.hideToolsEditor]: true })}></div>
      </div>
      <div className={styles.result}>
        <CodeMirror
          className={styles.resultCode}
          value={JSON.stringify(error ? error : data, null, ' ')}
          editable={false}
        />
      </div>
    </div>
  );
};
