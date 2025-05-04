import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import FoodItems from "../components/FoodItems";
import Cart from "../components/Cart";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Navbar />
      <FoodItems />
      {isLoggedIn && <Cart />}
    </>
  );
};

export default Home;
