import React from "react";
import Navbar from "../components/admin/Navbar";
import Sidebar from "../components/admin/Sidebar";

const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <Sidebar />
      <div style={{flex: 1}}>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
