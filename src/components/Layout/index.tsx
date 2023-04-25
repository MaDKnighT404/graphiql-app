import { Outlet } from 'react-router-dom';
import { Footer } from 'components/footer';
import { Header } from 'components/header';
import './index.scss';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
