import { Outlet } from 'react-router-dom';
import { Footer } from 'components/footer';
import { Header } from 'components/header';
import { useTheme } from '../../providers/ThemeProvider';
import './index.scss';

export const Layout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Header toggleTheme={toggleTheme} />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
