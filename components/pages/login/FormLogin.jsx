"use client";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const router = useRouter();
  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const response = await axios.post("/api/login", { email, password });
    if(response.data.status === false){
        setErrorMessage(response.data.message);
        return;
    }
    Swal.fire({
      icon: 'success',
      title: 'You have successfully logged in',
      showConfirmButton: false,
      timer: 2000,
    });
    setTimeout(() => {
      // i want to redirect to home page with hotreload
      window.location.href = '/';
    }
    , 2500);
  };

  return (
    <div className="w-full h-5/6 flex flex-col items-center justify-center px-4 lg:px-8 ">
      <h2 className="text-3xl font-semibold mb-10">Sign In</h2>
      <form className="w-full sm:px-4 md:px-8" onSubmit={handleLogin}>
        {errorMessage ? <div className="w-full mb-4 bg-red-200 py-2 text-center text-red-600"><p>{errorMessage}</p></div> : null}

        <div className="mb-4 w-full">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full border-2 border-primary rounded-md py-2 px-4 focus:outline-none focus:border-secondary"
            placeholder="Your email"
            ref={emailRef}
          />
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="password">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="w-full border-2 border-primary rounded-md py-2 px-4 focus:outline-none focus:border-secondary"
              placeholder="Your password"
              ref={passwordRef}
            />
            <button
              className="absolute top-1/2 right-3 -translate-y-1/2"
              onClick={(e) => handleShowPassword(e)}
            >
              {showPassword ? (
                <FiEyeOff className="text-primary" />
              ) : (
                <FiEye className="text-primary" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full flex items-center justify-between mt-8">
          <div className="w-2/5 p-1">
            <Link
              href="/forgot-password"
              className="text-blue-700 text-md md:text-base"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-3/5 bg-secondary font-semibold rounded-md py-3 text-white"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormLogin;
