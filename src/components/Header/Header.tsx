import { LangSwitcher } from 'components/LangSwitcher/LangSwitcher';
import { ThemeSwitcher } from 'components/ThemeSwitcher/ThemeSwitcher';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <LangSwitcher />
      <ThemeSwitcher />
    </header>
  );
};
