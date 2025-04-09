import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t border-gray-300'>
          <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="contact-img" />
        <div className='flex flex-col justify-center gap-6 items-start'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>
            Suite 123, 4th Floor, Ikoyi Suites, <br />
            Lagos Island, Nigeria <br />
          </p>
          <p className='text-gray-500'>
            Tel: +234 903 067 3128 <br />
            Email: ndubeansdaniel97@gmail.com
          </p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black text-black px-8 py-4 text-sm hover:bg-indigo-600 hover:text-white transition-all duration-500 cursor-pointer rounded-sm'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
