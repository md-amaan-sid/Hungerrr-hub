import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Error from "./pages/Error";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/slices/authSlice";

const App = () => {
  return (
    <BrowserRouter>
      <AuthHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/success"
          element={<Success />} />
        <Route path="/*" element={<Error />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

const AuthHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        dispatch(login());
        if (location.pathname === "/login") {
          navigate("/"); 
        }
      } else {
       
        dispatch(logout());
      }
    });

    return () => unsubscribe(); 
  }, [dispatch, navigate, location.pathname]);

  return null;
};

export default App;
