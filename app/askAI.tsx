import { Dimensions, StyleSheet, useColorScheme } from 'react-native';

import { Text, View } from '../components/Themed';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { ActivityIndicator, Button } from 'react-native-paper';
import { Post } from '../utils/Post';
import { ScrollView } from 'react-native-gesture-handler';
import { addPropertyToPost } from '../utils/AppStorage';
import { modes } from '../constants/Modes';
import Colors from '../constants/Colors';
import ThemeContext from '../constants/ThemeContext';
export default function TabOneScreen() {
  const { post: PostFromNav } = useLocalSearchParams();
  const router = useRouter()
  const [modeSelected, setModeSelected] = useState([])
  const [aiResponse, setAiResponse] = useState('')
  
  const { theme, toggleTheme } = useContext(ThemeContext);
  const colors = Colors[theme??'light'];
  const styles = styling(colors);


  const onSelect = (e) => {
    if (e[0] == 'skip') {
      skip()
      return
    }
    setModeSelected(e)
    const p = Post.parseSerializable(PostFromNav)
    setAiResponse('loading')
    fetch(`${process.env.EXPO_PUBLIC_ASKAI_API_URL}?emotion=${p.emotion}&mode=${e}&content=${p.content}`).then((response) => {
      return response.text();
    }).then(res => {
      setAiResponse(res)
      addPropertyToPost(p.id, e[0], res)
    })

  }

  const skip = () => {
    router.push({ pathname: "askCBT", params: { post: PostFromNav } })
  };
  return (
    <SafeAreaView
      style={styles.background} >
      <ScrollView contentContainerStyle={styles.scroll}>
        <AntDesign name='checkcircle' size={50} color={colors.tick}/>
        <Text style={styles.title}>It's gone in the bin!</Text>
        <Text style={styles.description}>Next, get a reply from AI:</Text>
        <View style={styles.selectContainer}>
          <SectionedMultiSelect
          
            items={modes}
            IconRenderer={MaterialIcons}
            uniqueKey="id"
            selectText="-- Choose AI mode --"
            showDropDowns={true}
            onSelectedItemsChange={onSelect}
            selectedItems={modeSelected}
            single
            colors={{ selectToggleTextColor:colors.text }}
          />
        </View>
        {
          aiResponse == 'loading' ?
            <><ActivityIndicator animating={true} color={colors.bin} /><Text style={styles.note}>{"May take up to 30 sec..."}</Text></>
            :
            aiResponse ?
              <><Text style={styles.description}>{aiResponse}</Text>
                <Button mode="contained" onPress={skip} style={styles.btn}>Continue</Button></>
              :
              <Button mode="contained" onPress={skip} style={styles.btn} >Skip for now</Button>
        }

      </ScrollView>
    </SafeAreaView>


  );
}

const styling =(colors)=> StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingTop: 30
  },
  title: {
    fontWeight: 'bold',
    padding: 20,
    fontSize: 20,
    textAlign: 'center',
    color: colors.text
  },
  description: {

    padding: 20,
    fontSize: 15,
    textAlign: 'left',
    color: colors.text
  },
  btn: {
    marginTop: 20,
    width: '80%',
  },
  selectContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
  },
  note: {
    padding: 20,
    fontSize: 12,
    textAlign: 'left',
    color:colors.unimportantText
  }

});
