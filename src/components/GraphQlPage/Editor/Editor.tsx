import styles from './Editor.module.scss';
import { basicSetup } from 'codemirror';
import { Dispatch, SetStateAction, memo, useEffect, useRef, useState } from 'react';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { autocompletion, closeBrackets } from '@codemirror/autocomplete';
import { bracketMatching, syntaxHighlighting } from '@codemirror/language';
import { oneDarkHighlightStyle, oneDark } from '@codemirror/theme-one-dark';
import { history } from '@codemirror/commands';
import classNames from 'classnames';
import { getSchema, graphql, updateSchema } from 'cm6-graphql';
import CodeMirror, { ReactCodeMirrorRef, useCodeMirror } from '@uiw/react-codemirror';
import { GraphQLSchema } from 'graphql';
import { EditorState } from '@codemirror/state';

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  schema?: GraphQLSchema;
};

export const Editor = memo(function Editor({ query, setQuery, schema }: Props) {
  console.log('editor rendered');
  const editor = useRef<ReactCodeMirrorRef>(null);

  // console.log(myGraphQLSchema);
  // console.log('schema', isSchema(schema));
  // console.log('schema editor', schema);
  // console.log('schema view', editor.current?.view);

  useEffect(() => {
    const onNewSchema = (schema: GraphQLSchema) => {
      if (editor.current && editor.current.view) {
        console.log('update');
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
      className={classNames(styles.editor)}
      extensions={[
        bracketMatching(),
        closeBrackets(),
        history(),
        autocompletion(),
        lineNumbers(),
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
      onChange={setQuery}
    />
  );
});
