import React from "react";
import {
  Defs,
  Image,
  Path,
  Pattern,
  Svg,
  Use,
  SvgProps as NativeSvgProps,
  LinearGradient,
  Stop,
  Ellipse,
  Circle,
  G,
  ClipPath,
  Rect,
  Mask,
} from "react-native-svg";

interface SvgProps extends NativeSvgProps {
  focus?: boolean;
}

export const HomeIcon = ({ focus }: { focus?: boolean }) => {
  return (
    <>
      {focus ? (
        <Svg width={32} height={32} viewBox="0 0 28 28" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.114 8.5c-.72 1.503-.468 3.261.038 6.777l.372 2.583c.65 4.517.975 6.775 2.541 8.124 1.567 1.35 3.865 1.35 8.46 1.35h2.95c4.595 0 6.893 0 8.46-1.35 1.566-1.349 1.891-3.607 2.541-8.124l.372-2.583c.506-3.516.759-5.274.038-6.777-.72-1.503-2.254-2.417-5.322-4.244l-1.846-1.1C16.932 1.496 15.539.666 14 .666c-1.54 0-2.932.83-5.718 2.49l-1.846 1.1C3.368 6.083 1.834 6.996 1.114 8.5zM9 22a1 1 0 011-1h8a1 1 0 110 2h-8a1 1 0 01-1-1z"
            fill="url(#paint0_linear_320_22)"
          />
          <Defs>
            <LinearGradient
              id="paint0_linear_320_22"
              x1={1}
              y1={14}
              x2={16.1957}
              y2={1.18676}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#7500FF" />
              <Stop offset={1} stopColor="#FF00E8" />
            </LinearGradient>
          </Defs>
        </Svg>
      ) : (
        <Svg width={32} height={32} viewBox="0 0 30 30" fill="none">
          <Path
            d="M2.152 16.277c-.506-3.516-.759-5.274-.038-6.777.72-1.503 2.254-2.417 5.322-4.244l1.846-1.1c2.786-1.66 4.179-2.489 5.718-2.489 1.539 0 2.932.83 5.718 2.49l1.846 1.099c3.068 1.827 4.601 2.741 5.322 4.244.72 1.503.468 3.261-.038 6.777l-.372 2.584c-.65 4.516-.975 6.774-2.541 8.123-1.567 1.35-3.865 1.35-8.46 1.35h-2.95c-4.595 0-6.893 0-8.46-1.35-1.567-1.349-1.891-3.607-2.541-8.123l-.372-2.584z"
            stroke="#fff"
            strokeWidth={1.5}
          />
        </Svg>
      )}
    </>
  );
};

export const BackIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg width={14} height={19} viewBox="0 0 14 19" fill="none" {...props}>
      <Path
        d="M9.5 0L0 9.5 9.5 19l3.563-3.563L7.125 9.5l5.938-5.938L9.5 0z"
        fill="#fff"
      />
    </Svg>
  );
};
