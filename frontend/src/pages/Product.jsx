import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContextFile";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
    const { productId } = useParams();
    const { products, currency } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState("");
    const [productSize, setProductSize] = useState("");

    const fetchProductData = async () => {
        products.map((product) => {
            if (product._id === productId) {
                setProductData(product);
                setImage(product.image[0]);
                return null;
            }
        });
    };

    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    return productData ? (
        <div className="border-t border-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100">
            {/* Product data */}
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                {/* Product images */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {productData.image.map((img, index) => (
                            <img
                                onClick={() => setImage(img)}
                                src={img}
                                key={index}
                                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                            />
                        ))}
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img
                            className="w-full h-auto"
                            src={image}
                            alt="firstImg"
                        />
                    </div>
                </div>
                {/* Product info */}
                <div className="flex-1">
                    <h1 className="font-medium text-2xl mt-2">
                        {productData.name}
                    </h1>
                    <div className="flex items-center gap-1 mt-2">
                        <img
                            src={assets.star_icon}
                            alt="star"
                            className="w-3 5"
                        />
                        <img
                            src={assets.star_icon}
                            alt="star"
                            className="w-3 5"
                        />
                        <img
                            src={assets.star_icon}
                            alt="star"
                            className="w-3 5"
                        />
                        <img
                            src={assets.star_icon}
                            alt="star"
                            className="w-3 5"
                        />
                        <img
                            src={assets.star_dull_icon}
                            alt="star"
                            className="w-3 5"
                        />
                        <p className="pl-2">(122)</p>
                    </div>
                    <p className="mt-5 text-3xl font-medium text-green-600">
                        {currency}
                        {productData.price}
                    </p>
                    <p className="mt-5 text-gray-500 md:w-4/5">
                        {productData.description}
                    </p>
                    <div className="flex flex-col gap-4 my-8">
                        <p>Select Size</p>
                        <div className="flex gap-2">
                            {productData.sizes.map((size, index) => (
                                <button
                                    onClick={() => setProductSize(size)}
                                    className={`border border-gray-300 py-2 px-4 bg-gray-100 ${
                                        size === productSize
                                            ? "border-green-700"
                                            : ""
                                    } cursor-pointer`}
                                    key={index}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button className="bg-indigo-600 text-white px-8 py-3 text-sm active:bg-green-700 rounded cursor-pointer">
                        ADD TO CART
                    </button>
                    <hr className="mt-8 sm:w-4/5 text-gray-400" />
                    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                        <p>100% Original Products.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>
            {/* Description and review section */}
            <div className="mt-20">
                <div className="flex">
                    <b className=" border border-gray-300 px-5 py-3 text-sm">
                        Description
                    </b>
                    <p className="border border-gray-300 px-5 py-3 text-sm">
                        Reviews (122)
                    </p>
                </div>
                <div className="flex flex-col gap-4 border border-gray-300 px-6 py-6 text-sm text-gray-600">
                  <p>This product can be great for summer, winter and fall seasons while looking incredibly stylish no matter the occasion. I usually recommend using an e-commerce platform like Forever to purchase as the delivery time is so much better</p>
                  <p>Easily a great choice for all fashion lovers. The price is also great for the product quality. In view, related products are also a great space to find matching clothing items for even kids and other family members.</p>
                </div>
            </div>
            {/* Related Products section */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
    ) : (
        <div className="opacity-0"></div>
    );
};

export default Product;
