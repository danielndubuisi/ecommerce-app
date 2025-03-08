import React from "react";

const NewsLetter = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault()
    }

    return <div className="text-center">
        <p className="text-2xl font-medium text-grey-800">Subscribe now and get 20% off</p>
        <p className="text-gray-400 mt-3">
            Subscribe to get weekly feeds on top trending products and exclusive discounts.
        </p>
        <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border-none pl-3">
            <input className="w-full sm:flex-1 outline-none" type="email" placeholder="Enter your email" required />
            <button className="bg-green-700 text-white text-xs px-10 py-4 cursor-pointer" type="submit">SUBSCRIBE</button>
        </form>
    </div>;
};

export default NewsLetter;
