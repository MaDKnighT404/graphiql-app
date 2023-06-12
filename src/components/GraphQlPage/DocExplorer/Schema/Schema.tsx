/* eslint-disable i18next/no-literal-string */
import { GraphQLFieldMap, GraphQLSchema } from 'graphql';
import { useEffect, useState } from 'react';
import { Fields } from '../Fields/Fields';
import styles from './Schema.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  schema: GraphQLSchema;
};

export const Schema = ({ schema }: Props) => {
  const [fieldsMap, setFieldsMap] = useState<GraphQLFieldMap<unknown, unknown>>();
  const queryType = schema.getQueryType();
  const mutationType = schema.getMutationType?.();
  const subscriptionType = schema.getSubscriptionType?.();
  const { t } = useTranslation();

  useEffect(() => {
    if (schema) {
      const fieldsMap = schema?.getQueryType()?.getFields();
      setFieldsMap(fieldsMap);
    }
  }, [schema]);

  return (
    <div className={styles.content}>
      <div>{schema.description || t('Schema description')}</div>
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
