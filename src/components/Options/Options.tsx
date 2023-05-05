import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { useTranslation } from 'react-i18next';
import styles from './Options.module.scss';
import { signOut } from 'firebase/auth';
import { auth } from 'firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Options = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

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
      {user && <button onClick={handleLogout} className={styles.logout} />}
    </div>
  );
};
