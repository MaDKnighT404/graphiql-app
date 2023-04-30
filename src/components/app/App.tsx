import { Routes, Route } from 'react-router-dom';
import { Layout } from 'components/Layout';
import { Auth } from 'Pages/Auth/Auth';
import { Welcome } from 'Pages/Welcome';
import { NotFound } from 'Pages/NotFound';
import { GraphQL } from 'Pages/GraphQL';
// import styles from './App.module.scss';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Auth />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/graphql" element={<GraphQL />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
