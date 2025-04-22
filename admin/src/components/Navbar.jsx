import React from "react";
import {assets} from "../assets/assets.js";

const Navbar = ({setToken}) => {
    return <div className="flex justify-between py-2 px-[4%] items-center bg-gray-100 p-4">
        <img className="w-[max(10%,80px)]" src={assets.logo} alt="admin-logo" />
        <button onClick={() => setToken('')} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-sm sm:text-sm hover:bg-red-700 cursor-pointer">Logout</button>
    </div>;
};

export default Navbar;
