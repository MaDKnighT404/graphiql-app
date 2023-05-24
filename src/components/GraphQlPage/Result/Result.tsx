import { memo, useEffect } from 'react';
import styles from './Result.module.scss';
import CodeMirror, { basicSetup } from '@uiw/react-codemirror';
import { Loader } from 'components/Loader/Loader';
import { json } from '@codemirror/lang-json';
import { useTheme } from '../../../app/providers/ThemeProvider';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

type Props = {
  value: string;
  loading: boolean;
};

const myTheme = createTheme({
  theme: 'light',
  settings: {
    background: 'transparent',
    lineHighlight: 'transparent',
    gutterBackground: 'transparent',
    gutterBorder: 'transparent',
    gutterForeground: 'var(--secondary-color)',
  },
  styles: [
    { tag: t.comment, color: '#787b8099' },
    { tag: t.variableName, color: '#0080ff' },
    { tag: [t.string, t.special(t.brace)], color: 'var(--secondary-color)' },
    { tag: t.number, color: '#5c6166' },
    { tag: t.bool, color: '#5c6166' },
    { tag: t.null, color: '#5c6166' },
    { tag: t.keyword, color: '#5c6166' },
    { tag: t.operator, color: '#5c6166' },
    { tag: t.className, color: '#5c6166' },
    { tag: t.definition(t.typeName), color: '#5c6166' },
    { tag: t.typeName, color: '#5c6166' },
    { tag: t.angleBracket, color: '#5c6166' },
    { tag: t.tagName, color: '#5c6166' },
    { tag: t.attributeName, color: '#5c6166' },
  ],
});

export const Result = memo(function Result({ value, loading }: Props) {
  return (
    <div className={styles.result}>
      {loading ? (
        <Loader />
      ) : (
        <CodeMirror
          basicSetup={{ lineNumbers: false, bracketMatching: true }}
          className={styles.resultCode}
          value={JSON.stringify(value, null, ' ')}
          theme={myTheme}
          editable={false}
          extensions={[json()]}
        />
      )}
    </div>
  );
});
