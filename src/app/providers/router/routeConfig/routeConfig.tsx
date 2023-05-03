import { GraphQlPage } from 'pages/GraphQlPage/GraphQlPage';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import { WelcomePage } from 'pages/WelcomePage/WelcomePage';
import { RouteProps } from 'react-router-dom';

export type AppRouteProps = RouteProps & { authOnly?: boolean };

export enum AppRoutes {
  WELCOME = 'welcome',
  GRAPHQL = 'graphql',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.WELCOME]: '/',
  [AppRoutes.GRAPHQL]: '/graphql',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.WELCOME]: {
    path: RoutePath.welcome,
    element: <WelcomePage />,
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
