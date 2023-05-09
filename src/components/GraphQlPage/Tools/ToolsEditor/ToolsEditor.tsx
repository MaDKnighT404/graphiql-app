import styles from './ToolsEditor.module.scss';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { Dispatch, SetStateAction, memo, useCallback } from 'react';
import { materialLight } from '@uiw/codemirror-theme-material';

type Props = {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
};

export const ToolsEditor = memo(function ToolsEditor({ state, setState }: Props) {
  console.log('toolsEditor rendered');
  const onChange = useCallback((value: string) => {
    console.log('value:', value);
  }, []);
  return (
    <CodeMirror
      value={state}
      extensions={[json()]}
      onChange={(value) => setState(value)}
      theme={materialLight}
      className={styles.editor}
    />
  );
});