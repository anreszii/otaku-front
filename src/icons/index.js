import {
  Circle,
  ClipPath,
  Defs,
  G,
  Image,
  LinearGradient,
  Mask,
  Path,
  Pattern,
  Rect,
  Stop,
  Svg,
  Use,
} from "react-native-svg";

export const CircleProgress = ({ style }) => {
  return (
    <Svg style={style} width="60" height="60" viewBox="0 0 60 60" fill="none">
      <G clipPath="url(#clip0_1_4309)">
        <Path
          d="M33 48C34.5913 48 36.1174 48.6321 37.2426 49.7574C38.3679 50.8826 39 52.4087 39 54C39 55.5913 38.3679 57.1174 37.2426 58.2426C36.1174 59.3679 34.5913 60 33 60C31.4087 60 29.8826 59.3679 28.7574 58.2426C27.6321 57.1174 27 55.5913 27 54C27 52.4087 27.6321 50.8826 28.7574 49.7574C29.8826 48.6321 31.4087 48 33 48ZM14.223 39C16.2121 39 18.1198 39.7902 19.5263 41.1967C20.9328 42.6032 21.723 44.5109 21.723 46.5C21.723 48.4891 20.9328 50.3968 19.5263 51.8033C18.1198 53.2098 16.2121 54 14.223 54C12.2339 54 10.3262 53.2098 8.9197 51.8033C7.51318 50.3968 6.723 48.4891 6.723 46.5C6.723 44.5109 7.51318 42.6032 8.9197 41.1967C10.3262 39.7902 12.2339 39 14.223 39ZM48.957 40.5C50.5483 40.5 52.0744 41.1321 53.1996 42.2574C54.3249 43.3826 54.957 44.9087 54.957 46.5C54.957 48.0913 54.3249 49.6174 53.1996 50.7426C52.0744 51.8679 50.5483 52.5 48.957 52.5C47.3657 52.5 45.8396 51.8679 44.7144 50.7426C43.5891 49.6174 42.957 48.0913 42.957 46.5C42.957 44.9087 43.5891 43.3826 44.7144 42.2574C45.8396 41.1321 47.3657 40.5 48.957 40.5ZM55.5 27.957C56.6935 27.957 57.8381 28.4311 58.682 29.275C59.5259 30.1189 60 31.2635 60 32.457C60 33.6505 59.5259 34.7951 58.682 35.639C57.8381 36.4829 56.6935 36.957 55.5 36.957C54.3065 36.957 53.1619 36.4829 52.318 35.639C51.4741 34.7951 51 33.6505 51 32.457C51 31.2635 51.4741 30.1189 52.318 29.275C53.1619 28.4311 54.3065 27.957 55.5 27.957ZM7.5 18C9.48912 18 11.3968 18.7902 12.8033 20.1967C14.2098 21.6032 15 23.5109 15 25.5C15 27.4891 14.2098 29.3968 12.8033 30.8033C11.3968 32.2098 9.48912 33 7.5 33C5.51088 33 3.60322 32.2098 2.1967 30.8033C0.790176 29.3968 0 27.4891 0 25.5C0 23.5109 0.790176 21.6032 2.1967 20.1967C3.60322 18.7902 5.51088 18 7.5 18ZM53.358 15.621C54.1536 15.621 54.9167 15.9371 55.4793 16.4997C56.0419 17.0623 56.358 17.8253 56.358 18.621C56.358 19.4166 56.0419 20.1797 55.4793 20.7423C54.9167 21.3049 54.1536 21.621 53.358 21.621C52.5623 21.621 51.7993 21.3049 51.2367 20.7423C50.6741 20.1797 50.358 19.4166 50.358 18.621C50.358 17.8253 50.6741 17.0623 51.2367 16.4997C51.7993 15.9371 52.5623 15.621 53.358 15.621ZM24 0C26.3869 0 28.6761 0.948211 30.364 2.63604C32.0518 4.32387 33 6.61305 33 9C33 11.3869 32.0518 13.6761 30.364 15.364C28.6761 17.0518 26.3869 18 24 18C21.6131 18 19.3239 17.0518 17.636 15.364C15.9482 13.6761 15 11.3869 15 9C15 6.61305 15.9482 4.32387 17.636 2.63604C19.3239 0.948211 21.6131 0 24 0V0ZM46.5 9C46.8978 9 47.2794 9.15804 47.5607 9.43934C47.842 9.72064 48 10.1022 48 10.5C48 10.8978 47.842 11.2794 47.5607 11.5607C47.2794 11.842 46.8978 12 46.5 12C46.1022 12 45.7206 11.842 45.4393 11.5607C45.158 11.2794 45 10.8978 45 10.5C45 10.1022 45.158 9.72064 45.4393 9.43934C45.7206 9.15804 46.1022 9 46.5 9Z"
          fill="url(#paint0_linear_1_4309)"
          fill-rule="evenodd"
          clip-rule="evenodd"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1_4309"
          x1="60"
          y1="60"
          x2="-11.3946"
          y2="39.2998"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7210FF" />
          <Stop offset="1" stopColor="#9D59FF" />
        </LinearGradient>
        <ClipPath id="clip0_1_4309">
          <Rect width="60" height="60" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const Mail = ({ style }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="15"
      viewBox="0 0 17 15"
      fill="none"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.4492 0C13.5667 0 14.6417 0.441667 15.4325 1.23417C16.2242 2.025 16.6667 3.09167 16.6667 4.20833V10.7917C16.6667 13.1167 14.775 15 12.4492 15H4.21667C1.89083 15 0 13.1167 0 10.7917V4.20833C0 1.88333 1.8825 0 4.21667 0H12.4492ZM13.775 5.45L13.8417 5.38333C14.0408 5.14167 14.0408 4.79167 13.8325 4.55C13.7167 4.42583 13.5575 4.35 13.3917 4.33333C13.2167 4.32417 13.05 4.38333 12.9242 4.5L9.16667 7.5C8.68333 7.90083 7.99083 7.90083 7.5 7.5L3.75 4.5C3.49083 4.30833 3.1325 4.33333 2.91667 4.55833C2.69167 4.78333 2.66667 5.14167 2.8575 5.39167L2.96667 5.5L6.75833 8.45833C7.225 8.825 7.79083 9.025 8.38333 9.025C8.97417 9.025 9.55 8.825 10.0158 8.45833L13.775 5.45Z"
        fill="#212121"
      />
    </Svg>
  );
};

export const Lock = ({ style }) => {
  return (
    <Svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.686 4.663v1.278c1.435.448 2.48 1.747 2.48 3.3v4.113c0 1.921-1.592 3.48-3.556 3.48H3.557C1.593 16.833 0 15.274 0 13.353V9.24C0 7.688 1.047 6.39 2.481 5.941V4.663C2.49 2.18 4.547.167 7.071.167c2.557 0 4.615 2.012 4.615 4.496zM7.088 1.616c1.719 0 3.116 1.366 3.116 3.047v1.098H3.963V4.647c.008-1.673 1.406-3.031 3.125-3.031zm.736 10.596c0 .406-.33.729-.745.729a.73.73 0 01-.737-.729v-1.838c0-.398.33-.72.737-.72.415 0 .745.322.745.72v1.838z"
        fill="#212121"
      />
    </Svg>
  );
};

export const EyeOpen = ({ ...props }) => {
  return (
    <Svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M21.25 9.15C18.94 5.52 15.56 3.43 12 3.43c-1.78 0-3.51.52-5.09 1.49-1.58.98-3 2.41-4.16 4.23-1 1.57-1 4.12 0 5.69 2.31 3.64 5.69 5.72 9.25 5.72 1.78 0 3.51-.52 5.09-1.49 1.58-.98 3-2.41 4.16-4.23 1-1.56 1-4.12 0-5.69zM12 16.04c-2.24 0-4.04-1.81-4.04-4.04S9.76 7.96 12 7.96s4.04 1.81 4.04 4.04-1.8 4.04-4.04 4.04z"
        fill="#292D32"
      />
      <Path
        d="M11.998 9.14a2.855 2.855 0 000 5.71c1.57 0 2.86-1.28 2.86-2.85s-1.29-2.86-2.86-2.86z"
        fill="#292D32"
      />
    </Svg>
  );
};

export const EyeClose = ({ ...props }) => {
  return (
    <Svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M21.271 9.178c-.29-.46-.6-.89-.92-1.29a1 1 0 00-1.49-.09l-3 3c.22.66.26 1.42.06 2.21a4.021 4.021 0 01-2.9 2.9c-.79.2-1.55.16-2.21-.06l-2.46 2.46c-.5.5-.34 1.38.33 1.64 1.07.41 2.18.62 3.32.62 1.78 0 3.51-.52 5.09-1.49 1.61-1 3.06-2.47 4.23-4.34.95-1.51.9-4.05-.05-5.56zM14.02 9.98l-4.04 4.04c-.51-.52-.84-1.24-.84-2.02 0-1.57 1.28-2.86 2.86-2.86.78 0 1.5.33 2.02.84z"
        fill="#292D32"
      />
      <Path
        d="M18.25 5.75l-3.39 3.39A3.986 3.986 0 0012 7.96c-2.24 0-4.04 1.81-4.04 4.04 0 1.12.45 2.13 1.18 2.86l-3.38 3.39h-.01c-1.11-.9-2.13-2.05-3-3.41-1-1.57-1-4.12 0-5.69C3.91 7.33 5.33 5.9 6.91 4.92c1.58-.96 3.31-1.49 5.09-1.49 2.23 0 4.39.82 6.25 2.32zM14.858 11.998c0 1.57-1.28 2.86-2.86 2.86-.06 0-.11 0-.17-.02l3.01-3.01c.02.06.02.11.02.17z"
        fill="#292D32"
      />
      <Path
        d="M21.769 2.229c-.3-.3-.79-.3-1.09 0l-18.45 18.46c-.3.3-.3.79 0 1.09a.758.758 0 001.08-.01l18.46-18.46c.31-.3.31-.78 0-1.08z"
        fill="#292D32"
      />
    </Svg>
  );
};

export const Back = ({ color, ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={17}
      viewBox="0 0 20 17"
      fill="none"
      {...props}
    >
      <Path
        d="M19.333 8.32c0 .443-.329.81-.756.867l-.119.008H.958A.875.875 0 01.84 7.453l.118-.008h17.5c.484 0 .875.392.875.875z"
        fill={color}
      />
      <Path
        d="M8.634 14.729a.875.875 0 01-1.137 1.324L7.4 15.97.341 8.94a.875.875 0 01-.086-1.142L.341 7.7 7.399.67a.875.875 0 011.32 1.143l-.085.097-6.436 6.41 6.436 6.408z"
        fill={color}
      />
    </Svg>
  );
};

export const UserDefault = ({ ...props }) => {
  return (
    <Svg
      width={140}
      height={140}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Circle cx={70} cy={70} r={70} fill="url(#pattern0)" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_65_5121" transform="scale(.00806)" />
        </Pattern>
        <Image
          id="image0_65_5121"
          width={124}
          height={124}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAYAAACrHtS+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA9rSURBVHgB7Z1rbBzVFcfPnX14s7v4kRjHoXZEeAVEoFQgAf1AFYm2gaRtIl4tNKVqkRClUgtfIKIIKCDaT1GlvviAaItoqwAKqISkFClRvzRCQk1JEG8CMSGOg/Ej633Mzszt/+x4HD/W9j5md88485PGO7s76529/3vOfZ+raAkxPJzti0TUWsNwkoYRW2EYaqXW9mqljIu01mkivQqX9c36WB6vHyRSx3B+3HH0ID5zGM8/x+dORiL6w2QyOUBLBEUBZWBgYFl3d++VlmWth7C9EO0SrelCpVQX+ctx/O+PkFT/Q2YYUiqyM5WKvYfvyVIACZTgbMFtbZGv4XSjUs4FELgfCd9DTQSe4oRSdATf/R6R8bJl5XZ3dnaOUEAQL/jYWP48iLoOrvUhct0xXDMlSAZ5ZIBx3N/7eHxyZMTc1d/f8QUJRqTghw8fTvT2nnWj49B62NTN5IocBFAfUDuQOZ9PJBL/IIGIEnxoaCidTnfc7TjO9bCaq/FSjIJJHvd/AG5/j20Xftfe3v45CUGE4HCH0YmJ/HeRSOy2z8YRpaVBBqJ/gDL/j6+/3vbU+vXKohbTUsFHRnRnJJK92TCMByF2Hy1tjqCS9yui4kupVOozahEtE3xsLHdbNGrcA/u+nE4r1H785sdSqcQuagFNFzybzX4JX/uE1moLBacy5jejKMYOFAp664oVyU+piTRV8FzOvB2dF9uRw8+gpVNO14qD8n0cbv7n6XT8z9QkmiI4rHo1UeQx5Opb8TRCIdNh4feYpnPX8uXJI9RgGi54Nlu4AT8ItW99MZ4aFFIOB8dbOO5H2f4KNZCGCn7y5MRPDCP6BMRup5BKKMA4tqXTie3UIBoi+Pj4eDdGq36DptYtFLrwajEh+jNE1gPohTpOPuO74JlMplep6NM43UAh9fDaxIS1tacnPUg+4qvgLDYseycqZ1dRiA+o/aaZva6rq2uUfMI3wScm9CqtC6+iG3EdhfjJAdPUW7q6ln1MPuCL4CMjubPjcfUSTi+lkEbwJpG9AV2yx6hO6m4mjYyMdELsnRSK3UiQtpFXh4YyvVQndQmeyejetrbkbpxeRiGNZl0qFdtZr+g1Cw6xVypVeCasoDUTfVUqFX2am71UIzULDrEfx8O1FNJsNnAfB9VITYJnMnkMa9JWCmkJ3KE1MZG/i2qg6lr62NjExmg08gJO2yikZfBIm2GoHyWTbS9U87mqBOdRL60jL/MccAqRwMFCwdlUzShbVS7dcYw/TI56hcjg4kQi8lg1H6hYcJ68gF60DRSwIU64Pp4kOXU4jkO27ZQe+Zj+Hh8Bw+A5BpmMeXulH6jIpbsrPoyDELyTAoJt60lRdelYSFBUggjlIR6p9BiJGHgMUr7WI7ncxCXd3d1HF7uyIsFRK9+LxLiGhFu3a8G6ZMGu4DbVYrSu6BEcrvicIYRjKaX/lkwu+8FiFy4q4Pj4xCZye9LEi10oWJTPF6lYtCB4bWIznGn4f/D/KxSKZFk2CSfKk0Kz2cKti124YNbFCNhZSpkvSO5NY6GLRRuiuGVyo0BTlGKxaMnq5aLeMM34tV1dat7h1AWt1nEKmyWLzZbIFm2aVkPFZtjKCwWzZPlyK3f68ng8e/NCV8wr+N69OmoY+j4SCovNQnN53czvZG/Cj1LR2niQl27N9/68gl9xRfYOuIjVJBDXjTdXbI9WZLRq4CVb+bx5y3zvlxV8fFx3G0bkThIIe1NOcLa0VrlWFpuLEm4JSASZ8mFeiVvuvbKCRyLm3Xg4jwRimsWS2K2GMxvfi9Dy/OxksuPucm+UFXyyR03cui9OXK6NS4Hdu6T7mQbKcH09B1aY/cYcwfP5/LeQsOJmsLjtbFkW5WZAW6Rrh9FezVE0Zr8+R3DT1DeRnBgqU7AlSUxYLs+FNtViaKqun/3ijF6EsTG9PBotcH+sKME5MXO5YsPb2rXCPa+JRLzUDSuMjGXRVzo6Eh94L8y4w0gkv5EEWrc3+CEVvjWhZXlaKXvGOoEZgqMNJ7Ip5vaLyx66dIdc5d0jmtcPzXjunYyOao5geD4Jg914sSjTlU/HG2uXBkbR+nh423s+JXg8bl4HCxe3rNd1lfInJkhrMp5CpSejV5aYEhy5k5tjAstvh4R78ym8yRbCgKbORu9JSXAInVTKEOfOgzbtSGtHqFunCwYG9DI+LwmezWbX4nbFDZS45SIFBs6bElsUHIS4u9u6ks9LgjuOsRkPZ5IwpI5ILYRMC1c9HGacz0uCG0ZzQ1BXijfjNEhIvV03pvyk4MgBXyZheBMSg4Zb7yBxIC1Li0cMlN/9uMlzSBhuogVRcJleCRW3C6F1n2Hb6lw8X0kCCd66ALkWzluDOI5aa2itziCRBHIliGhQoUwahqFrXlweEjSMbgNDemtIKKGB+wuMe6WB/t9VFOIrUosi9Kb2G1Lb4CH+g5r6Rcbkbn3iCGqzjJFaFPHujBBciYzmwNOGwjLcb9Qq7mkTNyTqEYBlumURfNt9YcD6BiA5n4oWPKAGTpJ3+BQsuAqkS5d+yyx4U7dRWvrIzai4rbwxuVG6ODjOCh9Bg2MBSY0HhGbZQUMpnSGheJGVgoTsYsg4htEyepuEwpGUgmTlLDbHgpEqOkbLhiC4M0BCceOnBafl6LpzyRnUGTQwKO77Vkl+wYYi2WKm492r5AwajcY+5EqbmM3My8ErMmMx+VufsdAsuGSKxeIwT4DIknCiUfmhMONx+Z4Iw6MnWfB3UV0fIcGw2JygEstHFrmtLRqAuoY+HonoD41kMvmpYUTeIeFwjV1awrLYnBEDUs/4CFoPlFLPtu1DJBxOTxY9kYiJEN3zOkGpVDoO7312atN2kb1t5WC3vmxZrBRMpxVRETnWqmvZsVImDFB/f6k1Nmkq1j78GaKAwInMgW45ropXtjc63fk7ucUQj7vf635nYMQ+YRjOi3xSsvB0Or0/mzXRAaMDNb+NE50tLRr1YqS7C/lO7X5Qm/W7lmtMBcxn9+0Fzg8m+gjK73f5rCQ4cmouk8m9j8fLKYC4okRKzTfGmw/nLt11zxebLuUaq5oc+HCt1zPgoM688UD5zdqWmt9TUXdRH9qltdosMQpEpXjCzBTvtCeP9HjZezKVJBB6Hw6xI2chtaLHLavwivdsSnBuj8PtLbpJSkiwgNd7v7Ozc6pjbXactocpZEmBesyT05/PENyy9CH4+9CtLx3ytm3umv7CDME5JicqbjsoZImgdnR0dHwx/ZU59VjUbPfioUghgYYnLMJnz9mIdk4Dk5tluVzhn6jAXUMBxovEMH2Nmreq02uTz21nq8lOl+C3vXH/+5PJtqtnvx4tc2E+k8nuRk/TV8u9LxkvRpq3O+H0wH4LxV451cmipsT2diTktrz7fqDm1mXwU/eUfa/ci7zKEFb+X3xI5L4n0/FinE7fZ9R7vR6md+J43aoB2pP0ACprX29vb58zm2mePU9UBgn3CAmFxWQL5i0xMAZQ2uXI3YrC8S1c5/T+eM5QpmmXdjLK583SdwmPP/NkObGZef0Ub3YGKz+M39VHQnAt2JkaKGlVHDfX6t25dt7AiiAwUNJ2LozWKvfmvP6JPwDRHyUhsMBsyWzVrd4dkI3b8zCed5Fi8bCHX88nNrNggWSaiR28gSm1EHd/MHfXYDdhSQzu1hf2ZEZs/P6nFdzRfsOwX1zoigUF511qtXa2t6L3zdsiije34QSVXGa65Tzfq9nCe+UdhZ3HU6nUZwteRRWQzRb+gh/xPWpiM40txrKsQIb94HluPDOmiWW7o5T+dzK5bP1iF1bYxrC3IW+cpCbguUlp7rsavPtvYj1jHCm3tZILKxIcQ6dH4drvxWlDN/3kBOI9utm6gx52kzevc+sdDS/XHdvW9/DwdiUXV+VzJl37bdSAyBFc4cnnJVR8/IWbcG1tsUYtQ+LE2pNKJTZW+oEqhbN/gZ/wFvmMa9lLT2zG2/6aXbz/qLcKBeeuaj5RleBwG0eQY3+JLxonn5C+Absf8G9kF++z6AXL0tuWL08eqeZDVbtm9OI8jx+ASlz95bm38Xpjcr8seKNcr9OoXmB0Jo5tHR2JXVV/lmokm809q7W6lWqEK2Us9lK27HLwoAyvnKlzEOYplNt3UA3U/K2WVfwZHvZQDXjl2ukmNsMZvc6tNV/T2nqAaqSungHcfC96l3bi8apqPsdNFWmbvzeT2ledqv1aF7ek0+lBqpG6u4JYdDTX/oXTdZVczzVxHmo8HcrthXDXx0VKa+Qq01wdMM34eu7upjqouz2NG0dua/sGTt9c7Fp3ICQUm/HGCnj7ygp40zSdLfWKzfjSgZJKqWOGob/DuXCh66Yv+As51SRdhENIuQ1dXcs+Jh/wtXcfubYzm82jIqeuLPNeaXZKuFPRTNi1c5CD8itTucyOo8xWNZfZs/G1ixQ3P5pMJngf09dmvxe68fK4tfayYwd7JiaKvorN+N4nzmU6mg3fRzPzKTw1+TW3p8kJrXseuFOGD+8phjr/atvm1p6etK9iMw0dsIULvweVkidQUWszzXBtw0K4Y+ixcRjKNnSq/J4aREPn3CaT8e2WRTegKXaQ3JGdkPI4HOkYFdofN1JspuGTrLm/V6niJripPaifhKLPxTYM9axhWJs6O5PPU4Np6vzaoaGRH+Irt+O0HcX56R6fwUIanIRl37tqVdefqEk0fUL18PBwn21HnsHpZfjBnXQawpNCIfSLqNvc39/f3dQgDC2bQT84+AXcfASDANX1wwcdZPI3lHK2r1y5/FlqAS1dMnHixMRZjlPYrLVxH3L9alrC4Pd96jj2o7mcsWPNmq66u0hrvg8SAC9rGhoauwOJcufkAsY0LQ0s/KaP0TR9pKen6+8LrQhpFqIWRR09Ot4djdo/RePhm8gGl5HgXRMXAiJzp8N/0Bzdjdr3b3t6esSEURG76HlwcOTbSLgbIf5NED8ownNl7DmMAO8tFEafW7NmTZ6EIX6V+8DA2PJ43NkI4e/E0/NxtMvJAAqCcmw7jZq2/TCGMA/19/d8QIIJVFyLTz4Z7Uok1PVa25sMwzgf5T1X9M6k5jIEzzOA734PHWSvFIt6X1/fisBs9hfYQCZHj+pkLDa61rZpMypDKyHCpfg558DaVpKPQNgR/P934KoP4eAw4/ssK7O/v78/RwEk2JFrZjE8nO03zcK5aN+fAS/QjUyADEC9ODgTrIJwPA1rRnHgNpc0RqVUBu3jt9FEPAJhj+N/fA4LzmJY990gWfBi/B88XJzuLoevjgAAAABJRU5ErkJggg=="
        />
      </Defs>
    </Svg>
  );
};

export const Edit = ({ ...props }) => {
  return (
    <Svg
      width={31}
      height={31}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.304.932a7.763 7.763 0 015.725 2.025 7.848 7.848 0 012.04 5.74v13.606a7.836 7.836 0 01-2.025 5.74 7.797 7.797 0 01-5.74 2.025H8.697a7.776 7.776 0 01-5.74-2.025 7.775 7.775 0 01-2.025-5.74V8.696a7.775 7.775 0 012.025-5.74A7.776 7.776 0 018.697.933h13.607zm-8.29 21.634l9.805-9.834c.889-.903.889-2.36 0-3.248L21.925 7.59a2.304 2.304 0 00-3.263 0l-.976.99a.387.387 0 000 .54s2.316 2.301 2.36 2.36c.16.174.262.407.262.67a.96.96 0 01-.962.961.915.915 0 01-.64-.262l-2.433-2.418a.317.317 0 00-.438 0L8.886 17.38a2.623 2.623 0 00-.772 1.806l-.087 3.453c0 .19.058.364.19.495a.694.694 0 00.494.204h3.424c.7 0 1.37-.277 1.88-.772z"
        fill="url(#paint0_linear_65_5123)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_65_5123"
          x1={30.0834}
          y1={30.0832}
          x2={-4.6223}
          y2={20.0206}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7210FF" />
          <Stop offset={1} stopColor="#9D59FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export const HomeIcon = ({ focus, ...props }) => {
  return (
    <>
      {focus ? (
        <Svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <Path
            d="M6.935 18.773v-3.057c0-.78.637-1.414 1.423-1.414h2.875c.377 0 .74.15 1.006.414.267.265.417.625.417 1v3.057c-.002.325.126.637.356.867.23.23.544.36.871.36h1.96a3.46 3.46 0 002.444-1 3.41 3.41 0 001.013-2.422V7.867c0-.735-.328-1.431-.895-1.902l-6.67-5.29a3.097 3.097 0 00-3.95.072L1.267 5.965A2.474 2.474 0 00.3 7.867v8.702C.3 18.464 1.847 20 3.756 20h1.916c.68 0 1.231-.544 1.236-1.218l.027-.009z"
            fill="url(#paint0_linear_65_403)"
          />
          <Defs>
            <LinearGradient
              id="paint0_linear_65_403"
              x1={19.3}
              y1={20}
              x2={-3.48048}
              y2={13.7252}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#7210FF" />
              <Stop offset={1} stopColor="#9D59FF" />
            </LinearGradient>
          </Defs>
        </Svg>
      ) : (
        <Svg
          width={20}
          height={20}
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <Path
            d="M7.957 19.771v-3.066c0-.78.636-1.414 1.424-1.42h2.886c.792 0 1.434.636 1.434 1.42v3.076c0 .662.533 1.204 1.202 1.219h1.924c1.918 0 3.473-1.54 3.473-3.438v0-8.724a2.44 2.44 0 00-.962-1.905l-6.58-5.248a3.18 3.18 0 00-3.945 0l-6.55 5.258A2.42 2.42 0 001.3 8.847v8.715C1.3 19.46 2.855 21 4.773 21h1.924c.685 0 1.241-.55 1.241-1.229v0"
            stroke="#9E9E9E"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )}
    </>
  );
};

export const ReleaseIcon = ({ focus, ...props }) => {
  return (
    <>
      {focus ? (
        <Svg
          width={20}
          height={20}
          viewBox="0 0 19 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.811.769l.001.75c2.755.215 4.574 2.092 4.577 4.97l.011 8.427c.004 3.138-1.968 5.069-5.128 5.074l-7.72.01c-3.14.004-5.137-1.973-5.141-5.12l-.01-8.327C.395 3.655 2.15 1.783 4.905 1.53V.78a.746.746 0 01.759-.77.747.747 0 01.76.769l.002.7 5.864-.009v-.7c-.001-.44.324-.769.759-.77a.753.753 0 01.761.769zM1.921 6.862l14.949-.02v-.35c-.043-2.15-1.12-3.277-3.056-3.445l.001.77c0 .43-.335.77-.76.77a.752.752 0 01-.76-.768l-.002-.81-5.864.008v.81c0 .43-.324.77-.758.77a.752.752 0 01-.762-.769v-.77c-1.926.193-2.991 1.325-2.988 3.493v.31zm10.72 4.542v.011c.009.46.384.809.84.799a.823.823 0 00.788-.852.83.83 0 00-.82-.797.828.828 0 00-.809.84zm.815 4.488a.848.848 0 01-.822-.848.833.833 0 01.809-.852h.01c.464 0 .84.379.84.848a.844.844 0 01-.837.852zM8.572 11.42c.02.46.396.819.85.799a.823.823 0 00.78-.86.816.816 0 00-.821-.8c-.454.02-.81.402-.809.861zm.854 4.427a.823.823 0 01-.85-.798c0-.46.355-.84.809-.861a.815.815 0 01.82.797c.021.461-.334.841-.779.862zm-4.922-4.392c.02.46.396.82.85.799.445-.02.8-.4.779-.86a.815.815 0 00-.82-.8.852.852 0 00-.809.861zm.855 4.397a.822.822 0 01-.85-.799.853.853 0 01.808-.86.815.815 0 01.82.799c.021.46-.333.84-.778.86z"
            fill="url(#paint0_linear_65_5352)"
          />
          <Defs>
            <LinearGradient
              id="paint0_linear_65_5352"
              x1={18.4001}
              y1={20}
              x2={-3.33853}
              y2={14.3274}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#7210FF" />
              <Stop offset={1} stopColor="#9D59FF" />
            </LinearGradient>
          </Defs>
        </Svg>
      ) : (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          viewBox="0 0 21 22"
          fill="none"
          {...props}
        >
          <Path
            d="M1.493 8.404h17.824M14.842 12.31h.01M10.405 12.31h.01M5.958 12.31h.01M14.842 16.196h.01M10.405 16.196h.01M5.958 16.196h.01M14.444 1v3.29M6.366 1v3.29"
            stroke="#9E9E9E"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            clipRule="evenodd"
            d="M14.638 2.58H6.171c-2.937 0-4.77 1.635-4.77 4.642v9.05C1.4 19.326 3.233 21 6.17 21h8.458c2.946 0 4.771-1.645 4.771-4.652V7.222c.01-3.007-1.816-4.643-4.762-4.643z"
            stroke="#9E9E9E"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )}
    </>
  );
};

export const ListIcon = ({ focus, ...props }) => {
  return (
    <>
      {focus ? (
        <Svg
          width={20}
          height={20}
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.9 0h6.17c2.71 0 4.9 1.07 4.93 3.79v15.18c0 .17-.04.34-.12.49-.13.24-.35.42-.62.5-.26.08-.55.04-.79-.1l-6.48-3.24-6.49 3.24c-.149.079-.32.13-.49.13-.56 0-1.01-.46-1.01-1.02V3.79C0 1.07 2.2 0 4.9 0zm-.68 7.62h7.53c.43 0 .78-.351.78-.79 0-.44-.35-.79-.78-.79H4.22c-.43 0-.78.35-.78.79 0 .439.35.79.78.79z"
            fill="url(#paint0_linear_65_6671)"
          />
          <Defs>
            <LinearGradient
              id="paint0_linear_65_6671"
              x1={16}
              y1={20.0008}
              x2={-3.5854}
              y2={15.4581}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#7210FF" />
              <Stop offset={1} stopColor="#9D59FF" />
            </LinearGradient>
          </Defs>
        </Svg>
      ) : (
        <Svg
          width={20}
          height={20}
          viewBox="0 0 18 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <G
            stroke="#9E9E9E"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.739 5.154c0-2.751-1.88-3.854-4.589-3.854H5.791C3.167 1.3 1.2 2.328 1.2 4.97v14.724a.95.95 0 001.413.828l6.382-3.58 6.327 3.574a.95.95 0 001.417-.827V5.154z"
            />
            <Path d="M5.271 8.028h7.318" />
          </G>
        </Svg>
      )}
    </>
  );
};

export const DownloadIcon = ({ focus, ...props }) => {
  return (
    <>
      {focus ? (
        <Svg
          width={20}
          height={20}
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <Path
            d="M9.83 5.29V1.283c0-.427.34-.782.77-.782.385 0 .711.298.763.677l.007.105V5.29h4.78c2.38 0 4.335 1.949 4.445 4.38l.005.215v5.04c0 2.447-1.887 4.456-4.232 4.569l-.208.005H5.04c-2.38 0-4.326-1.94-4.435-4.379L.6 14.905v-5.03c0-2.447 1.878-4.466 4.222-4.58l.208-.004h4.8v6.402l-1.6-1.652a.755.755 0 00-1.09 0 .81.81 0 00-.22.568c0 .157.045.32.14.459l.08.099 2.91 3.015c.14.155.34.237.55.237a.735.735 0 00.465-.166l.075-.071 2.91-3.015c.3-.31.3-.816 0-1.126a.755.755 0 00-1.004-.077l-.086.077-1.59 1.652V5.291H9.83z"
            fill="url(#paint0_linear_65_3173)"
          />
          <Defs>
            <LinearGradient
              id="paint0_linear_65_3173"
              x1={20.6001}
              y1={19.5}
              x2={-3.00039}
              y2={12.2971}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#7210FF" />
              <Stop offset={1} stopColor="#9D59FF" />
            </LinearGradient>
          </Defs>
        </Svg>
      ) : (
        <Svg
          width={20}
          height={20}
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <G
            stroke="#9E9E9E"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M10.722 13.436V1.396M13.638 10.508l-2.916 2.928-2.916-2.928" />
            <Path d="M15.355 6.128h.933a3.684 3.684 0 013.684 3.685v4.884a3.675 3.675 0 01-3.675 3.675H5.157a3.685 3.685 0 01-3.685-3.685V9.802a3.675 3.675 0 013.675-3.674h.942" />
          </G>
        </Svg>
      )}
    </>
  );
};

export const ProfileIcon = ({ focus, ...props }) => {
  return (
    <>
      {focus ? (
        <Svg
          width={20}
          height={20}
          viewBox="0 0 17 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.494 5.291A5.274 5.274 0 018.2 10.583a5.275 5.275 0 01-5.294-5.292A5.274 5.274 0 018.2 0a5.273 5.273 0 015.294 5.291zM8.2 20c-4.338 0-8-.705-8-3.425 0-2.721 3.685-3.401 8-3.401 4.339 0 8 .705 8 3.425 0 2.721-3.685 3.401-8 3.401z"
            fill="url(#paint0_linear_65_3649)"
          />
          <Defs>
            <LinearGradient
              id="paint0_linear_65_3649"
              x1={16.2}
              y1={20}
              x2={-3.38537}
              y2={15.4571}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#7210FF" />
              <Stop offset={1} stopColor="#9D59FF" />
            </LinearGradient>
          </Defs>
        </Svg>
      ) : (
        <Svg
          width={20}
          height={20}
          viewBox="0 0 17 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <G
            fillRule="evenodd"
            clipRule="evenodd"
            stroke="#9E9E9E"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path
              d="M8.185 13.346c-3.868 0-7.17.585-7.17 2.927s3.281 2.948 7.17 2.948c3.867 0 7.17-.586 7.17-2.927s-3.282-2.948-7.17-2.948z"
              strokeWidth={1.5}
            />
            <Path
              d="M8.185 10.006A4.596 4.596 0 103.588 5.41a4.58 4.58 0 004.564 4.596h.033z"
              strokeWidth={1.42857}
            />
          </G>
        </Svg>
      )}
    </>
  );
};

export const Search = ({ color }) => {
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Circle cx={11.7276} cy={11.7276} r={10.4867} />
        <Path d="M19.021 19.566l4.112 4.1" />
      </G>
    </Svg>
  );
};

export const Nofification = ({ ...props }) => {
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.995.933c-5.173 0-7.42 4.685-7.42 7.781 0 2.315.335 1.633-.946 4.457-1.565 4.023 4.726 5.668 8.366 5.668 3.64 0 9.93-1.645 8.367-5.668-1.281-2.823-.945-2.142-.945-4.457 0-3.096-2.25-7.78-7.422-7.78z"
        />
        <Path d="M12.69 21.93c-1.51 1.687-3.865 1.707-5.39 0" />
      </G>
    </Svg>
  );
};

