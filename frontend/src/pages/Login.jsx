import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // const { token,backendUrl, setToken, navigate } = useContext(ShopContext);

const { token, backendUrl, setToken } = useContext(ShopContext);

const navigate = useNavigate();

  const [currentState, setCurrentState] = useState("Login");
// const {token,setToken,navigate,backendUrl}=useContext(ShopContext)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const url =
        currentState === "Login"
          ? `${backendUrl}/api/user/login`
          : `${backendUrl}/api/user/register`;

      const payload =
        currentState === "Login"
          ? { email, password }
          : { name, email, password };

      const response = await axios.post(url, payload);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);

        toast.success(
          currentState === "Login"
            ? "Login Successful"
            : "Account Created Successfully"
        )
      
      

        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  }
  // useEffect(()=>{
  //   if(token){
  //     navigate('/')

  //   }
  // },[token])

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-4 w-full sm:max-w-md border rounded-lg px-8 py-8 shadow-md"
      >
        <div className="text-center">
          <h2 className="text-3xl font-semibold">
            {currentState}
          </h2>

          <p className="text-gray-500 mt-2">
            {currentState === "Login"
              ? "Welcome back! Login to continue."
              : "Create your account to start shopping."}
          </p>
        </div>

        {currentState === "Sign Up" && (
          <input
            type="text"
            placeholder="Full Name"
            className="border rounded px-4 py-3 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          className="border rounded px-4 py-3 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border rounded px-4 py-3 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex justify-between text-sm text-gray-600">
          <button
            type="button"
            className="hover:text-black"
          >
            Forgot Password?
          </button>

          {currentState === "Login" ? (
            <button
              type="button"
              onClick={() => setCurrentState("Sign Up")}
              className="hover:text-black"
            >
              Create Account
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentState("Login")}
              className="hover:text-black"
            >
              Login Here
            </button>
          )}
        </div>

        <button
          type="submit"
          className="bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          {currentState === "Login"
            ? "Login"
            : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default Login;