import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from '../routeConfig/routeConfig';

export function RequireAuth({ children }: { children: JSX.Element }) {
  // TODO: get auth from state
  // const auth = useSelector(getUserAuthData);
  const location = useLocation();
  const auth = true;
  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={RoutePath.sign_in} state={{ from: location }} replace />;
  }

  return children;
}
