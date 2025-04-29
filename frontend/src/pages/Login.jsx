import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextFile";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
    const [currentState, setCurrentState] = useState("Login");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (currentState === "Sign Up") {
                // call the register API
                const response = await axios.post(
                    backendUrl + "/api/user/register",
                    { name, email, password }
                );

                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                } else {
                    toast.error(response.data.message);
                }
            } else {
                // call the login API
                const response = await axios.post(
                    backendUrl + "/api/user/login",
                    { email, password }
                );

                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token]);

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-500"
        >
            <div className="inline-flex items-center gap-2 mt-10">
                <p className="prata-regular text-3xl">{currentState}</p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
            </div>
            {currentState === "Login" ? (
                ""
            ) : (
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />
            )}
            <input
                type="email"
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />
            <input
                type="password"
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />
            <div className="w-full flex justify-between text-sm mt-[-8px]">
                <p className="cursor-pointer text-indigo-500">
                    Forgot your password?
                </p>
                {currentState === "Login" ? (
                    <p
                        onClick={() => setCurrentState("Sign Up")}
                        className="cursor-pointer text-indigo-500"
                    >
                        Create account
                    </p>
                ) : (
                    <p
                        onClick={() => setCurrentState("Login")}
                        className="cursor-pointer text-indigo-500"
                    >
                        Login
                    </p>
                )}
            </div>
            <button className="border border-gray-200 px-8 py-2 text-sm text-white font-medium rounded-sm bg-green-700 cursor-pointer">
                {currentState === "Login" ? "Sign In" : "Sign Up"}
            </button>
        </form>
    );
};

export default Login;
