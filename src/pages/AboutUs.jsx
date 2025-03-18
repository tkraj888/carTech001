// import React from 'react';
import logoleft from "/carslogo/logoleft.png";
import logotop from "/carslogo/logotop.png";
import logoright from "/carslogo/logoright.png";
import { useEffect } from "react";


const AboutUs = () => {
    
useEffect(()=>{
    window.scrollTo(0,0);
},[]);
  return (
    <div className="flex flex-col bg-light-blue-50 h-auto md:h-auto">
            <div className="flex justify-center items-center">
                <img src={logotop} alt="img1" className="h-auto" />
            </div>
            <div className="flex">
                <div>
                    <img src={logoleft} alt="img1" className="ml-1" />
                </div>
                <div className="flex items-center flex-col">
                    {/* <img src={PreferableIcon} alt="BM" className="h-20" /> */}
                    <p className="mt-8 text-black text-4xl md:text-6xl lg:text-6xl font-serif text-center">About CarTechIndia</p>

                    <p className="mt-12 text-black text-3xl font-serif text-center">World-class Cars | Our Mission</p>
                    <p className="mt-12 text-black text-xl font-serif text-center">At CarTechIndia, our mission is to provide a seamless and trustworthy <br/> platform for buying and selling second-hand cars. <br/> We strive to make the car buying experience convenient, transparent, and enjoyable for every customer.</p>

                    <p className="mt-16 text-black text-4xl font-serif text-center">Your world-class SecondHand Cars here</p>
                    <p className="mt-12 text-black text-xl font-serif text-center">At SecondHandCars, we are passionate about providing high-quality, reliable second-hand cars to our customers. With years of experience in the automotive industry, we understand the importance of trust, transparency, and customer satisfaction.</p>

                    <p className="mt-16 text-black text-4xl font-serif text-center">Who We Are</p>
                    <p className="mt-12 text-black text-xl font-serif text-center">CarTechIndia is a team of passionate car enthusiasts dedicated to revolutionizing the way people buy and sell used cars. With years of experience in the automotive industry, our team brings expertise, integrity, and innovation to every aspect of our business.</p>

                    <p className="mt-16 text-black text-4xl font-serif text-center">What We Offer</p>
                    <p className="mt-12 text-black text-xl font-serif text-center"><span className="font-bold text-xl">Wide Selection:</span> We offer a diverse range of second-hand cars, including sedans, SUVs, trucks, and more, to suit every budget and preference. <br/>
                    <span className="font-bold text-xl">Quality Assurance:</span> Every car listed on our platform undergoes a thorough inspection process to ensure its quality and reliability. <br/>
<span className="font-bold text-xl">Transparent Transactions:</span> We believe in transparency and honesty. Our listings provide detailed information about each car, including its history, condition, and pricing. <br/>
<span className="font-bold text-xl">Exceptional Customer Service:</span> Our dedicated team of customer service representatives is here to assist you at every step of the car buying process. Whether you have questions about a listing or need guidance, we are here to help.</p>
                    
<p className="mt-16 text-black text-4xl font-serif text-center">Why Choose Us</p>
                    <p className="mt-12 text-black text-xl font-serif text-center"><span className="font-bold text-xl">Trustworthiness:</span> We prioritize integrity and trust in all our interactions. You can rely on us for fair pricing, accurate listings, and honest advice. <br/>
<span className="font-bold text-xl">Convenience:</span> Our user-friendly platform makes it easy to browse, compare, and purchase cars from the comfort of your home. <br/>
<span className="font-bold text-xl">Peace of Mind:</span> With our quality assurance process and customer support, you can buy with confidence, knowing that you are getting a dependable vehicle backed by exceptional service.</p>

                    <p className="mt-12 text-black text-xl font-serif text-center">Thank you for choosing SecondHandCars for all your automotive needs. We look forward to serving you!</p>

                    <p className="mt-12 text-black text-xl font-serif text-center font-semibold">It’s a whole big world in here. <br /> Come on in.</p>
                </div>
                <div className="ml-auto">
                    <img src={logoright} alt="img1" />
                </div>
            </div>
        </div>
  );
};

export default AboutUs;
