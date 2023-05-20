import { GraphQLFieldMap, GraphQLSchema } from 'graphql';
import { useEffect, useState } from 'react';
import { Fields } from '../Fields/Fields';
import styles from './Schema.module.scss';

type Props = {
  schema: GraphQLSchema;
};

export const Schema = ({ schema }: Props) => {
  const [fieldsMap, setFieldsMap] = useState<GraphQLFieldMap<unknown, unknown>>();
  const queryType = schema.getQueryType();
  const mutationType = schema.getMutationType?.();
  const subscriptionType = schema.getSubscriptionType?.();

  useEffect(() => {
    if (schema) {
      const fieldsMap = schema?.getQueryType()?.getFields();
      setFieldsMap(fieldsMap);
    }
  }, [schema]);

  return (
    <div className={styles.content}>
      <div>{schema.description || 'A GraphQL schema provides all kind of operation.'}</div>
      {queryType ? (
        <div>
          <div className={styles.explorerTitle}>query: {queryType.name}</div>
          <Fields fieldsMap={fieldsMap} isFunc={true} />
        </div>
      ) : null}
      {mutationType ? (
        <div>
          <div className={styles.explorerTitle}>mutation: {mutationType.name}</div>
          <Fields fieldsMap={fieldsMap} isFunc={true} />
        </div>
      ) : null}
      {subscriptionType ? (
        <div>
          <div className={styles.explorerTitle}>subscription: {subscriptionType.name}</div>
          <Fields fieldsMap={fieldsMap} isFunc={true} />
        </div>
      ) : null}
    </div>
  );
};
