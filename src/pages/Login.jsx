import axios from "axios";
import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { USER_API_END_POINT } from "../utils/apiEndPoints";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";

function Login() {
    const [loadingBtn, setLoadingBtn] = useState(false)
  const navigate = useNavigate();
  const [eye, setEye] = useState(true);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    setLoadingBtn(true)
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        { email, password },
        { withCredentials: true }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message || "login successful");
        setError("");
        navigate("/");
        e.target.reset();
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong";
      setError(errMsg);
    }finally{
        setLoadingBtn(false)
    }
  };

  return (
    <div className="w-[90%] mx-auto">
        <Link className="flex items-center gap-2 btn bg-favone/80 hover:bg-favone w-min px-10 my-6" to={"/"}> <IoMdArrowRoundBack /> Home
        </Link>
        <div className="flex justify-center items-center h-[70vh]">
        
      <div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 w-96 border-favone border-2 p-5 rounded-xl shadow-xl hover:shadow-2xl"
        >
            <p className="text-2xl font-bold text-center">Media<span className="text-red-500">Up</span> Login</p>
          {/* email */}
          <div className="flex flex-col">
            <label className="text-lg font-bold " htmlFor="">
              Email :
            </label>
            <input
              type="eamil"
              name="email"
              className="text-gray-500 border-favone border-2 p-2 rounded-md w-full"
              placeholder="Enter name here "
            />
          </div>

          {/* password */}
          <div className="flex flex-col relative">
            <label className="text-lg font-bold " htmlFor="">
              Password :
            </label>
            <input
              type={`${eye ? "password" : "text"}`}
              name="password"
              className="text-gray-500 border-favone border-2 p-2 rounded-md w-full "
              placeholder="Enter password here "
            />
            {eye ? (
              <IoMdEye
                type="button"
                onClick={() => setEye(!eye)}
                className=" absolute top-11/20 right-3 cursor-pointer"
                size={20}
              />
            ) : (
              <IoMdEyeOff
                type="button"
                onClick={() => setEye(!eye)}
                size={20}
                className=" absolute top-11/20 right-3 cursor-pointer"
              />
            )}
          </div>
          {/* error */}
          {error && <span className="text-red-500">{error}</span>}
          {/* login button */}
          <div className=" flex flex-col justify-center items-center w-full">
            <button
              type="submit"
              className="btn bg-favone/80 hover:bg-favone w-full"
            >
              {loadingBtn ?<div className="loading loading-spinner loading-md"></div> :"Login"}
            </button>
            <span className="my-2">
              Don't have account?{" "}
              <Link className="text-green-500" to={"/register"}>
                register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
    </div>
    
  );
}

export default Login;
