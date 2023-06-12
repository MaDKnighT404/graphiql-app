import {
  isListType,
  isObjectType,
  isInputObjectType,
  GraphQLType,
  isNonNullType,
  isNamedType,
} from 'graphql';
import styles from './Type.module.scss';
import { Fields } from '../Fields/Fields';
import { ExplorerField } from '../NavContext';
import { useTranslation } from 'react-i18next';

type Props = {
  graph: ExplorerField;
};

function getType(type: GraphQLType): ExplorerField {
  if (isNonNullType(type) || isListType(type)) {
    return getType(type.ofType);
  }
  return type;
}

export const Type = ({ graph }: Props) => {
  const { t } = useTranslation();

  const value = graph;

  const type = !isNamedType(value) ? getType(value.type) : value;

  return (
    <div>
      <div className={styles.header}>
        <span className={styles.name}>{`${value.name}`}</span>
        {!isNamedType(value) && value.args && value.args.length > 0 ? (
          <>
            {'('}
            <Fields fieldsMap={value.args} />
            {')'}
          </>
        ) : null}
        {!isNamedType(value) ? `: ${value.type.toString()}` : null}
      </div>
      <div className={styles.description}>
        <p>{value.description}</p>
      </div>
      <div>
        {type.name} {t('details')}
      </div>
      <div className={styles.fields}>
        {isObjectType(type) || isInputObjectType(type) ? (
          <Fields fieldsMap={type.getFields()} isFunc={false} />
        ) : (
          <div> {type.description}</div>
        )}
      </div>
    </div>
  );
};
