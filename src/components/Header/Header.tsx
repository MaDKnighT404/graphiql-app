import { useTranslation } from 'react-i18next';
import { useTheme } from 'app/providers/ThemeProvider';
import { Button, ButtonSize, ButtonTheme } from 'components/Button/Button';
import { auth } from 'firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { LangSwitcher } from 'components/LangSwitcher/LangSwitcher';
import { ThemeSwitcher } from 'components/ThemeSwitcher/ThemeSwitcher';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <LangSwitcher />
      <ThemeSwitcher />

      <Button onClick={handleLogout} size={ButtonSize.M} theme={ButtonTheme.OUTLINE}>
        {t('Logout')}
      </Button>
      {user && <span>{user.displayName}</span>}
    </header>
  );
};
