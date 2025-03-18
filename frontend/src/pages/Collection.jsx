import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextFile";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState("relevant");

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory((prev) =>
                prev.filter((product) => product !== e.target.value)
            );
        } else {
            setCategory((prev) => [...prev, e.target.value]);
        }
    };

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory((prev) =>
                prev.filter((product) => product !== e.target.value)
            );
        } else {
            setSubCategory((prev) => [...prev, e.target.value]);
        }
    };

    const applyFilter = () => {
        let productsCopy = products.slice();

        // search functionality
        if (showSearch && search) {
            productsCopy = productsCopy.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // filter by category
        if (category.length > 0) {
            productsCopy = productsCopy.filter((item) =>
                category.includes(item.category)
            );
        }

        // filter by subcategory
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter((item) =>
                subCategory.includes(item.subCategory)
            );
        }

        setFilteredProducts(productsCopy);
    };

    const sortProduct = () => {
        let filteredCopy = filteredProducts.slice();

        switch (sortType) {
            case "low-high":
                setFilteredProducts(
                    filteredCopy.sort((a, b) => a.price - b.price)
                );
                break;

            case "high-low":
                setFilteredProducts(
                    filteredCopy.sort((a, b) => b.price - a.price)
                );
                break;

            default:
                applyFilter();
                break;
        }
    };

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch]);

    useEffect(() => {
        sortProduct();
    }, [sortType]);

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-gray-200 border-t">
            {/* Filter options */}
            <div className="min-w-60">
                <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
                    FILTERS
                    <img
                        onClick={() => setShowFilter(!showFilter)}
                        className={`h-3 sm:hidden ${
                            showFilter ? "rotate-90" : ""
                        }`}
                        src={assets.dropdown_icon}
                        alt="dropdown"
                    />
                </p>
                {/* Category filter */}
                <div
                    className={`border border-gray-300 pl-5 py-3 mt-6 ${
                        showFilter ? "" : "hidden"
                    } sm:block`}
                >
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-grey-700">
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                className="w-3"
                                value={"Men"}
                                onChange={toggleCategory}
                            />{" "}
                            Men
                        </p>
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                className="w-3"
                                value={"Women"}
                                onChange={toggleCategory}
                            />{" "}
                            Women
                        </p>
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                className="w-3"
                                value={"Kids"}
                                onChange={toggleCategory}
                            />{" "}
                            Kids
                        </p>
                    </div>
                </div>
                {/* Subcategory filter */}
                <div
                    className={`border border-gray-300 pl-5 py-3 my-5 ${
                        showFilter ? "" : "hidden"
                    } sm:block`}
                >
                    <p className="mb-3 text-sm font-medium">TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-grey-700">
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                className="w-3"
                                value={"Topwear"}
                                onChange={toggleSubCategory}
                            />{" "}
                            Topwear
                        </p>
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                className="w-3"
                                value={"Bottomwear"}
                                onChange={toggleSubCategory}
                            />{" "}
                            Bottomwear
                        </p>
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                className="w-3"
                                value={"Winterwear"}
                                onChange={toggleSubCategory}
                            />{" "}
                            Winterwear
                        </p>
                    </div>
                </div>
            </div>
            {/* Right Side */}
            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={"ALL"} text2={"COLLECTIONS"} />
                    {/* Product sort */}
                    <select
                        onChange={(e) => setSortType(e.target.value)}
                        className="border border-gray-300 text-sm px-2"
                    >
                        <option value="Relevant">Sort By: Relevant</option>
                        <option value="low-high">Sort By: Low to High</option>
                        <option value="high-low">Sort By: High to Low</option>
                    </select>
                </div>
                {/* display all products */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {filteredProducts.map((product, index) => (
                        <ProductItem
                            key={index}
                            id={product._id}
                            name={product.name}
                            image={product.image}
                            price={product.price}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collection;
