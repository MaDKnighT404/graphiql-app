import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';
import { useTheme } from 'app/providers/ThemeProvider';
import { Button, ButtonSize, ButtonTheme } from 'components/Button/Button';

export const Header: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <Button
        onClick={() => {
          i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
        }}
      >
        {t('Switch lang')}
      </Button>
      <Button onClick={toggleTheme} size={ButtonSize.L} theme={ButtonTheme.OUTLINE}>
        {t('Switch theme')}
      </Button>
    </header>
  );
};
