import "../App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "../Home";
import PrivateRoute from "../routes/PrivateRoute";
import Forum from "../Forum";
import Header from "../components/Header";
import Topic from "../Topic";
import CreateTopic from "../CreateTopic";
import NewResponse from "../NewResponse";
import LoginRegisterPage from "../components/auth/LoginRegisterPage";
import ForgotResetPassword from "../components/auth/ForgotResetPassword";
import ConnectedRoute from "./ConnectedRoute";
import PublicRoute from "./PublicRoute";
import Account from "../components/auth/account";
import EditProfile from "../components/auth/account/edit";
import ConfirmationEmailChange from "../components/auth/ConfirmationEmailChange";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import AdminDashboard from "../components/admin";
import AdminThemes from "../pages/admin/theme/index";
import AdminThemeAdd from "../pages/admin/theme/AddTheme";
import AdminEditTheme from "../pages/admin/theme/EditTheme";
import AdminDetailTheme from "../pages/admin/theme/DetailTheme";
import AdminSujets from "../pages/admin/sujet/index";
import AdminSujetAdd from "../pages/admin/sujet/AdminSujetAdd";
import AdminEditSujet from "../pages/admin/sujet/EditSujet";
import AdminDetailSujet from "../pages/admin/sujet/DetailSujet";
const Index = () => {

  return (
    <div>

      <Router>
              <Switch>
                <PublicRoute path="/" exact component={Home} />
                <UserRoute path="/login" exact component={LoginRegisterPage} />
                <UserRoute path="/forgot-password" exact component={ForgotResetPassword} />
                <ConnectedRoute exact path="/profile/me" component={Account} />
                <ConnectedRoute exact path="/profile/edit" component={EditProfile} />
                <UserRoute path="/confirmation/:id" exact component={ConfirmationEmailChange} />
                <PublicRoute path="/forum" exact component={Forum} />
                <PublicRoute path="/viewtopic" exact component={Topic} />
                <PublicRoute path="/new/topic" exact component={CreateTopic} />
                <PublicRoute path="/new/response" exact component={NewResponse} />
                <AdminRoute path="/admin" exact component={AdminDashboard} />
                <AdminRoute path="/admin/themes" exact component={AdminThemes} />
                <AdminRoute path="/admin/theme/add" exact component={AdminThemeAdd} />
                <AdminRoute path="/admin/theme/edit/:id" exact component={AdminEditTheme} />
                <AdminRoute path="/admin/theme/detail/:id" exact component={AdminDetailTheme} />
                <AdminRoute path="/admin/sujets" exact component={AdminSujets} />
                <AdminRoute path="/admin/sujet/add" exact component={AdminSujetAdd} />
                <AdminRoute path="/admin/sujet/edit/:id" exact component={AdminEditSujet} />
                <AdminRoute path="/admin/sujet/detail/:id" exact component={AdminDetailSujet} />
              </Switch>
            
      </Router>

    </div>
  );
};

export default Index;
