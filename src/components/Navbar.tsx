import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="container">
        <div className="flex-1">
          <Link href="/">Blogify</Link>
        </div>
        <div className="flex-none">
          <Link
            href="/create"
            className="bg-[#5D3587] w-full p-2 text-white rounded-md hover:bg-[#392467]"
          >
            Create Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
