import React from "react";
import { Route, Redirect, Link } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import AppContainer from "../components/admin/AppContainer";
import BodyWrapper from "../components/admin/BodyWrapper";
import Header from "../components/admin/Header";
import SidebarHeader from "../components/admin/SidebarHeader";
import NavTree from "../components/admin/NavTree";
import NavItem from "../components/admin/NavItem";
import {
  FiBook,
  FiCloud,
  FiHelpCircle,
  FiHome,
  FiInfo,
  FiList,
  FiLogOut,
  FiPlay,
  FiPlayCircle,
  FiPlus,
  FiSearch,
  FiUsers,
} from "react-icons/fi";
import { MdOutlineExplore, MdSkipPrevious } from "react-icons/md";
import { LuShuffle } from "react-icons/lu";
import { ImNext, ImNext2, ImPrevious, ImPrevious2 } from "react-icons/im";
import {
  FaEllipsis,
  FaEllipsisVertical,
  FaLanguage,
  FaLayerGroup,
  FaPlus,
  FaRepeat,
} from "react-icons/fa6";
import { TbLanguage, TbRepeat } from "react-icons/tb";
import {
  BsMoonFill,
  BsShuffle,
  BsSkipBackward,
  BsSkipBackwardFill,
  BsSkipForward,
  BsSkipForwardFill,
  BsSunFill,
} from "react-icons/bs";
import { FaInfoCircle, FaKickstarter } from "react-icons/fa";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = false;
  return (
    <AppContainer>
      <Sidebar>
        <SidebarHeader />


        <NavTree route={"/"} title={"Home"}>
          <FiInfo />
        </NavTree>

      </Sidebar>
      <BodyWrapper>
        <Header>

        </Header>
        <Route
          {...rest}
          render={(props: any) =>
            isAuthenticated ? (
              <Component {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </BodyWrapper>
    </AppContainer>
  );
};

export default PrivateRoute;
