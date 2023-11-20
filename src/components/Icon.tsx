// Icons from https://heroicons.com/

import { forwardRef } from "react";
import { cn } from "../utils/helpers";

const icons = {
  "adjustments-horizontal": "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75",
  "magnifying-glass":
    "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  "x-mark": "M6 18L18 6M6 6l12 12",
  "bars-3": "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5",
  "chevron-left": "M15.75 19.5L8.25 12l7.5-7.5",
  "chevron-right": "M8.25 4.5l7.5 7.5-7.5 7.5",
  share:
    "M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z",
  funnel:
    "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z",
    shower: "M21 14v1c0 1.91-1.07 3.57-2.65 4.41L19 22h-2l-.5-2h-9L7 22H5l.65-2.59A4.987 4.987 0 013 15v-1H2v-2h18V5a1 1 0 00-1-1c-.5 0-.88.34-1 .79.63.54 1 1.34 1 2.21h-6a3 3 0 013-3h.17c.41-1.16 1.52-2 2.83-2a3 3 0 013 3v9h-1m-2 0H5v1a3 3 0 003 3h8a3 3 0 003-3v-1z",
    bed: "M19 7h-8v7H3V5H1v15h2v-3h18v3h2v-9a4 4 0 00-4-4M7 13a3 3 0 003-3 3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3z"
} as const;

type IconProps = React.SVGAttributes<SVGElement> & {
  name: keyof typeof icons;
  className?: string;
  strokeWidth?: string;
};

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, className, strokeWidth, ...props }: IconProps, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth || "1.5"}
      stroke="currentColor"
      className={cn("h-6 w-6", className)}
      {...props}
      ref={ref}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={icons[name]} />
    </svg>
  )
);

Icon.displayName = "Icon";

export default Icon;
