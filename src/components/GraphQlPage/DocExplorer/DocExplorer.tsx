import classnames from 'classnames';
import styles from './DocExplorer.module.scss';
import { fetchSchema } from 'helpers';
import { useCallback, useEffect, useState } from 'react';
import {
  GraphQLSchema,
  printSchema,
  isType,
  GraphQLFieldMap,
  GraphQLField,
  GraphQLObjectType,
  GraphQLArgument,
  GraphQLInputField,
  GraphQLNamedType,
} from 'graphql';
import { Item } from './Item/Item';
import { Type } from './Type/Type';
import { Fields } from './Fields/Fields';

type Props = {
  docsOpen: boolean;
  schema: GraphQLSchema | undefined;
};

export type ExplorerField =
  | GraphQLField<unknown, unknown, unknown>
  | GraphQLInputField
  | GraphQLArgument
  | GraphQLNamedType;

export type NavigationItem = {
  name: string;
  graph?: ExplorerField;
};
const initial: NavigationItem = { name: 'Docs' };

export const DocExplorer = ({ docsOpen, schema }: Props) => {
  const [fieldsMap, setFieldsMap] = useState<GraphQLFieldMap<unknown, unknown>>();
  const [current, setCurrent] = useState<GraphQLField<unknown, unknown, unknown>>();
  const [navStack, setNavStack] = useState<NavigationItem[]>([initial]);

  const pushItem = useCallback((item: NavigationItem) => {
    setNavStack((prev) => {
      const lastItem = prev.at(-1)!;
      return lastItem.graph === item.graph ? prev : [...prev, item];
    });
  }, []);

  const popItem = useCallback(() => {
    setNavStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  useEffect(() => {
    if (schema) {
      const fieldsMap = schema?.getQueryType()?.getFields();
      setFieldsMap(fieldsMap);
    }
  }, [schema]);
  if (!schema) return <div>No schema</div>;

  const onClick = () => {

  }

  return (
    <div
      className={classnames(
        styles.docs,
        { [styles.docsVisible]: docsOpen },
        { [styles.docsInvisible]: !docsOpen }
      )}
    >
      <div className={styles.graphQlExplorer}>
        {/* <div className={styles.header}>{header}</div> */}
        <div className={styles.content}>
          <div>
            <div className={styles.explorerTitle}>query: {schema?.getQueryType()?.name}</div>
            <Fields fieldsMap={fieldsMap} setCurrent={setCurrent} isFunc={true} />
          </div>
        </div>
        {current ? <Type value={current} /> : null}
      </div>
    </div>
  );
};
