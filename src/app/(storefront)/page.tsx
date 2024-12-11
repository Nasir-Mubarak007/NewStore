import React, { Suspense } from "react";
import { Hero } from "../components/storefront/Hero";
import CategorySelection from "../components/storefront/CategorySelection";
import FeaturedProducts from "../components/storefront/FeaturedProducts";

const Home = () => {
  return (
    <div>
      <Hero />
      <CategorySelection />

      <Suspense fallback=<h1>Loading...</h1>>
        <FeaturedProducts className="mt-8" />
      </Suspense>
    </div>
  );
};

export default Home;
