import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  
    setTimeout(() => {
      setLoading(false);
    }, 3000);

   
    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 5000);

   
    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading ? (
        <PropagateLoader color="#042f66" />
      ) : (
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Order Successful!
          </h2>
          <p>Your order has been successfully placed.</p>
        </div>
      )}
    </div>
  );
};

export default Success;
