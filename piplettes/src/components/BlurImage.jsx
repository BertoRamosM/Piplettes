"use client";

import Image from "next/image";
import { useState } from "react";

const BlurImage = ({ image, width, height, alt, zoomIn }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Image
      src={image}
      width={width}
      height={height}
      alt={alt}
      zoomIn
      className={`w-full h-full object-contain ${
        zoomIn && "hover:scale-110"
      } transition-all duration-300 ${
        isLoading
          ? "scale-110 blur-2xl grayscale shadow-none"
          : "scale-100 blur-0 grayscale-0 shadow-lg"
      }`}
      onLoadingComplete={() => setIsLoading(false)}
    />
  );
};

export default BlurImage;
