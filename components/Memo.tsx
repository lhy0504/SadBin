import React, { useContext } from 'react';
import { useColorScheme } from 'react-native';
import Svg, {Polygon}from 'react-native-svg';
import Colors from '../constants/Colors';
import { View } from './Themed';
import ThemeContext from '../constants/ThemeContext';


export default function EditScreenInfo(props) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const colors = Colors[theme??'light'];


  return (
    <View {...props}
      style={{
        width: '100%',
        minHeight: '45%',
        backgroundColor: colors.paper,
        position: 'relative',
        justifyContent: 'center',

        ...props.style,
      }}>
      {props.children}


      <View
        style={{


          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: -9

        }}>
        <Svg height="40" width="40">
          <Polygon
            points="0,0 0,40 40,40"
            fill={colors.paperfold}
          />
          <Polygon
            points="0,0 40,0 40,40"
            fill={colors.background}
          />
        </Svg>
      </View>

    </View >
  );
}

