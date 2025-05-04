import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const FoodItems = () => {
  const [foodData, setFoodData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const search = useSelector((state) => state.search.search) || ""; 

  const handleToast = (name) => toast.success(`Added ${name}`);

  
  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);

      
      const cachedData = localStorage.getItem("foodData");
      if (cachedData) {
        setFoodData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
        );
        const data = await response.json();
        console.log("API Response:", data);

        if (data.meals) {
          const transformed = data.meals.map((meal) => ({
            id: meal.idMeal,
            name: meal.strMeal,
            price: Math.floor(Math.random() * 10) + 5, 
            desc: meal.strInstructions?.slice(0, 100) + "...",
            rating: 4.5, 
            img: meal.strMealThumb,
          }));

          
          localStorage.setItem("foodData", JSON.stringify(transformed));
          setFoodData(transformed);
        } else {
          setFoodData([]);
        }
      } catch (error) {
        console.error("Error fetching food data:", error);
        setFoodData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodData();
  }, [search]);

  
  const filteredFoodData = foodData.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-wrap gap-10 justify-center lg:justify-start mx-6 my-10">
        {loading ? (
          <h2 className="text-center text-xl font-bold text-gray-800">
            Loading...
          </h2>
        ) : filteredFoodData.length > 0 ? (
          filteredFoodData.map((food) => (
            <FoodCard
              key={food.id}
              id={food.id}
              name={food.name}
              price={food.price}
              desc={food.desc}
              rating={food.rating}
              img={food.img}
              handleToast={handleToast}
            />
          ))
        ) : (
          <h2 className="text-center text-xl font-bold text-gray-800">
            No data found
          </h2>
        )}
      </div>
    </>
  );
};

export default FoodItems;
