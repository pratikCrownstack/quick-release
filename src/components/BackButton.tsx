'use client'

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();

  return (
    <button className="flex mr-2" onClick={() => router.back()}>
      {" "}
      <ChevronLeft />{" "}
    </button>
  );
};

export default BackButton;
