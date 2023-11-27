import * as React from "react"
import Svg, { G, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={90}
    height={67}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Path
        fill="#BBC7CE"
        d="M54.799 58.164H35.512L65.786 0h19.29L54.8 58.164ZM23.287 58.164H4L34.277 0h19.287L23.287 58.164Z"
      />
      <Path
        fill="#fff"
        d="M85.476 0H66.19v58.164h19.287V0ZM54.799 0H35.512v58.164H54.8V0Z"
      />
    </G>
    <Defs></Defs>
  </Svg>
)
export default SvgComponent
