import { Logo } from 'components/Logo';
import { Options } from 'components/Options';
import { User } from 'components/User';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Logo />
        <User />
        <Options />
      </div>
    </header>
  );
};
