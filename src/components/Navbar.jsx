import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../redux/slices/SearchSlice";
import { logout } from "../redux/slices/authSlice";
import { logout as firebaseLogout } from "../firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    firebaseLogout();
    dispatch(logout());
  };

  const handleRefresh = () => {
    window.location.reload(); 
  };

  return (
    <nav className="flex flex-col justify-between py-3 mx-6 mb-10">
      
      <div className="flex flex-col items-center">
        <h1
          className="text-4xl font-bold text-violet-700 text-center cursor-pointer"
          onClick={handleRefresh}
        >
          Hunger Hub
        </h1>
      </div>

      
      <div className="flex flex-row justify-between items-center mt-5">
        
        <h3 className="text-sm font-medium text-gray-600">
          {new Date().toUTCString().slice(0, 16)}
        </h3>

        
        {isLoggedIn ? (
          <button
            className="p-1 text-xs text-white bg-violet-500 hover:bg-violet-700 rounded-lg w-16 h-8"
            onClick={handleLogout}
          >
            Log Out
          </button>
        ) : (
          <button
            className="p-1 text-xs text-white bg-green-500 hover:bg-green-700 rounded-lg w-16 h-8"
            onClick={handleLogin}
          >
            Log In
          </button>
        )}
      </div>

      <div className="mt-3 mx-auto w-full lg:w-[50%]">
        <input
          type="search"
          name="search"
          id=""
          placeholder="Search here"
          autoComplete="off"
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="p-3 border border-gray-400 text-sm rounded-lg outline-none w-full"
        />
      </div>
    </nav>
  );
};

export default Navbar;
