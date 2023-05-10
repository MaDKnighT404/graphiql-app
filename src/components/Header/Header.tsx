import { Logo } from 'components/Logo';
import { Options } from 'components/Options';
import { User } from 'components/User';
import styles from './Header.module.scss';
import { Navigation } from 'components/Navigation';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Logo />
        <User />
        <div className={styles.headerSubContainer}>
          <Options />
          <Navigation />
        </div>
      </div>
    </header>
  );
};
