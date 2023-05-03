import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { useTranslation } from 'react-i18next';
import styles from './Options.module.scss';

export const Options = () => {
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
  };

  return (
    <div className={styles.options}>
      <button
        className={i18n.language === 'en' ? styles.engFlag : styles.rusFlag}
        onClick={toggleLang}
      />
      <button
        className={theme === Theme.DARK ? styles.darkMode : styles.lightMode}
        onClick={toggleTheme}
      />
    </div>
  );
};
