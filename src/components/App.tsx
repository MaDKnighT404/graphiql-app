import { AppRouter } from 'app/providers/router';
import { useTheme } from 'app/providers/ThemeProvider';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { useLocation } from 'react-router-dom';

export const App = () => {
  const { theme } = useTheme();
  const pathname = useLocation().pathname;

  return (
    <div className={`app ${theme}`}>
      <Header />
      <main className={`main ${pathname === '/graphql' ? 'mainFlex' : ''}`}>
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
};
