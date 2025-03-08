import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextFile";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
    const {products} = useContext(ShopContext);

    const [bestSellers, setBestSellers] = useState([]);    

    useEffect(() => {
        const bestSellerProducts = products.filter((product) => product.bestseller);
        setBestSellers(bestSellerProducts.slice(0, 5));
    }, [products]);

    return (
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <Title text1={"BEST"} text2={"SELLERS"} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Best selling products are simply our consumers' favorites.
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 gap-y-6">
                {
                    bestSellers.map((product, index) => (
                        <ProductItem
                            key={index}
                            id={product._id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                        />
                    ))
                }
            </div>
        </div>
    );
};
export default BestSeller;