export const Qualifier = ({ ...props }) => {
  return (
    <Svg
      width={16}
      height={6}
      viewBox="0 0 16 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
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
          <Stop stopColor="#7210FF" />
          <Stop offset={1} stopColor="#9D59FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export const List = ({ ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={19}
      viewBox="0 0 14 19"
      fill="none"
      {...props}
    >
      <Path
        d="M4.119 7.181H9.83"
        stroke="#212121"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M6.975 1.583c-5.322 0-6.221.777-6.221 7.025 0 6.994-.131 8.809 1.199 8.809 1.329 0 3.5-3.07 5.022-3.07 1.523 0 3.694 3.07 5.023 3.07 1.33 0 1.199-1.815 1.199-8.81 0-6.247-.9-7.024-6.222-7.024z"
        stroke="#212121"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const Share = ({ ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={17}
      viewBox="0 0 18 17"
      fill="none"
      {...props}
    >
      <Path
        clipRule="evenodd"
        d="M8.578 8.865s-9.98-2.064-6.513-4.067C4.992 3.11 15.08.204 16.488.955c.75 1.409-2.154 11.496-3.844 14.422-2.002 3.469-4.066-6.512-4.066-6.512z"
        stroke="#212121"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.578 8.865l7.91-7.91"
        stroke="#212121"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const Star = ({ ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={16}
      viewBox="0 0 18 16"
      fill="none"
      {...props}
    >
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
          <Stop stopColor="#7210FF" />
          <Stop offset={1} stopColor="#9D59FF" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_65_5091"
          x1={9.00008}
          y1={15.9167}
          x2={-1.5048}
          y2={14.3137}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7210FF" />
          <Stop offset={1} stopColor="#9D59FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export const ArrowGradient = ({ ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={8}
      height={12}
      viewBox="0 0 8 12"
      fill="none"
      {...props}
    >
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
          <Stop stopColor="#7210FF" />
          <Stop offset={1} stopColor="#9D59FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export const ArrowDown = ({ ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={8}
      viewBox="0 0 12 8"
      fill="none"
      {...props}
    >
      <Path
        d="M10.667 1.667L6 6.333 1.333 1.667"
        stroke="url(#paint0_linear_65_4951)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_65_4951"
          x1={10.6666}
          y1={6.33341}
          x2={1.65679}
          y2={1.1088}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7210FF" />
          <Stop offset={1} stopColor="#9D59FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export const Play = ({ ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={21}
      viewBox="0 0 20 21"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 10.255C0 4.71 4.488.205 10 .205s10 4.506 10 10.05c0 5.532-4.488 10.038-10 10.038S0 15.787 0 10.255zm13.668 1.016c.106-.106.241-.271.27-.31a1.17 1.17 0 00.232-.706c0-.282-.087-.544-.251-.757a3.681 3.681 0 01-.074-.08c-.064-.07-.157-.171-.245-.26-.791-.852-2.857-2.248-3.938-2.674-.164-.067-.579-.213-.801-.223-.212 0-.415.049-.608.145a1.255 1.255 0 00-.54.601c-.068.175-.174.698-.174.708-.107.571-.164 1.502-.164 2.529 0 .98.057 1.87.144 2.452.003.002.011.044.024.108.04.197.12.606.208.774.212.407.627.659 1.071.659h.039c.29-.01.898-.262.898-.272 1.023-.426 3.04-1.754 3.851-2.636l.058-.058z"
        fill="#fff"
      />
    </Svg>
  );
};

export const Speed = ({ ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <Path
        d="M12.906 5.749a9.473 9.473 0 00-4.8 1.976l1.198 1.2a1.094 1.094 0 01-1.546 1.546L6.554 9.268a9.316 9.316 0 00-1.931 4.44h2.45a1.094 1.094 0 010 2.188H4.557a9.698 9.698 0 003.01 6.13 1.094 1.094 0 01-1.496 1.595c-2.246-2.105-3.738-5.208-3.738-8.537C2.333 8.678 7.564 3.5 14 3.5s11.667 5.177 11.667 11.584a11.784 11.784 0 01-3.684 8.537 1.094 1.094 0 01-1.496-1.596 9.598 9.598 0 002.957-6.13h-2.517a1.094 1.094 0 110-2.187h2.45c-.618-4.18-4.015-7.474-8.283-7.96V7.51a1.093 1.093 0 11-2.188 0V5.75zm6.124 3.303a.73.73 0 011.088.93l-.16.286a496.466 496.466 0 01-1.771 3.1c-.475.826-.956 1.647-1.444 2.465-.183.308-.37.613-.56.916a5.839 5.839 0 01-.394.569 2.188 2.188 0 11-3.328-2.841 5.74 5.74 0 01.5-.479c.22-.193.5-.431.817-.698.636-.53 1.432-1.181 2.208-1.808.926-.749 1.854-1.494 2.786-2.235l.258-.204v-.001z"
        fill="#fff"
      />
    </Svg>
  );
};

export const Voice = ({ ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={26}
      viewBox="0 0 22 26"
      fill="none"
      {...props}
    >
      <Path
        d="M11 24.667v-3.688"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M11 16.323v0c-2.617 0-4.74-2.13-4.74-4.76V6.094c0-2.629 2.123-4.76 4.74-4.76 2.618 0 4.739 2.131 4.739 4.76v5.469c0 2.63-2.121 4.76-4.74 4.76z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.333 11.6c0 5.18-4.178 9.378-9.334 9.378-5.154 0-9.332-4.199-9.332-9.377"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const ChromeCast = ({ ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={20}
      viewBox="0 0 24 20"
      fill="none"
      {...props}
    >
      <Path
        d="M1.5 19.333h.014c.642 0 1.166-.524 1.166-1.166 0-.643-.524-1.167-1.166-1.167H1.5c-.643 0-1.167.524-1.167 1.167 0 .642.524 1.166 1.167 1.166zM7.333 18.167A5.833 5.833 0 001.5 12.333c-.643 0-1.167.524-1.167 1.167s.524 1.167 1.167 1.167a3.507 3.507 0 013.5 3.5c0 .642.524 1.166 1.167 1.166.642 0 1.166-.524 1.166-1.166z"
        fill="#fff"
      />
      <Path
        d="M12 18.167c0-5.802-4.699-10.5-10.5-10.5-.643 0-1.167.524-1.167 1.166C.333 9.476.857 10 1.5 10c2.26 0 4.293.911 5.774 2.393a8.123 8.123 0 012.393 5.774c0 .642.524 1.166 1.166 1.166.643 0 1.167-.524 1.167-1.166z"
        fill="#fff"
      />
      <Path
        d="M15.5 19.333H19a4.664 4.664 0 004.667-4.666V5.333A4.664 4.664 0 0019 .667H4.991A4.672 4.672 0 00.634 3.779a1.17 1.17 0 00.711 1.49 1.17 1.17 0 001.49-.71 2.334 2.334 0 012.179-1.554h-.01 14a2.338 2.338 0 012.334 2.333v9.333a2.338 2.338 0 01-2.333 2.334h-3.5c-.643 0-1.167.524-1.167 1.166a1.161 1.161 0 001.162 1.162z"
        fill="#fff"
      />
    </Svg>
  );
};

export const Episodes = ({ ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={21}
      viewBox="0 0 26 21"
      fill="none"
      {...props}
    >
      <Path
        d="M25.834 10.125c0 .59-.411 1.07-.917 1.07-.507 0-.917-.48-.917-1.07V3.708c0-.59-.41-1.07-.916-1.07H11.167c-.506 0-.917-.478-.917-1.069 0-.59.41-1.069.917-1.069H24c.486 0 .952.226 1.296.627.344.401.537.945.538 1.512v7.486z"
        fill="#fff"
      />
      <Path
        d="M21.25 14.708c0 .59-.41 1.07-.916 1.07-.507 0-.917-.48-.917-1.07V8.292c0-.591-.41-1.07-.917-1.07H6.584c-.507 0-.917-.479-.917-1.07 0-.59.41-1.069.917-1.069h12.833c.486 0 .952.226 1.296.627.343.401.537.945.537 1.512v7.486z"
        fill="#fff"
      />
      <Path
        d="M14.833 20.667H2a1.834 1.834 0 01-1.833-1.834V11.5A1.835 1.835 0 012 9.667h12.833a1.835 1.835 0 011.834 1.833v7.333a1.835 1.835 0 01-1.834 1.834zM2 11.5v7.333h12.834V11.5H2z"
        fill="#fff"
      />
    </Svg>
  );
};

export const PlayFill = ({ ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      {...props}
    >
      <Path
        d="M8 35.518V11.245c0-4.971 5.402-8.09 9.714-5.605l10.526 6.062 10.526 6.087c4.312 2.486 4.312 8.7 0 11.185L28.24 35.063l-10.526 6.062C13.403 43.609 8 40.514 8 35.518z"
        fill="#fff"
      />
    </Svg>
  );
};
