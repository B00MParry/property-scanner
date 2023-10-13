import Image, { type ImageProps } from "next/image";
import React, { useState } from "react";
import { FALLBACK_IMG_URL } from "../utils/constants";

type ImageWithFallbackType = ImageProps & {
  fallbacks?: (string | undefined)[];
};

const ImageWithFallback = ({
  src,
  alt,
  fallbacks,
  ...props
}: ImageWithFallbackType) => {
  const [fallBackCount, setFallbackCount] = useState(0);
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      alt={alt}
      src={imgSrc}
      onError={() => {
        if (fallbacks && fallbacks.length > fallBackCount) {
          if (typeof fallbacks[fallBackCount] === "string") {
            setImgSrc(fallbacks[fallBackCount] as string);
          }
          setFallbackCount(fallBackCount + 1);
        } else {
          setImgSrc(FALLBACK_IMG_URL);
        }
      }}
    />
  );
};

export default ImageWithFallback;
