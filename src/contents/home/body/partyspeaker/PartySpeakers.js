import React from 'react';

const PartySpeakers = () => {
  return (
    <div>
      {/*----------------------------Party Speakers-------------------------*/}
      <div className="bg-gradient-to-r from-[#ffffff] to-[#dfeeeb]">
        {/* Header Section */}
        <div className="md:grid md:grid-cols-2 flex flex-col w-full items-center md:items-start">
          <div className="md:col-span-1 flex justify-center md:justify-start mx-4 md:mx-8">
            <img
              src="https://www.boat-lifestyle.com/cdn/shop/files/img_6_mob_1560x.png?v=1686140781"
              alt="Party Speakers"
              className="max-w-[90%] md:max-w-full"
            />
          </div>
          <div className="md:col-span-1 mx-4 md:mx-8 text-center md:text-left">
            <p className="text-4xl md:text-8xl font-light leading-tight">
              Party Speakers
            </p>
            <p className="text-lg md:text-2xl font-light mt-2">
              Starting from &#8377; 999
            </p>
          </div>
        </div>

        {/* Best Sellers Section */}
        <div className="mx-4 md:mx-8 my-8">
          <p className="font-metropolis text-2xl md:text-4xl bold py-3">
            Best Sellers
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {/* Product Cards */}
            {[
              {
                img: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Partypal_200.jpg?v=1699524655",
                name: "Airpodes 131",
                price: "₹ 899",
              },
              {
                img: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/PP_185.jpg?v=1695976203",
                name: "Airpodes 131",
                price: "₹ 899",
              },
              {
                img: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Partypal_200.jpg?v=1699524655",
                name: "Airpodes 131",
                price: "₹ 899",
              },
              {
                img: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/PP_195.jpg?v=1695983904",
                name: "Airpodes 131",
                price: "₹ 899",
              },
            ].map((product, index) => (
              <div
                key={index}
                className="border border-current rounded-2xl overflow-hidden shadow-md"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="cursor-pointer w-full"
                />
                <p className="text-base font-bold mx-3 mt-2">{product.name}</p>
                <p className="text-sm font-bold mx-3">{product.price}</p>
                <div className="flex rounded-xl bg-black text-white h-[40px] m-3 items-center justify-center cursor-pointer hover:bg-gray-800 transition">
                  <p className="font-light">Add to Cart</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartySpeakers;
