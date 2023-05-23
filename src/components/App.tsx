import { AppRouter } from 'app/providers/router';
import { useTheme } from 'app/providers/ThemeProvider';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Header />
      <main className="main">
        <AppRouter />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};
