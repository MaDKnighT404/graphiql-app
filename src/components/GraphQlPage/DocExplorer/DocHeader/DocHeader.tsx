import { useContext } from 'react';
import { NavContext } from '../NavContext';
import styles from './DocHeader.module.scss';
import { ReactComponent as BackIcon } from '@/shared/assets/icons/back.svg';

// type Props = {
//   navStack: NavigationItem[];
//   popItem: () => void;
// };

export const DocHeader = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error('There is no navigation');
  }
  const { popItem, navStack } = context;

  return (
    <>
      {navStack.length > 1 ? (
        <div className={styles.nav}>
          <div className={styles.back} onClick={popItem}>
            <BackIcon className={styles.backIcon} />
            <span>{navStack.at(-2)?.name}</span>
          </div>
        </div>
      ) : (
        <div className={styles.header}>{navStack.at(-1)?.name}</div>
      )}
    </>
  );
};
