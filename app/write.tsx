import { Keyboard, StyleSheet, useColorScheme, } from 'react-native';

import { Text, View } from '../components/Themed';
import { ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import dayjs from "dayjs";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';
import { emotions } from '../constants/Emotions';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Post } from '../utils/Post';
import { savePostToStorage } from '../utils/AppStorage';
import ViewShot from "react-native-view-shot";
import Colors from '../constants/Colors';
import Memo from '../components/Memo';

export default function TabOneScreen() {
  const { emotions: emotionsFromNav } = useLocalSearchParams();
  const router = useRouter()
  const [emotionSelected, setEmotionSelected] = useState([])
  const [content, setContent] = useState('')
  const ref = useRef();

  const colors = Colors[useColorScheme() ?? 'light'];
  const styles = styling(colors);

  useEffect(() => {
    if (emotionsFromNav) {
      setEmotionSelected([emotionsFromNav])
    }
  }, [emotionsFromNav]);


  const doneEdit = async () => {
    Keyboard.dismiss()
    //save post to storage
    const post = new Post()
    post.emotion = emotionSelected[0]
    post.content = content
    await savePostToStorage(post)

    //cap the view
    ref.current.capture().then(uri => {
      console.log(post.getSerializable())
      console.log(999)
      router.push({
        pathname: "dragToBin", params: {
          post: post.getSerializable(),
          pic: uri
        }
      });
    });

  }
  const onSelectEmotion = (e: string) => { console.log(e); setEmotionSelected(e) }
  const cancel = () => { router.back() }
  return (
    <SafeAreaView
      style={styles.background} >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.menubar}>
          <TouchableOpacity onPress={cancel} style={styles.button}>
            <AntDesign name="close" size={36} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={doneEdit} style={styles.button}>
            <AntDesign name="check" size={36} color={colors.text} />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>

      <ScrollView contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets={true}>
        <ViewShot ref={ref} options={{ format: "jpg", quality: 0.9 }} >
          <Memo style={styles.memo}>
            <Text style={styles.datetext}>{dayjs(new Date()).format("D MMM")}</Text>
            <SectionedMultiSelect
              items={emotions}
              IconRenderer={MaterialIcons}
              uniqueKey="id"
              selectText="-- Choose your emotion --"
              showDropDowns={true}
              onSelectedItemsChange={onSelectEmotion}
              selectedItems={emotionSelected}
              single
              colors={{ selectToggleTextColor: colors.text }}
              styles={styles.selectStyle} />
            <TextInput
              multiline
              mode='outlined'
              label={'What\'s your mood today?'}
              placeholder="What happened today?"
              style={styles.textarea}
              textColor={colors.text}
              placeholderTextColor={colors.text}
              value={content}
              onChangeText={setContent}
            />
          </Memo>
        </ViewShot>
      </ScrollView>

    </SafeAreaView>


  );
}

const styling = (colors) => StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1, minHeight: 800,
    backgroundColor: colors.background,
    marginHorizontal: 10,
  },
  memo:{
    paddingBottom:60,
  },
  textarea: {
    minHeight: 130,
    padding: 16,
    backgroundColor: colors.textarea,

    color: colors.text,
    borderRadius: 10,
    textAlignVertical: 'top',
  },
  menubar: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.background,
  },
  button: {
    margin: 10,
  },
  datetext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    margin: 10,

  },
  selectStyle: {
    /*  button: {
       flexBasis: "100%"
     },
     container: {
       flex: 0,
       flexDirection: "row",
       alignContent: "center",
       flexWrap: "wrap"
     },
     scrollView: {
       flexBasis: "100%"
     } */
  }

});
