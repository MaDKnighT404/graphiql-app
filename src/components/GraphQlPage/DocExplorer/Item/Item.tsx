import { GraphQLField } from 'graphql';
import styles from './Item.module.scss';
import classNames from 'classnames';

type Props = {
  el: GraphQLField<unknown, unknown, unknown>;
  onClick: () => void;
  isFunc?: boolean;
};

export const Item = ({ el, onClick, isFunc = false }: Props) => {
  const name = el.type.toString();
  return (
    <div className={styles.item} onClick={onClick}>
      <span className={classNames({ [styles.func]: isFunc, [styles.else]: !isFunc })}>
        {el.name}
      </span>
      <span>{isFunc ? `(...): ` : ': '}</span>
      <span className={styles.type}>{name}</span>
    </div>
  );
};
