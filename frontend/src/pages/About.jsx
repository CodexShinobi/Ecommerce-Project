import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      {/* Page Title */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* About Section */}
      <div className="my-12 flex flex-col md:flex-row gap-12 items-center">
        <img
          className="w-full md:max-w-[450px] rounded-lg"
          src={assets.about_img}
          alt="About Us"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to our online fashion store! We are committed to delivering
            high-quality clothing and accessories that combine comfort, style,
            and affordability.
          </p>

          <p>
            Our goal is to provide a seamless shopping experience with carefully
            curated collections for men, women, and kids. We continuously update
            our catalog to keep up with the latest fashion trends.
          </p>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Our Mission
            </h3>

            <p>
              Our mission is to make online shopping simple, enjoyable, and
              accessible while providing premium-quality products backed by
              excellent customer service.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-2xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-12 py-8 sm:py-16 flex flex-col gap-4">
          <h4 className="font-semibold text-gray-800">
            Quality Assurance
          </h4>

          <p className="text-gray-600">
            Every product is carefully selected to ensure excellent quality and
            long-lasting value.
          </p>
        </div>

        <div className="border px-10 md:px-12 py-8 sm:py-16 flex flex-col gap-4">
          <h4 className="font-semibold text-gray-800">
            Convenience
          </h4>

          <p className="text-gray-600">
            Shop anytime, anywhere with a secure checkout and fast delivery
            process.
          </p>
        </div>

        <div className="border px-10 md:px-12 py-8 sm:py-16 flex flex-col gap-4">
          <h4 className="font-semibold text-gray-800">
            Customer Satisfaction
          </h4>

          <p className="text-gray-600">
            We strive to provide outstanding support and ensure every customer
            enjoys a smooth shopping experience.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;