import { Link } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import "../App.css"

function SignUpPage() {
  return (
    <>
      <ToastContainer theme="dark" />
      <div className="flex h-screen items-center justify-center ">
        <div className="w-sm flex flex-col items-center justify-center rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>
          <form className="w-sm flex flex-col items-center justify-center md:w-72">
            <input
              type="text"
              className="mb-4 w-full rounded-md bg-slate-300 p-2"
              placeholder="Name"
              required
            />
            <input
              type="text"
              className="mb-4 w-full rounded-md bg-slate-300 p-2"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="mb-4 w-full rounded-md bg-slate-300 p-2"
              placeholder="Password"
              required
            />
            <input
              type="password"
              className="mb-4 w-full rounded-md bg-slate-300 p-2"
              placeholder="Confirm Password"
              required
            />
            <button
              type="submit"
              className="w-1/2 rounded-full bg-slate-500 px-4 py-2 text-white hover:bg-slate-600"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4">
            Already a user?{" "}
            <Link to={"/login"} className=" text-blue-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
