import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../../constant";
import { toast } from "react-toastify";

const List = ({token}) => {
    const [productList, setProductList] = useState([]);

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list", {headers: {token}});
            if (response.data.success) {
                setProductList(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await axios.post(backendUrl + "/api/product/delete", {id}, {headers: {token}});
            if (response.data.success) {
                toast.success(response.data.message);
                fetchAllProducts();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchAllProducts();
    }, []);

    return (
        <>
            <p className="mb-2">All Products</p>
            <div className="flex flex-col gap-2">
                {/* table title */}
                <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-200 bg-gray-100 text-sm">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className="text-center">Action</b>
                </div>
                {/* product list */}
                {productList.map((product, index) => (
                    <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-100 text-sm" key={index}>
                        <img loading="lazy" className="w-12" src={product.image[0]} alt="product-img" />
                        <p>{product.name}</p>
                        <p>{product.category}</p>
                        <p className="text-green-600">{currency}{product.price}</p>
                        <p onClick={() => deleteProduct(product._id)} className="text-right md:text-center cursor-pointer text-lg text-red-500">X</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default List;
