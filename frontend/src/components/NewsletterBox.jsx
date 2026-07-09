import React, { useState } from "react";
import { toast } from "react-toastify";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <section className="my-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Subscribe to Our Newsletter
        </h2>

        <p className="mt-4 text-gray-600">
          Stay updated with our latest collections, exclusive offers, and new
          arrivals delivered straight to your inbox.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:flex-1 border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterBox;