import { AppRouter } from 'app/providers/router';
import { useTheme } from 'app/providers/ThemeProvider';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

export const App = () => {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Header />
      <main className="main">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
};
