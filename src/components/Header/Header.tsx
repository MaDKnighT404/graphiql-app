import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'app/providers/ThemeProvider';
import { Button, ButtonSize, ButtonTheme } from 'components/Button/Button';
import { auth, db, logout } from 'firebase/firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { toggleTheme } = useTheme();
  const [name, setName] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      alert('An error occured while fetching user data');
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) {
      setName('');
      return navigate('/');
    }
    fetchUserName();
  }, [user, loading]);

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

      <Button onClick={logout} size={ButtonSize.M} theme={ButtonTheme.OUTLINE}>
        {t('Logout')}
      </Button>
      {name && <span>${name}</span>}
    </header>
  );
};
