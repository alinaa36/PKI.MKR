import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
            <Link to="/"></Link>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;