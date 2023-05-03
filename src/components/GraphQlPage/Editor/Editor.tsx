import styles from './Editor.module.scss';
import { basicSetup } from 'codemirror';
import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import classNames from 'classnames';
import { graphql } from 'cm6-graphql';

// `mutation mutationName {
//   setString(value: "newString")
// }`
export const Editor = () => {
  const editor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startState = EditorState.create({
      doc: `
      query AllCharacters {
        characters {
          results {
            id
            name
          }
        }
      }
    `,
      extensions: [keymap.of(defaultKeymap), basicSetup, graphql()],
    });

    const view = new EditorView({ state: startState, parent: editor.current! });

    return () => {
      view.destroy();
    };
  }, []);

  return <div ref={editor} className={classNames(styles.editor)}></div>;
};
