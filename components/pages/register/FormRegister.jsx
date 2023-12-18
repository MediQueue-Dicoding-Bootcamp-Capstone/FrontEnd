"use client";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showError, setShowError] = useState();
  const router = useRouter();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const handleRegister = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const name = nameRef.current.value;

    console.log(name, email, password);
    if (password !== confirmPassword) {
      setShowError("Password doesn't match");
      return;
    }
    const response = await axios.post("/api/register", {
      email,
      password,
      name,
    });
    console.log(response);
    if(response.data.status != true) {
      setShowError(response.data.message.errors.email[0]);
      return;
    }
    localStorage.setItem("isLogin", true);
    localStorage.setItem("name", response.data.data.name);
    localStorage.setItem("role", response.data.data.role);
    router.push("/");
    
  };
  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <form className="w-full sm:px-4 md:px-8" onSubmit={handleRegister}>
      {showError ? (
        <div className="w-full bg-red-500 text-white text-center py-2 mb-4 rounded-md">
          {showError}
        </div>
      ) : null}
      <div className="mb-4 w-full">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="w-full border-2 border-primary rounded-md py-2 px-4 focus:outline-none focus:border-secondary"
          ref={nameRef}
          placeholder="Your name"
        />
      </div>
      <div className="mb-4 w-full">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="w-full border-2 border-primary rounded-md py-2 px-4 focus:outline-none focus:border-secondary"
          ref={emailRef}
          placeholder="Your email"
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
            ref={passwordRef}
            placeholder="Your password"
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
      <div className="mb-4 w-full">
        <label htmlFor="confirm_password">Confirm Password</label>
        <div className="relative w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirm_password"
            id="confirm_password"
            className="w-full border-2 border-primary rounded-md py-2 px-4 focus:outline-none focus:border-secondary"
            ref={confirmPasswordRef}
            placeholder="Your password"
          />
          <button
            className="absolute top-1/2 right-3 -translate-y-1/2"
            onClick={(e) => handleShowConfirmPassword(e)}
          >
            {showConfirmPassword ? (
              <FiEyeOff className="text-primary" />
            ) : (
              <FiEye className="text-primary" />
            )}
          </button>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-8">
        <button
          type="submit"
          className="w-full bg-secondary font-semibold rounded-md py-3 text-white"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default FormRegister;
