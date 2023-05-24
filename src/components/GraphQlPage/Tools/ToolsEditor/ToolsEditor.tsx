import styles from './ToolsEditor.module.scss';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { Dispatch, SetStateAction, memo } from 'react';
import { materialLight } from '@uiw/codemirror-theme-material';
import { useTheme, Theme } from '../../../../app/providers/ThemeProvider';

type Props = {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
};

export const ToolsEditor = memo(function ToolsEditor({ state, setState }: Props) {
  const { theme } = useTheme();
  const editorTheme = theme === Theme.LIGHT ? 'light' : 'dark';
  console.log('toolsEditor rendered');
  return (
    <CodeMirror
      value={state}
      extensions={[json()]}
      onChange={(value) => setState(value)}
      theme={editorTheme}
      className={styles.editor}
    />
  );
});
