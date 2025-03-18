import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContextFile";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, image, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
            <div className="overflow-hidden">
                <img className="hover:scale-110 transition-ease-in-out" src={image[0]} alt="product-img" loading="lazy" />
            </div>
            <p className="pt-3 pb-1 text-sm">{name}</p>
            <p className="font-medium text-sm text-green-600">{currency}{price}</p>
        </Link>
    );
};

export default ProductItem;
