import React, { useCallback, useContext } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { AuthContext } from '../store/Provider/AuthProvider';
import { useLocation } from 'react-router-dom';
import AuthState from '../components/auth/AuthState';
import { BsChat, BsPaperclip } from 'react-icons/bs';
import { FaCity, FaCodeBranch, FaHome } from 'react-icons/fa';

// @ts-ignore
const AdminRoute = ({ component: Component, ...rest }) => {
  const { state, dispatch }: any = useContext(AuthContext);
  const isAuth = useAuth();
  const location = useLocation();
  const isActive = useCallback((route: string) => {
    return location.pathname == route;
  }, [location.pathname])
  return (
    <>
      <main>
        <aside className="sidebar">

          <ul className="sidebar-content">
            <li className={`${isActive('/admin') ? 'active' : ''}`}>
              <Link to={"/admin"} className="sidebar-menu py-4">
                <span className="sidebar-menu-icon">
                  <FaHome />
                </span>
                <span className="sidebar-menu-text">Dashboard</span>
                <span className="sidebar-menu-arrow">

                </span>
              </Link>

            </li>

            <div className="sidebar-menu-header">Forum</div>
            <li className={`${isActive('/admin/themes') ? 'active' : ''}`}>
              <Link to={'/admin/themes'} className="sidebar-menu">
                <span className="sidebar-menu-icon">
                  <BsChat />
                </span>
                <span className="sidebar-menu-text">Themes de discussions</span>
              </Link>
            </li>
            <li className={`${isActive('/admin/sujets') ? 'active' : ''}`}>
              <Link to={'/admin/sujets'} className="sidebar-menu">
                <span className="sidebar-menu-icon">
                  <BsPaperclip />
                </span>
                <span className="sidebar-menu-text">Sujet de discussions</span>
              </Link>
            </li>
            
            <div className="sidebar-menu-header">Localisation</div>
            <li className={`${isActive('/') ? 'active' : ''}`}>
              <a href="#" className="sidebar-menu">
                <span className="sidebar-menu-icon">
                  <FaCity />
                </span>
                <span className="sidebar-menu-text">Ville</span>
              </a>
            </li>
          </ul>
        </aside>
        <div className="wrapper">
          <div className="header">
            <div className="container-fluid flex items-center justify-between">
              <div className="flex items-center space-x-6">



              </div>

              <div className="flex items-center">
                <AuthState />
              </div>
            </div>
          </div>
          <div className="content">

            <main className="container flex-grow p-2 sm:p-4">

              <Route
                {...rest}
                render={(props: any) =>
                  isAuth ? <Component {...props} /> : <Redirect to="/login" />
                }
              />
            </main>

          </div>
        </div>
      </main>
    </>
  );
};

export default AdminRoute;
