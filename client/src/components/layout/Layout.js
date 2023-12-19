import React from "react";
import Header from "../Header";
import Footer from "../Footer";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="min-h-70 p-24">{children}</main>
      {/* <ToastContainer/>
      <Footer /> */}
    </div>
  );
};

export default Layout;
