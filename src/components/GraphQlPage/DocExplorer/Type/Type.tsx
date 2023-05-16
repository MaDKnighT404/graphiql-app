import { GraphQLField, GraphQLObjectType, isListType, isObjectType } from 'graphql';
import styles from './Type.module.scss';
import { Item } from '../Item/Item';
import { Fields } from '../Fields/Fields';

type Props = {
  value: GraphQLField<unknown, unknown>;
};

export const Type = ({ value }: Props) => {
  console.log('type', value);
  return (
    <div>
      <div className={styles.name}>
        {`${value.name}(`}
        {value.args.map((el) => (
          <div key={el.name}>
            <span>{el.name}:</span> <span>{el.type.toString()}</span>
          </div>
        ))}
        {`): ${value.type.toString()}`}
      </div>
      <div className={styles.description}>
        <p>{value.description}</p>
      </div>
      <div>Type details</div>
      <div className={styles.fields}>
        {isObjectType(value.type) ? (
          <Fields fieldsMap={value.type.getFields()} isFunc={false} />
        ) : null}

        {/* isObjectType(value.type)?
      // Object.values(value.type.getFields()).map() */}
      </div>
    </div>
  );
};
