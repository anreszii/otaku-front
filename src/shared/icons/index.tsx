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