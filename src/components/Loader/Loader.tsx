import { FC } from 'react';
import './Loader.scss';
import classNames from 'classnames';

interface LoaderProps {
  className?: string;
}

export const Loader: FC<LoaderProps> = ({ className }) => {
  return (
    <div className={classNames('lds-ring', className)}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
