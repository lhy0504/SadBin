import { StyleSheet,  } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useEffect, useState } from 'react';
import { emotions } from '../../constants/Emotions';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import Memo from '../../components/Memo';
import ThemeContext from '../../constants/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ToggleButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabOneScreen() {
  const [emotionSelected, setEmotionSelected] = useState([])
  const router = useRouter();

  const { theme, toggleTheme } = useContext(ThemeContext);
  const colors = Colors[theme ?? 'light'];
  const styles = styling(colors);

  // toggle
  const [themeValSelected, setThemeValSelected] = useState(null);
  useEffect(() => {
    getThemeFromStorage()
  }, [])
  const getThemeFromStorage = async () => {
    const savedTheme = await AsyncStorage.getItem('theme');
    setThemeValSelected(savedTheme);
  }
  const handleToggleTheme = (val) => {
    if (!val) return
    toggleTheme(val); setThemeValSelected(val);
  };


  function onSelectEmotion(e: Any) {
    router.push({ pathname: "write", params: { emotions: e } });

  }
  return (
    <SafeAreaView
      style={styles.background} >
      <View style={styles.toggleView}>
        <ToggleButton.Row onValueChange={handleToggleTheme} value={themeValSelected}>
          <ToggleButton icon="lightbulb-on" value="light" />
          <ToggleButton icon="lightbulb-auto" value="auto" />
          <ToggleButton icon="lightbulb-outline" value="dark" />
        </ToggleButton.Row>
      </View>
      <Memo >
        <Text style={styles.title}>{"How are you feeling today?"}</Text>
        <View style={styles.selectContainer}>
          <SectionedMultiSelect

            items={emotions}
            IconRenderer={MaterialIcons}
            uniqueKey="id"
            selectText="-- Choose your emotion 😊😞😰😔😨😟--"
            showDropDowns={true}
            onSelectedItemsChange={onSelectEmotion}
            selectedItems={emotionSelected}
            single
            colors={{ selectToggleTextColor: colors.text }}
            styles={styles.select}
          />
        </View>


      </Memo>
      <View style={styles.bottomBin}>
        <Entypo name='trash' size={80} color={colors.unimportantText} />
      </View>
    </SafeAreaView>


  );
}

const styling = (colors) => StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 10
  },
  toggleView: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.background,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: colors.text
  },
  selectContainer: {
    padding: 15,
    backgroundColor: 'trasparent',
  },
  select: {
    backgroundColor: 'transparent',
  },
  bottomBin: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: colors.background,
  }

});
