import React, { useCallback, useContext } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { AuthContext } from '../store/Provider/AuthProvider';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

// @ts-ignore
const UserRoute = ({ component: Component, ...rest }) => {
  const { state, dispatch }: any = useContext(AuthContext);
  return (
    <>
    <Header/>
      <main className="col-span-5">
        <Route
          {...rest}
          render={(props: any) => <Component {...props} />
          }
        />
      </main>
    </>
  );
};

export default UserRoute;
