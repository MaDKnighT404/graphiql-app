import { memo, useEffect } from 'react';
import styles from './Result.module.scss';
import CodeMirror from '@uiw/react-codemirror';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Loader } from 'components/Loader/Loader';

type Props = {
  value: string;
  loading: boolean;
};

export const Result = memo(function Result({ value, loading }: Props) {
  return (
    <div className={styles.result}>
      {loading ? (
        <Loader />
      ) : (
        <CodeMirror
          className={styles.resultCode}
          value={JSON.stringify(value, null, ' ')}
          editable={false}
        />
      )}
    </div>
  );
});
