import { Animated, Dimensions, PanResponder, StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '../components/Themed';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useEffect, useRef, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../constants/Colors';
import ThemeContext from '../constants/ThemeContext';

export default function TabOneScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const colors = Colors[theme??'light'];
  const styles = styling(colors);



  const { post: PostFromNav, pic: PicFromNav } = useLocalSearchParams();
  const router = useRouter()
  const deviceHeight = Dimensions.get('window').height / 1.8
  const [showCircle, setShowCircle] = useState(false)

  const [inbin, setInbin] = useState(false)
  const [released, setReleased] = useState(false)
  const pan = useRef(new Animated.ValueXY()).current;
  const pannedScale = Animated.divide(pan.y, deviceHeight);
  const newScale = Animated.subtract(1, pannedScale);
  newScale.addListener(({ value }) => {
    if (value < .2)
      setInbin(true)
    if (value < .5)
      setShowCircle(true)
  })
  useEffect(() => {
    if (released && inbin) {
      router.push({ pathname: "askAI", params: { post: PostFromNav } })
    }
  }, [released, inbin])

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        setReleased(false)
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }),
      onPanResponderRelease: () => {
        // check if the item is dragged to the bottom
        setReleased(true)
        pan.extractOffset();
      },
    }),
  ).current;

  return (
    <SafeAreaView
      style={styles.background} >
      <Text style={styles.title}>Drag whatever happened today into the trash bin.</Text>

      <Animated.Image
        source={{ uri: PicFromNav }}
        resizeMode='contain'
        style={{
          width: '50%', height: '50%', resizeMode: 'contain', zIndex: 1,
          transform: [{ translateY: pan.y, },
          { scale: newScale },
          ]
        }}
        {...panResponder.panHandlers} />
      <View style={styles.middleView}>
        <MaterialCommunityIcons name='arrow-down-thin' size={50} color='gray' />
      </View>
      <Entypo name='trash' size={80} color={colors.bin} />
      <View style={showCircle&& styles.circle} ></View>
    </SafeAreaView>


  );
}

const styling = (colors) => StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
    paddingBottom: 20
  },
  title: {
    fontWeight: 'bold',
    padding: 20,
    fontSize: 20,
    textAlign: 'center',
    color: colors.text
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  circle:{
    backgroundColor:colors.lightbackground,
    zIndex:-9,
    position:'absolute',
    width:500,
    height:500,
    borderRadius:500,
    bottom:-430,
  }

});
