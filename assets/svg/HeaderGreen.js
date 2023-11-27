import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Dimensions } from "react-native"

const {height, width} = Dimensions.get('window');

const HeaderGreen = ({props, children}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={300} //height/2.2
    fill="none"
    {...props}
  >
    <Path
      fill="#166838"
      d="M428 0H0v294.193C65.412 277.998 137.822 269 214 269s148.588 8.998 214 25.193V0Z"
    />
    {children}
  </Svg>
)
export default HeaderGreen
