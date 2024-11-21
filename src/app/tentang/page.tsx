import React from "react";
import Navbar from "@/app/landing-page/bar/navbar";

const TentangPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="p-8">
        <h1 className="text-black">Welcome to the Home Page</h1>
        {/* Content for the home page */}
      </main>
    </>
  );
};

export default TentangPage;