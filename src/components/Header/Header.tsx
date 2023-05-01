import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';
import { useTheme } from 'app/providers/ThemeProvider';
import { Button, ButtonSize, ButtonTheme } from 'components/Button/Button';
import { LangSwitcher } from 'components/LangSwitcher/LangSwitcher';
import { ThemeSwitcher } from 'components/ThemeSwitcher/ThemeSwitcher';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <LangSwitcher />
      <ThemeSwitcher />
    </header>
  );
};
