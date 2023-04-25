import { Routes, Route } from 'react-router-dom';
import { Layout } from 'components/Layout';
import { Auth } from 'Pages/Auth';
import { Welcome } from 'Pages/Welcome';
import { GraphQL } from 'Pages/GraphQl';
import { NotFound } from 'Pages/NotFound';

import './index.scss';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Auth />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/graphQL" element={<GraphQL />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
