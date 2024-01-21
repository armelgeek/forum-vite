import React, { useCallback, useContext } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { AuthContext } from '../store/Provider/AuthProvider';
import { useLocation } from 'react-router-dom';

// @ts-ignore
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state, dispatch }:any = useContext(AuthContext);
  const isAuth = useAuth();
  const location = useLocation();
  const isActive = useCallback((route: string) => {
    return location.pathname == route;
  }, [location.pathname])
  return (
    <>
    
      <div className="ml-56  max-[828px]:mx-20 max-[711px]:mx-10 max-[675px]:mx-20 max-[591px]:mx-16 max-[528px]:mx-4 max-[474px]:h-24 max-[474px]:pb-10">
        <main className="col-span-5">
          <Route
            {...rest}
            render={(props: any) =>
              isAuth ? <Component {...props} /> : <Redirect to="/login" />
            }
          />
        </main>
      </div>
    </>
  );
};

export default PrivateRoute;
