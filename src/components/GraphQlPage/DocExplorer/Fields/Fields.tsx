import { GraphQLArgument, GraphQLField, GraphQLFieldMap, GraphQLInputFieldMap } from 'graphql';
import styles from './Fields.module.scss';
import { useContext, useEffect, useState } from 'react';
import { Item } from '../Item/Item';
import { NavContext } from '../NavContext';

type Props = {
  fieldsMap:
    | GraphQLFieldMap<unknown, unknown>
    | undefined
    | readonly GraphQLArgument[]
    | GraphQLInputFieldMap;
  isFunc?: boolean;
};

export const Fields = ({ fieldsMap, isFunc }: Props) => {
  const [fileds, setFields] = useState<GraphQLField<unknown, unknown, unknown>[]>();
  const context = useContext(NavContext);
  if (!context) {
    throw new Error('There is no navigation');
  }
  const { pushItem } = context;

  useEffect(() => {
    if (fieldsMap) {
      setFields(Object.values(fieldsMap));
      // console.log(fileds);
    }
  }, [fieldsMap]);

  if (!fileds || !fieldsMap) {
    return null;
  }
  return (
    <div className={styles.fields}>
      {fileds.map((el) => (
        <Item
          el={el}
          key={el.name}
          onClick={() => {
            pushItem({ name: el.name, graph: el });
          }}
          isFunc={isFunc}
        />
      ))}
    </div>
  );
};
