import { Outlet } from "react-router-dom";
import TabBar from "./TabBar";
import Header from "./Header";

function Layout() {
  return (
    <>
      <Header />
      <TabBar />
      <Outlet />
    </>
  );
}

export default Layout;
