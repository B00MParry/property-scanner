// Icons from https://heroicons.com/

import { forwardRef } from "react";

const icons = {
  "x-mark": "M6 18L18 6M6 6l12 12",
  "bars-3": "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5",
  "chevron-left": "M15.75 19.5L8.25 12l7.5-7.5",
  "chevron-right": "M8.25 4.5l7.5 7.5-7.5 7.5",
  share:
    "M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z",
  funnel:
    "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z",
} as const;

type IconProps = React.SVGAttributes<SVGElement> & {
  name: keyof typeof icons;
  className?: string;
};

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, className, ...props }: IconProps, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`h-6 w-6 ${className ? className : ""}`}
      {...props}
      ref={ref}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={icons[name]} />
    </svg>
  )
);

Icon.displayName = "Icon";

export default Icon;
