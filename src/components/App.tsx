import { AppRouter } from 'app/providers/router';
import { useTheme } from 'app/providers/ThemeProvider';

import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

import classNames from 'classnames';
import { Navigation } from './Navigation';

export const App = () => {
  const { theme } = useTheme();
  return (
    <div className={classNames('app', theme)}>
      <Header />
      <Navigation />
      <main className="main">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
};
