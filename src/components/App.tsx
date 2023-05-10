import { AppRouter } from 'app/providers/router';
import { useTheme } from 'app/providers/ThemeProvider';

import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

import classNames from 'classnames';
import { Navigation } from './Navigation';

export const App = () => {
  const { theme } = useTheme();

  const handleStikyScroll = (event: React.UIEvent<HTMLDivElement>) => {
    console.log(event);
  };

  return (
    <div className={classNames('app', theme)}>
      <Header />
      <main className="main" onScroll={handleStikyScroll}>
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
};
