import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  isLogin?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  isLogin = false,
  component: Component,
  ...rest
}) => {
  const { church } = useAuth();
  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        if (isPrivate === !!church) {
          return <Component />;
        }
        if (!church) {
          return <Redirect to="/login" />;
        }
        if (isLogin) {
          return <Redirect to="/" />;
        }
        return <Component />;
      }}
    />
  );
};

export default Route;
