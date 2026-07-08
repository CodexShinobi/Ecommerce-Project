import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try{
    e.preventDefault();
    
    const response = await axios.post(backendUrl + '/api/user/admin',{email,password})

    if(response.data.success){
      setToken(response.data.token)
    }else{
      toast.error(response.data.message)
    }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>

            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Password
            </p>

            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-black px-4 py-2 text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;