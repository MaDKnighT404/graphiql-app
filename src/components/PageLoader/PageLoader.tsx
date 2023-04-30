import { FC } from 'react';
import { Loader } from 'components/Loader/Loader';
import classNames from 'classnames';

import styles from './PageLoader.module.scss';

interface PageLoaderProps {
  className?: string;
}

export const PageLoader: FC<PageLoaderProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(styles.pageLoader, className)}>
      <Loader />
    </div>
  );
};
