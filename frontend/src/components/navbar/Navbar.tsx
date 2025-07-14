import { Link } from "react-router-dom";
import logo from "./logo.png";
import "./Navbar.css";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} alt="Finshark logo" />
          </Link>

          <div className="hidden lg:flex font-black">
            <Link to="/search" className="text-black hover:text-darkBlue">
              Search
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-6 text-black">
          <div className="hover:text-darkBlue">Login</div>
          <a
            href=""
            className="font-bold rounded bg-lightGreen text-white hover:opacity-70 px-8 py-3"
          >
            Singup
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
