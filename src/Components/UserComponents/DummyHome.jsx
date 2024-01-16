import React from "react";
import UserNavbar from "./UserNavbar";
import { Link } from "react-router-dom";
import OwnerFooter from "../OwnerComponents/OwnerFooter";

const DummyHome = () => {
  return (
    <div>
      <UserNavbar />

      <div class="bg-green-100 p-6">
        <div class="w-full min-h-screen m-auto">
          <div class=" w-3/4 h-80 m-auto relative bnr ">
            <p class="absolute top-3 right-5 text-slate-50 ">
              Your premier destination for <br />
              high quality room rentals
            </p>
            <div class="absolute bottom-1 right-3">
              <button
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <Link to="/login">Signin</Link>{" "}
              </button>
            </div>
          </div>
          <div class="mt-4 flex flex-wrap justify-evenly p-8">
            <div class=" bg-green-700 bnrs1 dk">
              <h2 class="mt-3 ms-3 text-slate-50 text-xl mt-1 font-bold">
                Rooms are available here according to your budget
              </h2>
            </div>
            <div class=" bg-green-700 bnrs2">
              <h2 class="mt-3 ms-3 text-slate-50 text-xl mt-1 font-bold">
                We provides verified and clean rooms
              </h2>
            </div>
            <div class=" bg-green-700 bnrs3">
              <h2 class="mt-3 ms-3 text-slate-50 text-xl mt-1 font-bold">
                Find available rooms in your location
              </h2>
            </div>
          </div>
          <div class="tailban p-9 blr">
            <h1 class="text-green-700 text-center mt-11 text-5xl font-bold ">
              Rooms Starts @ 2000/m
            </h1>
            <p class="text-slate-50 text-center p-9 m-auto">
              Welcome to our ROM booking website! We offer a seamless and
              personalized booking experience for a wide range of ROMs across
              various platforms. Our user-friendly interface allows you to
              search, compare, and book ROMs with just a few clicks. We are
              committed to providing you with the best ROMs at competitive
              prices. Start your digital journey with us today! Enjoy a
              hassle-free ROM booking experience, only on our platform. Happy
              booking!
            </p>
            <div class='m-auto'></div>
          </div>
        </div>
      </div>
      <OwnerFooter/>
    </div>
  );
};

export default DummyHome;
