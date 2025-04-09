import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/Newsletter";

const About = () => {
    return (
        <div>
            <div className="text-2xl text-center pt-8 border-t border-gray-300">
                <Title text1={"ABOUT"} text2={"US"} />
            </div>
            <div className="my-10 flex flex-col md:flex-row gap-16">
                <img
                    className="w-full md:max-w-[450px]"
                    src={assets.about_img}
                    alt="about-us-image"
                />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                    {/* random about us texts */}
                    <p>
                        Forever is an e-commerce platform with a mission to
                        provide high-quality products at affordable prices. We
                        believe that everyone deserves access to the best
                        products without breaking the bank.
                    </p>
                    <p>
                        Our team is dedicated to curating a selection of
                        products that meet our high standards for quality and
                        value. We work closely with our suppliers to ensure that
                        we are offering the best products at the best prices.
                    </p>
                    <b className="text-gray-800">Our Mission</b>
                    <p>
                        Our mission at Forever is to make shopping easy and
                        enjoyable for everyone. We strive to provide a seamless
                        shopping experience, from browsing our selection to
                        receiving your order at your doorstep.
                    </p>
                </div>
            </div>
            <div className="text-xl py-4">
                <Title text1={"WHU"} text2={"CHOOSE US"} />
            </div>
            <div className="flex flex-col md:flex-row text-sm mb-20">
                <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Quality Assurance</b>
                    <p className="text-gray-600">
                        We take pride in offering only the highest quality
                        products. Our team carefully selects each item to ensure
                        that it meets our standards for quality and value.
                    </p>
                </div>
                <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Convenience</b>
                    <p className="text-gray-600">
                        Shopping with Forever is easy and convenient. Our user-
                        friendly website makes it easy to find what you're
                        looking for, and our fast shipping ensures that you get
                        your order quickly.
                    </p>
                </div>
                <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Exceptional Customer Service</b>
                    <p className="text-gray-600">
                        Our customer service team is here to help you with any
                        questions or concerns you may have. We are committed to
                        providing exceptional service and support to our
                        customers.
                    </p>
                </div>
            </div>
            <NewsLetter />
        </div>
    );
};

export default About;
