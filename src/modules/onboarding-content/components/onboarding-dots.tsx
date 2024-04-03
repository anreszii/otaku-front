import { Defs, LinearGradient, Rect, Stop, Svg } from "react-native-svg";

export const OnboardingDots = (activeIndex: number, total: number) => {
  const [dotWidth, dotHeight] = [68, 6];

  return [...Array(total)].map((_, index) => (
    <Svg
      width={dotWidth}
      height={dotHeight}
      viewBox={`0 0 ${dotWidth} ${dotHeight}`}
      fill="none"
      key={index}
      style={{
        marginRight: total - 1 === index ? 0 : 10,
      }}
    >
      <Defs>
        <LinearGradient
          id="linear_button"
          x1={13}
          y1={0}
          x2={dotWidth}
          y2={dotHeight}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#4169E1" />
          <Stop offset={1} stopColor="#4169E1" />
        </LinearGradient>
      </Defs>
      {activeIndex === index ? (
        <Rect
          width={dotWidth}
          height={dotHeight}
          rx={3}
          fill="url(#linear_button)"
        />
      ) : (
        <Rect width={dotWidth} height={dotHeight} rx={3} fill="#3C4146" />
      )}
    </Svg>
  ));
};
