import { type ReactNode } from "react";
import { Navbar } from "../components/storefront/Navbar";
import { Footer } from "../components/storefront/Footer";

const StoreLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="max-w7xl mx-auto px4 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
};

export default StoreLayout;
