import * as React from "react"
import Svg, { Path } from "react-native-svg"
const G = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={37}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M35.988 23.62c0 2.69-.016 5.38.01 8.068.009.93-.296 1.496-1.22 1.893-2.435 1.044-4.953 1.775-7.57 2.143-1.803.254-3.552.724-5.416.753-2.566.038-5.049-.299-7.497-.924-3.407-.87-6.48-2.417-8.915-5.017C1.449 26.336.195 21.29.887 15.708c.486-3.915 2.118-7.309 5.048-10.02 2.435-2.252 5.319-3.633 8.532-4.42 4.883-1.197 9.747-.845 14.56.26 1.915.438 3.728 1.334 5.583 2.032.727.273.997.854.997 1.594 0 2.26.019 4.525-.007 6.785-.003.296-.146.75-.355.845-.229.105-.658-.048-.912-.22-4.305-2.838-9.036-4.048-14.145-3.428-3.413.412-6.458 1.682-8.379 4.79-2.4 3.884-1.25 9.294 2.588 11.771 3.448 2.223 7.226 2.667 11.202 1.788.682-.153.971-.53.949-1.23a53.45 53.45 0 0 1-.013-3.025c.023-.86-.358-1.213-1.219-1.194-1.654.041-3.308.048-4.963.044-1.143 0-1.343-.215-1.34-1.336v-5.319c0-1.136.22-1.371 1.321-1.371 4.75 0 9.497.01 14.247.019 1.21 0 1.41.225 1.41 1.476v8.068l-.003.003Z"
    />
  </Svg>
)
export default G