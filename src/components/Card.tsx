import type { ProcessedProperty } from "@prisma/client";
import ImageWithFallback from "./ImageWithFallback";
import Icon from "./Icon";

type CardProps = Omit<ProcessedProperty, "createdAt" | "id" | "propertyId"> & {
  priority?: boolean;
};

const Card = ({
  name,
  price,
  featuredImage,
  address,
  bedroom,
  bathrooms,
  source,
  link,
  priority = false,
}: CardProps) => {
  return (
    <a target="_blank" rel="noreferrer" className="group" href={link}>
      <div className="relative mx-auto w-full max-w-sm pt-6">
        <div className="relative inline-block w-full transform transition-transform duration-300 ease-in-out">
          <div className="rounded-lg">
            <div className="relative flex justify-center overflow-hidden rounded-lg">
              {featuredImage && featuredImage !== "N/A" && (
                <ImageWithFallback
                  src={featuredImage}
                  className="aspect-video w-full transform object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                  width="384"
                  height="216"
                  priority={priority}
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

              {name !== address && address !== "N/A" && (
                <div className="text-sm">
                  <p className="text-sm text-gray-600">{address}</p>
                </div>
              )}

              <div className="mt-2 border-t border-gray-200 pt-1.5">
                <span className="rounded-md bg-gray-500 px-2 text-xs uppercase text-white">
                  {source}
                </span>
              </div>

              {(!!bedroom || !!bathrooms) && (
                <div className="mt-2 flex border-t border-gray-200 pt-3">
                  {!!bedroom && (
                    <span className="flex items-center text-sm text-gray-800">
                      <Icon
                        name="bed"
                        className="mr-2 h-5 w-5 fill-gray-600"
                        strokeWidth="0"
                      />
                      {bedroom}
                    </span>
                  )}
                  {!!bathrooms && (
                    <span
                      className={`flex items-center text-sm text-gray-800 ${
                        !!bedroom ? "ml-4" : ""
                      }`}
                    >
                      <Icon
                        name="shower"
                        className="mr-2 h-5 w-5 fill-gray-600"
                        strokeWidth="0"
                      />
                      {bathrooms}
                    </span>
                  )}
                </div>
              )}
              <div className="mt-2 border-t border-gray-200 pt-3 text-sm">
                <p className="flex items-center text-lg text-gray-800">
                  {price ? (
                    `€${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                  ) : (
                    <span className="text-sm">Price on request</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Card;
