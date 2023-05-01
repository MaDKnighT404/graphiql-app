import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'app/providers/ThemeProvider';
import { Button, ButtonSize, ButtonTheme } from 'components/Button/Button';
import { auth, db } from 'firebase/firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { toggleTheme } = useTheme();
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
  };

  useEffect(() => {}, [user]);

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

      <Button onClick={handleLogout} size={ButtonSize.M} theme={ButtonTheme.OUTLINE}>
        {t('Logout')}
      </Button>
      {user && <span>{user?.displayName}</span>}
    </header>
  );
};
