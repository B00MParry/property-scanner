import type { ProcessedProperty } from "@prisma/client";
import Image from "next/image";

type CardProps = Omit<ProcessedProperty, "createdAt" | "id" | "propertyId">;

export const Card = ({
  name,
  price,
  featuredImage,
  address,
  bedroom,
  bathrooms,
  source,
  link,
}: CardProps) => {
  return (
    <a target="_blank" rel="noreferrer" href={link}>
      <div className="relative mx-auto w-full max-w-sm pt-6">
        <div className="relative inline-block w-full transform transition-transform duration-300 ease-in-out">
          <div className="rounded-lg">
            <div className="relative flex justify-center overflow-hidden rounded-lg">
              {featuredImage && featuredImage !== "N/A" && (
                <Image
                  src={featuredImage}
                  className="aspect-video w-full object-cover"
                  width="320"
                  height="180"
                  alt={name}
                />
              )}
            </div>
            <div className="mt-4">
              <h2
                className="text-base font-medium text-gray-800 md:text-lg"
                title={name}
              >
                {name}
              </h2>

              <div className="mt-2 border-t border-gray-200 pt-3 text-sm">
                <p className="text-sm text-gray-800">
                  {price
                    ? `€${price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    : "Price not found"}
                </p>
              </div>

              {name !== address && (
                <div className="mt-2 border-t border-gray-200 pt-3 text-sm">
                  <p className="text-sm text-gray-800">{address}</p>
                </div>
              )}

              <div className="mt-2 border-t border-gray-200 pt-3">
                <p className="text-sm text-gray-800">
                  Bedrooms: {bedroom ? bedroom : "N/A"}
                </p>
              </div>

              <div className="mt-2 border-t border-gray-200 pt-3">
                <p className="text-sm text-gray-800">
                  Bathrooms: {bathrooms ? bathrooms : "N/A"}
                </p>
              </div>

              <div className="mt-2 border-t border-gray-200 pt-3">
                <p className="text-sm text-gray-800">Source: {source}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};
