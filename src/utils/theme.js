import {extendTheme} from "native-base";
import { Colors } from "./Colors";

export const theme = extendTheme({
    components: {
        Text: {
            defaultProps: { size: 'sm' },
            sizes: {
                xl: { fontSize: '64px' },
                lg: { fontSize: '32px' },
                md: { fontSize: '16px' },
                sm: { fontSize: '12px' },
            },
        },
        Switch:{
            
        },
        
    },
    fontConfig: {
       
    },
    colors: {
        primary: {
            50: '#E3F2F9',
            100: '#C5E4F3',
            200: '#A2D4EC',
            300: '#7AC1E4',
            400: '#47A9DA',
            500: '#0088CC',
            600: '#007AB8',
            700: '#006BA1',
            800: '#005885',
            900: '#FF2830',
        },
        amber: {
            400: '#d97706',
        },
        orange: {
            50: Colors.red,
        },
    },
    config: {
        initialColorMode: 'light',
    },
    fonts: {
        //heading: 'Roboto',
        //body: 'Roboto',
        //mono: 'Roboto',
    },

});
