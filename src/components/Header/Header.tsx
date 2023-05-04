import { Logo } from 'components/Logo';
import { Options } from 'components/Options';
import { User } from 'components/User/User';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <User />
      <Options />
    </header>
  );
};
