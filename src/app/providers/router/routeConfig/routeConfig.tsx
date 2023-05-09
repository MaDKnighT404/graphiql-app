import { Authentication } from 'components/Authentication/Authentication';
import { GraphQlPage } from 'pages/GraphQlPage/GraphQlPage';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import { WelcomePage } from 'pages/WelcomePage/WelcomePage';
import { RouteProps } from 'react-router-dom';

export type AppRouteProps = RouteProps & { authOnly?: boolean };

export enum AppRoutes {
  WELCOME = 'welcome',
  GRAPHQL = 'graphql',
  SIGN_IN = 'sign_in',
  SIGN_UP = 'sign_up',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.WELCOME]: '/',
  [AppRoutes.GRAPHQL]: '/graphql',
  [AppRoutes.SIGN_IN]: '/signin',
  [AppRoutes.SIGN_UP]: '/signup',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.WELCOME]: {
    path: RoutePath.welcome,
    element: <WelcomePage />,
  },
  [AppRoutes.SIGN_IN]: {
    path: RoutePath.sign_in,
    element: <Authentication />,
  },
  [AppRoutes.SIGN_UP]: {
    path: RoutePath.sign_up,
    element: <Authentication />,
  },
  [AppRoutes.GRAPHQL]: {
    path: RoutePath.graphql,
    element: <GraphQlPage />,
    authOnly: true,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
