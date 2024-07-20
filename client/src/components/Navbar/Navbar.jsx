import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/authContex";
import { useNavigate } from "react-router-dom";
import ShopNowNav from "./Buttons/ShopNowNav";
import AboutNav from "./Buttons/AboutNav";
import RecommendationsNav from "./Buttons/RecommendationsNav";
import Inspiration from "./Buttons/Inspiration";
import TopWeekNav from "./Buttons/TopWeekNav";
import MostValuedNav from "./Buttons/MostValueNav";
import ShoppingCart from "./Buttons/ShoppingCart";
import LoginNav from "./Buttons/LoginNav";
import RegisterNav from "./Buttons/RegisterNav";
import Logo from "./Logo/Logo";
import userPlaceholder from "../../assets/image/person-placeholder-400x400.png";
import { useDispatch } from "react-redux";
import { getUserByUid } from "../../Redux/actions/actions";
import { HiMenu } from "react-icons/hi";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [completeUser, setCompleteUser] = useState({ photoURL: "" });
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  useEffect(() => {
    if (user) {
      dispatch(getUserByUid(user.uid)).then((response) => {
        setCompleteUser(response.payload);
      });
    }
  }, [dispatch, user]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigation = (path, sectionId) => {
    closeMenu();
    if( path != "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (window.location.pathname === "/") {
      navigate(path);
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 500);
    } else {
      scrollToSection(sectionId);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      ref={menuRef}
      className="sticky top-0 w-full bg-neutral-200 z-50 shadow-sm select-none"
    >
      <div>
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
          <div className="flex 2xl:flex-row 2xl:flex-wrap 2xl:items-center justify-between gap-3 2xl:gap-0 2xl:flex">
            <button onClick={() => handleNavigation("/", "homeSection")} className="order-first">
              <Logo />
            </button>
            <div className="hidden lg:flex lg:flex-wrap lg:items-center lg:gap-3">
              <div onClick={() => handleNavigation("/products", "shopNowSection")}>
                <ShopNowNav />
              </div>
              <div onClick={() => handleNavigation("/about", "aboutSection")}>
                <AboutNav />
              </div>
              <div onClick={() => handleNavigation("/", "recommendationsSection")}>
                <RecommendationsNav />
              </div>
              <button onClick={() => handleNavigation("/", "inspirationSection")}>
                <Inspiration />
              </button>
              <button onClick={() => handleNavigation("/", "topWeekSection")}>
                <TopWeekNav />
              </button>
              <button onClick={() => handleNavigation("/", "mostValuedSection")}>
                <MostValuedNav />
              </button>
              <button onClick={() => handleNavigation("/checkout", "checkOutSection")}>
                <ShoppingCart />
              </button>
            </div>
            <div className="flex flex-row items-center justify-end">
              <button onClick={handleMenuToggle} className="lg:hidden p-2 border-[1px] rounded-full cursor-pointer transition">
                <HiMenu className="text-2xl" />
              </button>
              {user ? (
                <div
                  onClick={handleMenuToggle}
                  className="p-2 md:py-1 md:px-2 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer transition self-center select-none"
                >
                  {completeUser?.photoURL ? (
                    <img
                      src={completeUser.photoURL}
                      alt={completeUser.name || "user"}
                      className="rounded-full w-8 h-8"
                    />
                  ) : (
                    <img
                      src={userPlaceholder}
                      alt={completeUser?.name}
                      className="rounded-full w-8 h-8"
                    />
                  )}
                  <div className="flex flex-row items-center gap-3">
                    <h1 className="text-sm md:text-base hidden sm:block">
                      Hi {completeUser.name || completeUser.email}
                    </h1>
                  </div>
                </div>
              ) : (
                <div className="md:py-1 md:px-2 flex flex-row items-center gap-3 cursor-pointer">
                  <LoginNav />
                  <RegisterNav />
                </div>
              )}
              {isMenuOpen && (
                <div className="absolute top-full w-full bg-white shadow-md z-20 lg:hidden">
                  <div className="flex flex-col p-4">
                    {user ? (
                      <>
                        <button onClick={() => handleNavigation("/products", "shopNowSection")}>
                        </button>
                        <button onClick={() => handleNavigation("/about", "aboutSection")} className="py-2">
                          About
                        </button>
                        <button onClick={() => handleNavigation("/", "recommendationsSection")} className="py-2">
                          Recommendations
                        </button>
                        <button onClick={() => handleNavigation("/", "inspirationSection")} className="py-2">
                          Inspiration
                        </button>
                        <button onClick={() => handleNavigation("/", "topWeekSection")} className="py-2">
                          Top Week
                        </button>
                        <button onClick={() => handleNavigation("/", "mostValuedSection")} className="py-2">
                          Most Valued
                        </button>
                        <button onClick={() => handleNavigation("/checkout", "checkOutSection")} className="py-2">
                          Shopping Cart
                        </button>
                        <button className="py-2 select-none">
                          <hr className=" border"/>
                        </button>
                        <button onClick={() => handleNavigation("/my_profile", "profileSection")} className="py-2">
                          Profile
                        </button>
                        <button onClick={() => handleNavigation("/my_favorites", "favoritesSection")} className="py-2">
                          My Favorites
                        </button>
                        <button onClick={() => handleNavigation("/my_purchases", "purchasesSection")} className="py-2">
                          My Purchases
                        </button>
                        <button onClick={() => handleNavigation("/my_reviews", "reviewsSection")} className="py-2">
                          My Reviews
                        </button>
                        {user && user.role === "admin" && (
                          <button onClick={() => handleNavigation("/adminDashboard", "dashboardSection")} className="py-2">
                            Dashboard
                          </button>
                        )}
                        <button onClick={handleLogout} className="py-2">
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleNavigation("/products", "shopNowSection")} className="py-2">
                          Shop Now
                        </button>
                        <button onClick={() => handleNavigation("/about", "aboutSection")} className="py-2">
                          About
                        </button>
                        <button onClick={() => handleNavigation("/", "recommendationsSection")} className="py-2">
                          Recommendations
                        </button>
                        <button onClick={() => handleNavigation("/", "inspirationSection")} className="py-2">
                          Inspiration
                        </button>
                        <button onClick={() => handleNavigation("/", "topWeekSection")} className="py-2">
                          Top Week
                        </button>
                        <button onClick={() => handleNavigation("/", "mostValuedSection")} className="py-2">
                          Most Valued
                        </button>
                        <button onClick={() => handleNavigation("/checkout", "checkOutSection")}>
                          Shopping Cart
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
              {user && isMenuOpen && (
                <div className="relative select-none">
                  <div
                    className="absolute rounded-b-lg bg-white py-2 mt-4 w-36 right-0 shadow-md z-10 hidden lg:block"
                    style={{ top: "calc(100% + 5px)" }}
                  >
                    <div className="">
                      <button onClick={() => handleNavigation("/my_profile", "profileSection")} className="block px-4 py-2 hover:bg-gray-100 text-left">
                        My profile
                      </button>
                      <button onClick={() => handleNavigation("/my_favorites", "favoritesSection")} className="block px-4 py-2 hover:bg-gray-100 text-left">
                        My Favorites
                      </button>
                      <button onClick={() => handleNavigation("/my_purchases", "purchasesSection")} className="block px-4 py-2 hover:bg-gray-100 text-left">
                        My Purchases
                      </button>
                      <button onClick={() => handleNavigation("/my_reviews", "reviewsSection")} className="block px-4 py-2 hover:bg-gray-100 text-left">
                        My Reviews
                      </button>
                      {user && user.role === "admin" && (
                        <button onClick={() => handleNavigation("/adminDashboard", "dashboardSection")} className="block px-4 py-2 hover:bg-gray-100 text-left">
                          Dashboard
                        </button>
                      )}
                      <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 text-left">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;


                    // <hr className="my-2" />