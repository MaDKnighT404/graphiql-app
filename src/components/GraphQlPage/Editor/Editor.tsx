import styles from './Editor.module.scss';
import { basicSetup } from 'codemirror';
import { Dispatch, SetStateAction, memo, useEffect, useRef, useState } from 'react';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { autocompletion, closeBrackets } from '@codemirror/autocomplete';
import { bracketMatching, syntaxHighlighting } from '@codemirror/language';
import { history } from '@codemirror/commands';
import classNames from 'classnames';
import { getSchema, graphql, updateSchema } from 'cm6-graphql';
import CodeMirror from '@uiw/react-codemirror';
import { GraphQLSchema, buildClientSchema, buildSchema, getIntrospectionQuery } from 'graphql';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import { fetcher } from '../../../helpers';

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};

export const Editor = memo(function Editor({ query, setQuery }: Props) {
  console.log('editor rendered');
  const url = 'https://rickandmortyapi.com/graphql';
  const [myGraphQLSchema, setMyGraphQLSchema] = useState<GraphQLSchema>();

  useEffect(() => {
    const fetchSchema = async () => {
      const remoteExecutor = buildHTTPExecutor({
        endpoint: url,
      });

      const postsSubschema = {
        schema: await schemaFromExecutor(remoteExecutor),
        executor: remoteExecutor,
      };

      const fields = postsSubschema.schema.getQueryType()?.getFields();
      const result = JSON.parse(JSON.stringify(fields));
      console.log('result', result);
      setMyGraphQLSchema(postsSubschema.schema);
    };
    fetchSchema();
    // const buildSchemaFromdata = async () => {
    //   const introspectionQuery = getIntrospectionQuery();
    //   const tempData = await fetcher(introspectionQuery);
    //   console.log('tempData', tempData.data);
    //   const schema = buildClientSchema(tempData.data);
    //   console.log('schema', schema);
    //   setMyGraphQLSchema(schema);
    // };
    // buildSchemaFromdata();
  }, []);

  //   const schema = buildSchema(`
  //   type Query {
  //     id: ID!
  //     hello: String
  //   }
  // `);
  console.log(myGraphQLSchema);
  // console.log('schema', schema);
  return (
    <CodeMirror
      value={query}
      className={classNames(styles.editor)}
      extensions={[
        bracketMatching(),
        closeBrackets(),
        history(),
        autocompletion(),
        lineNumbers(),
        // graphql(schema),
        graphql(myGraphQLSchema, {
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
