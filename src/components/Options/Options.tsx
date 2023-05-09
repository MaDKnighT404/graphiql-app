import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { signOut } from 'firebase/auth';
import { auth } from 'firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAppDispatch } from 'redux/hooks';
import { setError } from 'redux/features/auth/authenticationSlice';
import styles from './Options.module.scss';

export const Options = () => {
  const dispatch = useAppDispatch();

  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [user] = useAuthState(auth);

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
