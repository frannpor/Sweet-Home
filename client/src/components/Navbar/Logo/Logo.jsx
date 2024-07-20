import logo from "../../../assets/image/logo.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <img
        className="w-16 h-16 md:w-20 md:h-20 object-contain cursor-pointer select-none"
        src={logo}
        alt="Logo"
      />
    </Link>
  );
}

export default Logo;
