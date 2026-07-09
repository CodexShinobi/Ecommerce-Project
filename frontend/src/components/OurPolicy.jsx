import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      description:
        "Enjoy a hassle-free exchange process within the eligible return period.",
    },
    {
      icon: assets.quality_icon,
      title: "Premium Quality",
      description:
        "Every product is carefully selected to ensure excellent quality and durability.",
    },
    {
      icon: assets.support_img,
      title: "24/7 Customer Support",
      description:
        "Our support team is available anytime to assist you with your shopping experience.",
    },
  ];

  return (
    <section className="my-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="flex flex-col items-center px-6 py-8 rounded-lg hover:shadow-lg transition duration-300"
          >
            <img
              src={policy.icon}
              alt={policy.title}
              className="w-14 h-14 mb-5"
            />

            <h3 className="text-lg font-semibold text-gray-800">
              {policy.title}
            </h3>

            <p className="mt-3 text-sm text-gray-500 leading-6">
              {policy.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPolicy;