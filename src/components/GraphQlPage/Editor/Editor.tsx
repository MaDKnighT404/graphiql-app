import styles from './Editor.module.scss';
import { basicSetup } from 'codemirror';
import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import classNames from 'classnames';
// import { graphql as gql} from 'gql';
import { graphql } from 'cm6-graphql';
import { GraphQLList, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { StreamLanguage } from '@codemirror/language';
// import { graphql } from 'codemirror-graphql/cm6-legacy/mode';

// const TestSchema = new GraphQLSchema({ query: Query })
import { makeExecutableSchema } from 'graphql-tools';
import { Query, Character } from 'gql/graphql';

// const MyAppSchema = new GraphQLSchema({
//   query: Query
// });
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
