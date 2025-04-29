import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../../constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Edit = ({ token }) => {
    const navigate = useNavigate();
    // get id from url
    const id = new URLSearchParams(window.location.search).get("id");

    const [productData, setProductData] = useState({});
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestSeller, setBestSeller] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    // get product data from backend
    const fetchProductData = async () => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/product/single`,
                { id },
                {
                    headers: { token },
                }
            );
            if (response.data.success) {
                const product = response.data.product;

                // set product data to state
                setProductData(product);
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setCategory(product.category);
                setSubCategory(product.subCategory);
                setBestSeller(product.bestSeller);
                setSizes(product.sizes);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Could not fetch product data"
            );
        }
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestSeller", bestSeller);
            formData.append("sizes", JSON.stringify(sizes));
            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            const response = await axios.post(
                `${backendUrl}/api/product/edit`,
                formData,
                {
                    headers: { token },
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/list");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col w-full items-start gap-3"
        >
            {/* images upload */}
            <div>
                <p className="mb-2">Update Images</p>
                <div className="flex gap-2">
                    <label htmlFor="image1">
                        <img
                            className="w-20"
                            src={
                                !image1
                                    ? productData.image?.[0] ||
                                      assets.upload_area
                                    : URL.createObjectURL(image1)
                            }
                            alt="upload"
                        />
                        <input
                            onChange={(e) => setImage1(e.target.files[0])}
                            type="file"
                            id="image1"
                            hidden
                        />
                    </label>
                    <label htmlFor="image2">
                        <img
                            className="w-20"
                            src={
                                !image2
                                    ? productData.image?.[1] ||
                                      assets.upload_area
                                    : URL.createObjectURL(image2)
                            }
                            alt="upload"
                        />
                        <input
                            onChange={(e) => setImage2(e.target.files[0])}
                            type="file"
                            id="image2"
                            hidden
                        />
                    </label>
                    <label htmlFor="image3">
                        <img
                            className="w-20"
                            src={
                                !image3
                                    ? productData.image?.[2] ||
                                      assets.upload_area
                                    : URL.createObjectURL(image3)
                            }
                            alt="upload"
                        />
                        <input
                            onChange={(e) => setImage3(e.target.files[0])}
                            type="file"
                            id="image3"
                            hidden
                        />
                    </label>
                    <label htmlFor="image4">
                        <img
                            className="w-20"
                            src={
                                !image4
                                    ? productData.image?.[3] ||
                                      assets.upload_area
                                    : URL.createObjectURL(image4)
                            }
                            alt="upload"
                        />
                        <input
                            onChange={(e) => setImage4(e.target.files[0])}
                            type="file"
                            id="image4"
                            hidden
                        />
                    </label>
                </div>
            </div>
            {/* product details */}
            <div className="w-full">
                <p className="mb-2">Product Name</p>
                <input
                    className="w-full max-w-[500px] px-3 py-2"
                    type="text"
                    placeholder="Enter name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />
            </div>
            <div className="w-full">
                <p className="mb-2">Product Description</p>
                <textarea
                    className="w-full max-w-[500px] px-3 py-2"
                    type="text"
                    placeholder="Enter product description..."
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
                <div>
                    <p className="mb-2">Category</p>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        className="w-full px-3 py-2"
                    >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div>
                    <p className="mb-2">Sub category</p>
                    <select
                        onChange={(e) => setSubCategory(e.target.value)}
                        value={subCategory}
                        className="w-full px-3 py-2"
                    >
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>
                <div>
                    <p className="mb-2">Product price</p>
                    <input
                        className="w-full px-3 py-2 sm:w-[120px]"
                        type="number"
                        placeholder="Enter price"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        required
                    />
                </div>
            </div>
            <div>
                <p className="mb-2">Product Sizes</p>
                <div className="flex gap-3">
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <div
                            key={size}
                            onClick={() =>
                                setSizes((prev) =>
                                    prev.includes(size)
                                        ? prev.filter((s) => s !== size)
                                        : [...prev, size]
                                )
                            }
                        >
                            <p
                                className={`${
                                    sizes.includes(size)
                                        ? "bg-pink-200"
                                        : "bg-slate-200"
                                } px-3 py-1 cursor-pointer`}
                            >
                                {size}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-2 mt-2">
                <input
                    onChange={() => setBestSeller((prev) => !prev)}
                    checked={bestSeller}
                    type="checkbox"
                    id="bestSeller"
                />
                <label className="cursor-pointer" htmlFor="bestSeller">
                    Add to Best seller
                </label>
            </div>
            <button
                className="w-28 py-3 mt-4 bg-black text-white hover:cursor-pointer hover:bg-green-600"
                type="submit"
            >
                EDIT
            </button>
        </form>
    );
};

export default Edit;
