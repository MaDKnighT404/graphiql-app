import { AppRouter } from 'app/providers/router';
import { useTheme, Theme } from 'app/providers/ThemeProvider';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const { theme } = useTheme();

  return (
    <>
      <div className={`app ${theme}`}>
        <Header />
        <main className="main">
          <AppRouter />
        </main>
        <Footer />
        <ToastContainer />
        {Theme.DARK === theme && (
          <div className="wrapper">
            <img src="src/shared/assets/images/main-bg-0_1.png" alt="" loading="lazy" />
          </div>
        )}
      </div>
    </>
  );
};
