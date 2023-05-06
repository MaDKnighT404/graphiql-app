import styles from './Editor.module.scss';
import { basicSetup } from 'codemirror';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { autocompletion, closeBrackets } from '@codemirror/autocomplete';
import { bracketMatching, syntaxHighlighting } from '@codemirror/language';
import { history } from '@codemirror/commands';
import classNames from 'classnames';
import { graphql } from 'cm6-graphql';
import CodeMirror from '@uiw/react-codemirror';

// `mutation mutationName {
//   setString(value: "newString")
// }`

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};

export const Editor = ({ query, setQuery }: Props) => {
  return (
    <CodeMirror
      value={query}
      className={classNames(styles.editor)}
      extensions={[
        graphql(),
        bracketMatching(),
        closeBrackets(),
        history(),
        autocompletion(),
        lineNumbers(),
      ]}
      onChange={setQuery}
    />
  );
};
