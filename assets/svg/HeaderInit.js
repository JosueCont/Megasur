import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
const HeaderInit = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={428}
    height={350}
    fill="none"
    {...props}
  >
    <Path
      fill="url(#a)"
      d="M429 0H0v411.54A3033.685 3033.685 0 0 1 214 404c72.295 0 143.99 2.566 215 7.611V0Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={214.554}
        x2={214.554}
        y1={413.534}
        y2={13.271}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#039839" />
        <Stop offset={1} stopColor="#219BD7" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default HeaderInit
