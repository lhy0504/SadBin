import { StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { emotions } from '../../constants/Emotions';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import Memo from '../../components/Memo';

export default function TabOneScreen() {
  const [emotionSelected, setEmotionSelected] = useState([])
  const router = useRouter();
  const colors = Colors[useColorScheme() ?? 'light'];
  const styles = styling(colors);
  

  function onSelectEmotion(e: Any) {
    router.push({ pathname: "write", params: { emotions: e } });

  }
  return (
    <SafeAreaView
      style={styles.background} >

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
  }

});
