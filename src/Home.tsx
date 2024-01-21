import React from "react";
import { IoChatbubbles } from "react-icons/io5";
import Header from "./components/Header";
import Topics from "./components/topic";
import { FaEye, FaUserFriends } from "react-icons/fa";
import { BsChat, BsChatHeartFill } from "react-icons/bs";
import { CiChat2 } from "react-icons/ci";
import ResourceIndex from "./components/admin/resources";
import Admin from "./components/admin";

const Home = () => {
  
  return (
    <>
      <h3 className="text-pink-500 my-2 uppercase flex flex-row gap-2"><BsChatHeartFill size={18}/> <span>Forum</span></h3>
     <Topics />
    </>
  );
};
export default Home;
