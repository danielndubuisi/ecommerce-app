import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContextFile";
import Title from "../components/Title";

const Orders = () => {
    const { products, currency } = useContext(ShopContext);

    return (
        <div className="border-t border-gray-200 pt-16">
            <div className="text-2xl">
                <Title text1={"MY"} text2={"ORDERS"} />
            </div>
            <div>
                {products.slice(1, 4).map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="py-4 border-t border-b border-gray-200 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                        >
                            <div className="flex items-start gap-6 text-sm">
                                <img
                                    src={item.image[0]}
                                    alt="product-image"
                                    className="w-16 sm:w-20"
                                />
                                <div>
                                    <p className="sm:text-base font-medium">
                                        {item.name}
                                    </p>
                                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                                        <p className="text-lg text-green-700">
                                            {currency}
                                            {item.price}
                                        </p>
                                        <p>Quantity: 1</p>
                                        <p>Size: M</p>
                                    </div>
                                    <p>
                                        Date:{" "}
                                        <span className="text-gray-400">
                                            25 March, 2025
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="md:w-1/2 flex justify-between">
                                <div className="flex items-center gap-2">
                                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                                    <p className="text-sm">Ready to ship</p>
                                </div>
                                <button className="border border-gray-200 px-4 py-2 text-sm font-medium text-green-700 rounded-sm hover:bg-green-700 hover:text-white cursor-pointer">
                                    Track Order
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Orders;
