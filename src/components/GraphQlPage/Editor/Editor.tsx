import styles from './Editor.module.scss';
import { Dispatch, SetStateAction, memo, useCallback, useEffect, useRef } from 'react';
import { autocompletion, closeBrackets } from '@codemirror/autocomplete';
import { bracketMatching, syntaxHighlighting } from '@codemirror/language';
import { oneDarkHighlightStyle, oneDark } from '@codemirror/theme-one-dark';
import { history } from '@codemirror/commands';
import classNames from 'classnames';
import { graphql, updateSchema } from 'cm6-graphql';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { GraphQLSchema } from 'graphql';
import { historyField } from '@codemirror/commands';
import { ViewUpdate } from '@codemirror/view';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import { useTheme, Theme } from '../../../app/providers/ThemeProvider';

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  schema?: GraphQLSchema;
};
const serializedState = localStorage.getItem('myEditorState');
const stateFields = { history: historyField };

export const Editor = memo(function Editor({ query, setQuery, schema }: Props) {
  const { theme } = useTheme();
  const editorTheme = theme === Theme.LIGHT ? 'light' : 'dark';
  console.log('editor rendered');
  const editor = useRef<ReactCodeMirrorRef>(null);

  const handleChange = useCallback(
    (value: string, viewUpdate: ViewUpdate) => {
      setQuery(value);
      localStorage.setItem('myValue', value);
      const state = viewUpdate.state.toJSON(stateFields);
      localStorage.setItem('myEditorState', JSON.stringify(state));
    },
    [setQuery]
  );

  useEffect(() => {
    const onNewSchema = (schema: GraphQLSchema) => {
      if (editor.current && editor.current.view) {
        updateSchema(editor.current.view, schema);
      }
    };
    if (schema) {
      onNewSchema(schema);
    }
  }, [schema]);
  return (
    <CodeMirror
      ref={editor}
      value={query}
      theme={editorTheme}
      initialState={
        serializedState
          ? {
              json: JSON.parse(serializedState || ''),
              fields: stateFields,
            }
          : undefined
      }
      className={classNames(styles.editor)}
      extensions={[
        bracketMatching(),
        closeBrackets(),
        history(),
        autocompletion(),
        syntaxHighlighting(oneDarkHighlightStyle),
        graphql(schema, {
          onShowInDocs(field, type, parentType) {
            alert(`Showing in docs.: Field: ${field}, Type: ${type}, ParentType: ${parentType}`);
          },
          onFillAllFields(view, schema, _query, cursor, token) {
            alert(`Filling all fields. Token: ${token}`);
          },
        }),
      ]}
      onChange={handleChange}
    />
  );
});
