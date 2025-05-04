
import React, { useState } from "react";
import { login, signup } from "../firebase";

function Login() {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user_auth = async (event) => {
    event.preventDefault();
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
  };

  return (
    <div className="h-screen p-5 bg-gradient-to-b from-white/30 to-white/30">
      <div className="w-full max-w-md bg-black/50 rounded-2xl shadow-md p-12 mx-auto">
        <h1 className="text-2xl font-medium mb-5 text-white">{signState}</h1>
        <form>
          {signState === "Sign Up" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your name"
              className="w-full h-12 bg-gray-800 text-gray-300 mb-3 rounded-lg px-4 text-sm font-medium outline-none"
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full h-12 bg-gray-800 text-gray-300 mb-3 rounded-lg px-4 text-sm font-medium outline-none"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full h-12 bg-gray-800 text-gray-300 mb-3 rounded-lg px-4 text-sm font-medium outline-none"
          />
          <button
            onClick={user_auth}
            type="submit"
            className="w-full bg-violet-500/80 text-white rounded-lg py-3 text-sm font-medium mt-5 hover:bg-violet-700 active:scale-90 transition"
          >
            {signState}
          </button>
        </form>
        <div className="mt-10 text-gray-300">
          {signState === "Sign In" ? (
            <p>
              New to Account?{" "}
              <span
                onClick={() => setSignState("Sign Up")}
                className="ml-2 text-white font-medium cursor-pointer"
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setSignState("Sign In")}
                className="ml-2 text-white font-medium cursor-pointer"
              >
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
