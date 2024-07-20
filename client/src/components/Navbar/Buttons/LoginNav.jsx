import { useNavigate } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";

function LoginNav() {
  const navigate = useNavigate();

  const navigateToProducts = () => {
    navigate("/login");
  };

  return (
    <div onClick={navigateToProducts} className="flex items-center">
      <div className="flex items-center gap-2 cursor-pointer p-2 border rounded-full hover:shadow-md transition bg-white">
        <IoLogIn className="hidden md:block text-xl" />
        <button className="text-sm md:text-base">Log in</button>
      </div>
    </div>
  );
}

export default LoginNav;
