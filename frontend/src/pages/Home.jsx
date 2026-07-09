import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";

const Home = () => {
  return (
    <main className="space-y-16">
      {/* Hero Banner */}
      <Hero />

      {/* Latest Collection */}
      <LatestCollection />

      {/* Best Sellers */}
      <BestSeller />

      {/* Our Policy */}
      <OurPolicy />

      {/* Newsletter */}
      <NewsletterBox />
    </main>
  );
};

export default Home;