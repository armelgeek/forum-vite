import React, { useCallback, useContext } from "react";
import {Route, Redirect, Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { AuthContext } from "../store/Provider/AuthProvider";
// @ts-ignore
const ConnectedRoute = ({ component: Component, ...rest }) => {
  const { state, dispatch }:any = useContext(AuthContext);
  const isAuth = useAuth();
  console.log('isAuth', isAuth);
  const location = useLocation();
  const isActive = useCallback((route: string) => {
    return location.pathname == route;
  }, [location.pathname])
  return (
      <>
       <Header/>
      <div className="mx-40 max-[828px]:mx-20 max-[711px]:mx-10 max-[675px]:mx-20 max-[591px]:mx-16 max-[528px]:mx-4  max-[474px]:pb-10">
          <main className="h-full w-full">
          {/** <div className="w-9/12">**/}
            <Route
              {...rest}
              render={(props: any) =>   isAuth ? <Component {...props} /> : <Redirect to="/login" />}
            />
       </main>
</div>
          </>
  );
};

export default ConnectedRoute;
