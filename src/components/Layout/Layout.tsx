import { Outlet } from 'react-router-dom';
import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { useTheme } from '../../providers/ThemeProvider';
import styles from './Layout.module.scss';

export const Layout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`${styles.app} ${theme}`}>
      <Header toggleTheme={toggleTheme} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
