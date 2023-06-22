import React from "react";
import ChatSidebar from "./ChatSidebar";
import Chat from "./Chat";
import "./ChatStyle.scss";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

const Main = () => {
  return (
    <div className="ChatHome">
      <div className="container">
        <ChatSidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Main;
