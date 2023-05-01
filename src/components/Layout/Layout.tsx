import { Outlet } from 'react-router-dom';
import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import styles from './Layout.module.scss';
import { useTheme } from 'app/providers/ThemeProvider';

export const Layout = () => {
  const { theme } = useTheme();

  return (
    <div className={`${styles.app} ${theme}`}>
      <Header /* toggleTheme={toggleTheme} */ />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
