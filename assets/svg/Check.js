import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={80}
    height={80}
    fill="none"
    {...props}
  >
    <Path
      fill="#04667C"
      fillRule="evenodd"
      d="M57.056 28.223a3.555 3.555 0 0 1 .47 5.075L39.148 54.92a3.702 3.702 0 0 1-2.657 1.292 3.716 3.716 0 0 1-2.766-1.051L22.698 44.35a3.554 3.554 0 0 1 0-5.096 3.728 3.728 0 0 1 5.198 0l8.181 8.02 15.802-18.59c1.3-1.529 3.617-1.735 5.177-.461Z"
      clipRule="evenodd"
    />
    <Path
      fill="#04667C"
      fillRule="evenodd"
      d="M40 7.273C21.925 7.273 7.273 21.925 7.273 40c0 18.075 14.652 32.727 32.727 32.727 18.075 0 32.727-14.652 32.727-32.727C72.727 21.925 58.075 7.273 40 7.273ZM0 40C0 17.909 17.909 0 40 0s40 17.909 40 40-17.909 40-40 40S0 62.091 0 40Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
