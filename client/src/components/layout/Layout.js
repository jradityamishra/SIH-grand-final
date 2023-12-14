import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideNavBar from "../navbar/SideNavBar";
const Layout = ({ children }) => {
  return (
    <div>
      <Header />

      <main className="min-h-70 p-24">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
