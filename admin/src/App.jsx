import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Edit from "./pages/Edit";
import Login from "./components/Login";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <ToastContainer />
            {token === "" ? (
                <Login setToken={setToken} />
            ) : (
                <>
                    <Navbar setToken={setToken} />
                    <div className="flex w-full">
                        <Sidebar />
                        <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                            <Routes>
                                <Route
                                    path="/add"
                                    element={<Add token={token} />}
                                />
                                <Route
                                    path="/list"
                                    element={<List token={token} />}
                                />
                                <Route
                                    path="/edit"
                                    element={<Edit token={token} />}
                                />
                                <Route
                                    path="/orders"
                                    element={<Orders token={token} />}
                                />
                                <Route
                                    path="*"
                                    element={<Navigate to="/orders" />}
                                />
                            </Routes>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
