import React from "react";
import NavbarMaskapai from "../components/maskapai/NavbarMaskapai";
import SidebarMaskapai from "../components/maskapai/SidebarMaskapai";

const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <SidebarMaskapai />
      <div style={{flex: 1}}>
        <NavbarMaskapai />
        {children}
      </div>
    </div>
  );
};

export default Layout;
