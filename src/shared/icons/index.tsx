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
    <Svg width={25} height={23} viewBox="0 0 23 22" fill="none">
      <Path
        d="M8.539 19.771v-3.066c0-.78.662-1.414 1.483-1.42h3.006c.825 0 1.493.636 1.493 1.42v3.076c0 .662.556 1.204 1.253 1.219h2.004c1.998 0 3.618-1.54 3.618-3.438V8.838a2.408 2.408 0 00-1.002-1.905l-6.855-5.248a3.422 3.422 0 00-4.108 0L2.606 6.943a2.39 2.39 0 00-1.002 1.904v8.715C1.604 19.46 3.224 21 5.222 21h2.004c.714 0 1.293-.55 1.293-1.229"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const CalendarIcon = ({ focus }: { focus?: boolean }) => {
  return (
    <Svg width={25} height={23} viewBox="0 0 21 22" fill="none">
      <Path
        d="M1.593 8.404h17.824M14.942 12.309h.01M10.505 12.309h.009M6.058 12.309h.01M14.942 16.195h.01M10.505 16.195h.009M6.058 16.195h.01M14.544 1v3.29M6.465 1v3.29"
        stroke={focus ? "#4169E1" : "#fff"}
        strokeOpacity={focus ? 1 : 0.4}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M14.738 2.58H6.271C3.334 2.58 1.5 4.216 1.5 7.223v9.05C1.5 19.327 3.334 21 6.271 21h8.458c2.946 0 4.771-1.646 4.771-4.653V7.223c.01-3.007-1.816-4.643-4.762-4.643z"
        stroke={focus ? "#4169E1" : "#fff"}
        strokeOpacity={focus ? 1 : 0.4}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const FavoriteIcon = ({ focus }: { focus?: boolean }) => {
  return (
    <Svg width={25} height={23} viewBox="0 0 22 21" fill="none">
      <Path
        d="M11.1 1l3.09 6.26 6.91 1.01-5 4.87 1.18 6.88-6.18-3.25-6.18 3.25 1.18-6.88-5-4.87 6.91-1.01L11.1 1z"
        stroke={focus ? "#4169E1" : "#fff"}
        strokeOpacity={focus ? 1 : 0.4}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const ProfileIcon = ({ focus }: { focus?: boolean }) => {
  return (
    <Svg width={25} height={23} viewBox="0 0 25 24" fill="none">
      <G
        opacity={focus ? 1 : 0.4}
        stroke={focus ? "#4169E1" : "#fff"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M12.279 12.056a4.778 4.778 0 100-9.556 4.778 4.778 0 000 9.556z" />
        <Path
          clipRule="evenodd"
          d="M4.7 18.702a2.215 2.215 0 01.22-.97c.457-.916 1.748-1.401 2.819-1.62a16.778 16.778 0 012.343-.33 25.039 25.039 0 014.385 0c.787.055 1.57.165 2.343.33 1.07.219 2.361.658 2.82 1.62a2.27 2.27 0 010 1.949c-.459.961-1.75 1.4-2.82 1.611-.772.172-1.555.285-2.343.339-1.188.1-2.38.119-3.57.055-.275 0-.54 0-.815-.055a15.417 15.417 0 01-2.334-.339c-1.08-.21-2.361-.65-2.828-1.611a2.28 2.28 0 01-.22-.98z"
        />
      </G>
    </Svg>
  );
};

export const RoomsIcon = ({ focus }: { focus?: boolean }) => {
  return (
    <Svg width={25} height={23} viewBox="0 0 26 21" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.6 13.025h.13l.29.001c2.217.016 7.283.26 7.283 4 0 3.716-4.89 3.958-7.248 3.974h-.874c-2.217-.016-7.284-.26-7.284-3.995 0-3.72 5.067-3.963 7.284-3.979h.42zm0 1.876c-2.728 0-5.98.366-5.98 2.104 0 1.7 3.058 2.096 5.731 2.119l.25.001c2.728 0 5.98-.364 5.98-2.099 0-1.756-3.252-2.125-5.98-2.125zm9.133-2.383c2.782.454 3.367 1.877 3.367 2.991 0 .68-.246 1.923-1.888 2.604a.807.807 0 01-.306.062c-.347 0-.674-.23-.805-.604-.17-.485.054-1.027.498-1.211.779-.323.779-.68.779-.85 0-.549-.64-.931-1.9-1.136-.47-.078-.795-.554-.725-1.068.07-.513.506-.855.98-.788zm-17.286.788c.07.514-.255.99-.724 1.068-1.261.205-1.9.587-1.9 1.135 0 .172 0 .527.779.85.444.185.668.727.498 1.212-.13.374-.458.604-.805.604a.808.808 0 01-.306-.062C.346 17.43.1 16.19.1 15.51c0-1.113.584-2.537 3.368-2.991.474-.065.908.275.98.788zM12.601 0c2.893 0 5.246 2.564 5.246 5.715 0 3.15-2.353 5.714-5.247 5.714h-.03c-1.401-.005-2.714-.603-3.697-1.683-.985-1.08-1.523-2.513-1.518-4.035C7.355 2.564 9.708 0 12.6 0zm0 1.876c-1.943 0-3.523 1.722-3.523 3.839-.004 1.025.357 1.985 1.017 2.709.66.724 1.54 1.125 2.477 1.13l.029.937v-.938c1.942 0 3.524-1.72 3.524-3.838 0-2.117-1.582-3.839-3.524-3.839zm7.106-.65c2.019.36 3.485 2.242 3.485 4.472-.005 2.245-1.544 4.17-3.582 4.482a.785.785 0 01-.12.01c-.422 0-.791-.34-.852-.809-.065-.514.262-.988.734-1.06 1.194-.182 2.095-1.31 2.098-2.626 0-1.304-.86-2.407-2.043-2.619-.469-.084-.787-.566-.71-1.078.078-.512.518-.854.99-.773zm-13.223.772c.077.512-.241.994-.71 1.078-1.184.212-2.043 1.315-2.043 2.622.003 1.313.904 2.442 2.097 2.624.472.071.8.545.734 1.06-.061.468-.43.807-.852.807a.784.784 0 01-.12-.009C3.552 9.87 2.014 7.943 2.01 5.7c0-2.232 1.465-4.113 3.484-4.475.483-.082.912.264.99.773z"
        fill={focus ? "#4169E1" : "#fff"}
        fillOpacity={focus ? 1 : 0.4}
      />
    </Svg>
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

export const LoaderIcon: React.FC<SvgProps> = ({ color, ...props }) => {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 4C11.163 4 4 11.163 4 20a2 2 0 11-4 0C0 8.954 8.954 0 20 0s20 8.954 20 20a2 2 0 11-4 0c0-8.837-7.163-16-16-16z"
        fill={color || "#4169E1"}
      />
    </Svg>
  );
};

export const SavedIcon = ({ focus }: { focus?: boolean }) => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 17 22"
      fill={focus ? "#fff" : "none"}
    >
      <Path
        clipRule="evenodd"
        d="M15.546 20.267l-7.273-5.195L1 20.267V3.643c0-1.147.93-2.078 2.078-2.078h10.39c1.148 0 2.078.93 2.078 2.078v16.624z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const ShareIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg width={18} height={17} viewBox="0 0 18 17" fill="none" {...props}>
      <Path
        clipRule="evenodd"
        d="M8.578 8.865s-9.98-2.064-6.513-4.067C4.992 3.11 15.08.204 16.488.955c.75 1.409-2.154 11.496-3.844 14.422-2.002 3.469-4.066-6.512-4.066-6.512z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.578 8.865l7.91-7.91"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const StarIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg width={18} height={16} viewBox="0 0 18 16" fill="none" {...props}>
      <Path
        opacity={0.4}
        d="M9.814.595l1.855 3.728c.137.27.398.458.698.5l4.168.607a.934.934 0 01.614.358c.147.194.21.439.175.68a.927.927 0 01-.268.527l-3.02 2.927a.88.88 0 00-.267.803l.743 4.115a.93.93 0 01-.743 1.06.974.974 0 01-.595-.095l-3.718-1.937a.975.975 0 00-.878 0l-3.717 1.937a.952.952 0 01-1.277-.373.943.943 0 01-.097-.582l.744-4.117a.884.884 0 00-.268-.804L.943 7.004A.904.904 0 01.92 5.726l.024-.024a.898.898 0 01.536-.262l4.167-.608a.928.928 0 00.699-.5L8.133.595c.16-.32.49-.52.848-.511h.112a.93.93 0 01.72.51"
        fill="url(#paint0_linear_65_5091)"
      />
      <Path
        d="M8.993 13.764a1.023 1.023 0 00-.46.126l-3.699 1.933a.965.965 0 01-1.248-.385.922.922 0 01-.097-.578l.74-4.107a.92.92 0 00-.268-.813L.94 7.015A.91.91 0 01.926 5.73l.014-.014a.945.945 0 01.527-.264l4.17-.614a.902.902 0 00.698-.5L8.148.553A.921.921 0 019 .085c-.007.247-.007 13.51-.007 13.68"
        fill="url(#paint1_linear_65_5091)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_65_5091"
          x1={17.3334}
          y1={15.9167}
          x2={-2.33366}
          y2={9.9143}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#4169E1" />
          <Stop offset={1} stopColor="#4169E1" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_65_5091"
          x1={9.00008}
          y1={15.9167}
          x2={-1.5048}
          y2={14.3137}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#4169E1" />
          <Stop offset={1} stopColor="#4169E1" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export const ArrowRightIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg width={8} height={12} viewBox="0 0 8 12" fill="none" {...props}>
      <Path
        d="M1.667 1.333L6.333 6l-4.666 4.667"
        stroke="url(#paint0_linear_65_6578)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_65_6578"
          x1={6.33341}
          y1={1.33329}
          x2={1.1088}
          y2={10.3431}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#4169E1" />
          <Stop offset={1} stopColor="#4169E1" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export const PlayIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg width={28} height={25} viewBox="0 0 20 21" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 10.255C0 4.71 4.488.205 10 .205s10 4.506 10 10.05c0 5.532-4.488 10.038-10 10.038S0 15.787 0 10.255zm13.668 1.016c.106-.106.241-.271.27-.31a1.17 1.17 0 00.232-.706c0-.282-.087-.544-.251-.757a3.681 3.681 0 01-.074-.08c-.064-.07-.157-.171-.245-.26-.791-.852-2.857-2.248-3.938-2.674-.164-.067-.579-.213-.801-.223-.212 0-.415.049-.608.145a1.255 1.255 0 00-.54.601c-.068.175-.174.698-.174.708-.107.571-.164 1.502-.164 2.529 0 .98.057 1.87.144 2.452.003.002.011.044.024.108.04.197.12.606.208.774.212.407.627.659 1.071.659h.039c.29-.01.898-.262.898-.272 1.023-.426 3.04-1.754 3.851-2.636l.058-.058z"
        fill="#fff"
      />
    </Svg>
  );
};

export const Qualifier: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg width={16} height={6} viewBox="0 0 16 6" fill="none" {...props}>
      <Rect width={16} height={6} rx={3} fill="url(#paint0_linear_1_3512)" />
      <Defs>
        <LinearGradient
          id="paint0_linear_1_3512"
          x1={16}
          y1={6}
          x2={3.08283}
          y2={-3.98724}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#4169E1" />
          <Stop offset={1} stopColor="#4169E1" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export const LogoutIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg width={18} height={25} viewBox="0 0 26 24" fill="none" {...props}>
      <Path
        d="M24.423 12.14H10.375M21.008 8.739l3.416 3.402-3.416 3.402M18.086 6.901c-.385-4.176-1.948-5.693-8.166-5.693-8.285 0-8.285 2.695-8.285 10.792 0 8.096 0 10.791 8.285 10.791 6.218 0 7.781-1.516 8.166-5.693"
        stroke="#4169E1"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const PlusIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M4 12h16m-8-8v16"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const CrossIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg width={26} height={26} viewBox="0 -0.5 25 25" fill="none" {...props}>
      <Path
        d="M6.97 16.47a.75.75 0 101.06 1.06l-1.06-1.06zm6.06-3.94a.75.75 0 10-1.06-1.06l1.06 1.06zm-1.06-1.06a.75.75 0 101.06 1.06l-1.06-1.06zm6.06-3.94a.75.75 0 00-1.06-1.06l1.06 1.06zm-5 3.94a.75.75 0 10-1.06 1.06l1.06-1.06zm3.94 6.06a.75.75 0 101.06-1.06l-1.06 1.06zm-5-5a.75.75 0 101.06-1.06l-1.06 1.06zM8.03 6.47a.75.75 0 00-1.06 1.06l1.06-1.06zm0 11.06l5-5-1.06-1.06-5 5 1.06 1.06zm5-5l5-5-1.06-1.06-5 5 1.06 1.06zm-1.06 0l5 5 1.06-1.06-5-5-1.06 1.06zm1.06-1.06l-5-5-1.06 1.06 5 5 1.06-1.06z"
        fill="#fff"
      />
    </Svg>
  );
};
