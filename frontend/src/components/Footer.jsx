import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {

    const year = new Date().getFullYear()

    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <img
                        src={assets.logo}
                        alt="footer-logo"
                        className="mb-5 w-32"
                    />
                    <p className="w-full md:w-2/3 text-gray-600">
                        Forever E-commerce website developed by Daniel Ndubuisi
                        is suitable for fashionistas looking for a cool platform
                        to get trendy items at best prices.{" "}
                    </p>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>+234-903-067-3128</li>
                        <li>ndubeansdaniel97@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr className='text-gray-300' />
                <p className='py-5 text-sm text-center'>Copyright {year} @forever.com | All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer
