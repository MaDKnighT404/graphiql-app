import { useTranslation } from 'react-i18next';
import { Button, ButtonSize, ButtonTheme } from 'components/Button/Button';
import { auth } from 'firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { Logo } from 'components/Logo';
import { Options } from 'components/Options';
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
      <Logo />
      <Options />

      <Button onClick={handleLogout} size={ButtonSize.M} theme={ButtonTheme.OUTLINE}>
        {t('Logout')}
      </Button>
      {user && <span>{user.displayName}</span>}
    </header>
  );
};
