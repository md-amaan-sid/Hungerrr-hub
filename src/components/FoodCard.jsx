import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/CartSlice";

const FoodCard = ({ id, name, price, img, rating, handleToast }) => {
  const dispatch = useDispatch();

  
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("Please log in to add items to the cart.");
      return;
    }

    dispatch(addToCart({ id, name, price, rating, img, qty: 1 }));
    handleToast(name);
  };

  return (
    <div className="font-bold w-[250px] bg-white p-5 flex flex-col rounded-lg gap-2">
      <img
        src={img}
        alt=""
        className="w-auto h-[130px] bg-white hover:scale-110 cursor-grab transition-all duration-500 ease-in-out "
      />
      <div className="text-sm flex justify-between">
        <h2>{name}</h2>
        <span className="text-indigo-500">${price}</span>
      </div>

      <div className="flex justify-between">
        <span className="flex justify-center items-center">
          <AiFillStar className="mr-1 text-yellow-400" /> {rating}
        </span>
        <button
          onClick={handleAddToCart}
          className="p-1 text-white bg-indigo-500 hover:bg-indigo-700 rounded-lg text-sm"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
