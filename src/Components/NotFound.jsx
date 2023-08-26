/* eslint-disable react/prop-types */
import React from "react";
import { NavLink } from "react-router-dom";
import { WarningFilled } from "@ant-design/icons";

const NotFound = ({ errorMsg }) => {
  return (
    <section>
      <div className="container flex mt-6 mx-auto mb-10">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <WarningFilled className="text-8xl text-gray-500 mb-5" />

          <h1 className=" text-2xl font-semibold text-gray-800 md:text-3xl">
            {errorMsg ? errorMsg : "Page not found"}
          </h1>
          {!errorMsg && (
            <p className="mt-4 text-gray-500 ">
              The page you are looking for doesn&apos;t exist.
            </p>
          )}

          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <NavLink
              to="/"
              className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-gray-800  rounded-lg shrink-0 sm:w-auto hover:bg-gray-600 "
            >
              Take me home
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
