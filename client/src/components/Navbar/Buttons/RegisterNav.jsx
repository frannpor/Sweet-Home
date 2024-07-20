import { useNavigate } from "react-router-dom";
import { BiUserPlus } from "react-icons/bi";

function RegisterNav() {
  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div onClick={navigateToRegister} className="flex items-center">
      <div className="flex items-center gap-2 cursor-pointer p-2 border rounded-full hover:shadow-md transition bg-white">
        <BiUserPlus className="hidden md:block text-xl" />
        <button className="text-sm md:text-base">Register</button>
      </div>
    </div>
  );
}

export default RegisterNav;
