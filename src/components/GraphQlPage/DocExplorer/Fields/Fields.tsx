import { GraphQLField, GraphQLFieldMap } from 'graphql';
import styles from './Fields.module.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Item } from '../Item/Item';

type Props = {
  fieldsMap: GraphQLFieldMap<unknown, unknown> | undefined;
  setCurrent?: Dispatch<SetStateAction<GraphQLField<unknown, unknown, unknown> | undefined>>;
  isFunc?: boolean;
};
export const Fields = ({ fieldsMap, setCurrent, isFunc }: Props) => {
  const [fileds, setFields] = useState<GraphQLField<unknown, unknown, unknown>[]>();

  useEffect(() => {
    if (fieldsMap) {
      setFields(Object.values(fieldsMap));
      console.log(fileds);
    }
  }, [fieldsMap]);

  if (!fileds || !fieldsMap) {
    return null;
  }
  return (
    <div className={styles.fields}>
      {fileds.map((el, index) => (
        <Item
          el={el}
          key={el.name}
          onClick={() => (setCurrent ? setCurrent(el) : console.log(el))}
          isFunc={isFunc}
        />
      ))}
    </div>
  );
};
