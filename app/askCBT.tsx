import { Dimensions, StyleSheet, useColorScheme } from 'react-native';

import { Text, View } from '../components/Themed';
import { AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { ActivityIndicator, Button } from 'react-native-paper';
import { Post } from '../utils/Post';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { addPropertyToPost } from '../utils/AppStorage';
import { modes } from '../constants/Modes';
import Colors from '../constants/Colors';
export default function TabOneScreen() {
  const { post: PostFromNav } = useLocalSearchParams();
  const router = useRouter()
  const [aiResponse, setAiResponse] = useState('')

  const colors = Colors[useColorScheme() ?? 'light'];
  const styles = styling(colors);

  const onSelect = (mode: string) => {
    const p = Post.parseSerializable(PostFromNav)
    setAiResponse('loading')

    let api_uri
    if (mode == 'RSF') {
      api_uri = process.env.EXPO_PUBLIC_ASKRSF_API_URL
    } else if (mode == 'CBT') {
      api_uri = process.env.EXPO_PUBLIC_ASKCBT_API_URL
    }
    console.log(mode, api_uri, process.env.EXPO_PUBLIC_ASKRSF_API_URL)
    fetch(`${api_uri}?emotion=${p.emotion}&content=${p.content}`).then((response) => {
      return response.text();
    }).then(res => {
      setAiResponse(res)
      addPropertyToPost(p.id, mode, res)
    })

  }

  const skip = () => {
    router.push({
      pathname: "bin", params: {
        refresh: new Date().toISOString()
      }
    })
  };
  return (
    <SafeAreaView
      style={styles.background} >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.icon} >
          <MaterialCommunityIcons name='flower' size={60} color={colors.flower} />
        </View>
        <Text style={styles.title}>Want to think positively?</Text>
        <Text style={styles.description}>Get AI reply using these psychological thinkings:</Text>

        {
          aiResponse == 'loading' ?
            <><ActivityIndicator animating={true} color={colors.bin} /><Text style={styles.note}>{"May take up to 30 sec..."}</Text></>
            :
            aiResponse ?
              <><Text style={styles.description}>{aiResponse}</Text>
                <Button mode="contained" onPress={skip} style={styles.btn}>Continue</Button></>
              :
              <><View style={styles.selectContainer}>
                <TouchableOpacity onPress={() => onSelect("CBT")}>
                  <View style={styles.listbutton}>
                    <Text style={styles.listbuttonText}>CBT</Text>
                    <Text style={styles.listbuttondescription}>Reframe the situation from a different perspective.</Text>
                  </View>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => onSelect("RSF")}>
                  <View style={styles.listbutton}><Text style={styles.listbuttonText}>RSF</Text>
                    <Text style={styles.listbuttondescription}>Find solutions and take proactive steps forward.</Text>
                  </View>

                </TouchableOpacity>
              </View>
                <Button mode="contained" onPress={skip} style={styles.btn}>Skip for now</Button></>
        }

      </ScrollView>
    </SafeAreaView>


  );
}

const styling = (colors) => StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
  icon: {
    width:80,
    height:80,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:40,
    backgroundColor:colors.lightbackground,
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
    backgroundColor: colors.darkbackground,
    marginHorizontal: 20,
    borderRadius: 10,
    borderColor: colors.border,
    borderWidth: 1,
    overflow: 'hidden'
  },
  listbutton: {
    width: '100%',
    backgroundColor: colors.darkbackground,
    padding: 15,
    borderColor: colors.border,
    borderBottomWidth: 1
  },
  listbuttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text
  },
  listbuttondescription: {
    fontSize: 12,
    color: colors.text,
    marginTop: 5
  },
  note: {
    padding: 20,
    fontSize: 12,
    textAlign: 'left',
    color: colors.unimportantText
  }

});
