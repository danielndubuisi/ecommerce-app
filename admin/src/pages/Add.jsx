import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../../constant";
import { toast } from "react-toastify";

const Add = ({ token }) => {
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestSeller, setBestSeller] = useState(false);

    const [sizes, setSizes] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            // create formData
            const formData = new FormData();

            // get all values and append to form data
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestSeller", bestSeller);
            formData.append("sizes", JSON.stringify(sizes));

            // append only images that are provided
            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            // send form data
            const response = await axios.post(
                backendUrl + "/api/product/add",
                formData,
                {
                    headers: { token: token },
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                // reset form
                setName("");
                setDescription("");
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setPrice("");
                setBestSeller(false);
                setSizes([]);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col w-full items-start gap-3"
        >
            {/* images upload */}
            <div>
                <p className="mb-2">Upload Image</p>
                <div className="flex gap-2">
                    <label htmlFor="image1">
                        <img
                            className="w-20"
                            src={
                                !image1
                                    ? assets.upload_area
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
                                    ? assets.upload_area
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
                                    ? assets.upload_area
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
                                    ? assets.upload_area
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
                    <div
                        onClick={() =>
                            setSizes((prev) =>
                                prev.includes("S")
                                    ? prev.filter((size) => size !== "S")
                                    : [...prev, "S"]
                            )
                        }
                        className=""
                    >
                        <p
                            className={`${
                                sizes.includes("S")
                                    ? "bg-pink-200"
                                    : "bg-slate-200"
                            }  px-3 py-1 cursor-pointer`}
                        >
                            S
                        </p>
                    </div>
                    <div
                        onClick={() =>
                            setSizes((prev) =>
                                prev.includes("M")
                                    ? prev.filter((size) => size !== "M")
                                    : [...prev, "M"]
                            )
                        }
                        className=""
                    >
                        <p
                            className={`${
                                sizes.includes("M")
                                    ? "bg-pink-200"
                                    : "bg-slate-200"
                            }  px-3 py-1 cursor-pointer`}
                        >
                            M
                        </p>
                    </div>
                    <div
                        onClick={() =>
                            setSizes((prev) =>
                                prev.includes("L")
                                    ? prev.filter((size) => size !== "L")
                                    : [...prev, "L"]
                            )
                        }
                        className=""
                    >
                        <p
                            className={`${
                                sizes.includes("L")
                                    ? "bg-pink-200"
                                    : "bg-slate-200"
                            }  px-3 py-1 cursor-pointer`}
                        >
                            L
                        </p>
                    </div>
                    <div
                        onClick={() =>
                            setSizes((prev) =>
                                prev.includes("XL")
                                    ? prev.filter((size) => size !== "XL")
                                    : [...prev, "XL"]
                            )
                        }
                        className=""
                    >
                        <p
                            className={`${
                                sizes.includes("XL")
                                    ? "bg-pink-200"
                                    : "bg-slate-200"
                            }  px-3 py-1 cursor-pointer`}
                        >
                            XL
                        </p>
                    </div>
                    <div
                        onClick={() =>
                            setSizes((prev) =>
                                prev.includes("XXL")
                                    ? prev.filter((size) => size !== "XXL")
                                    : [...prev, "XXL"]
                            )
                        }
                        className=""
                    >
                        <p
                            className={`${
                                sizes.includes("XXL")
                                    ? "bg-pink-200"
                                    : "bg-slate-200"
                            }  px-3 py-1 cursor-pointer`}
                        >
                            XXL
                        </p>
                    </div>
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
                className="w-28 py-3 mt-4  bg-black text-white hover:cursor-pointer hover:bg-green-600"
                type="submit"
            >
                ADD
            </button>
        </form>
    );
};

export default Add;
