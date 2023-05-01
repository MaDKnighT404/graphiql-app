import { AppRouter } from 'app/providers/router';
import { useTheme } from 'app/providers/ThemeProvider';

import { Header } from './Header123/Header';
import { Footer } from './Footer123/Footer';

import classNames from 'classnames';

export const App = () => {
  const { theme } = useTheme();
  return (
    <div className={classNames('app', theme)}>
      <Header />
      <main className="main">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
};
