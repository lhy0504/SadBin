import { StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '../../components/Themed';
import { FlatList } from 'react-native-gesture-handler';
import { getAllPostsFromStorage, getIDs } from '../../utils/AppStorage';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { findEmojiByid } from '../../constants/Modes';
import { Entypo } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { Button } from 'react-native-paper';

export default function TabTwoScreen() {
  const [posts, setPosts] = useState([])
  const { refresh: refresh } = useLocalSearchParams()
  const colors = Colors[useColorScheme() ?? 'light'];
  const styles = styling(colors);
  const router = useRouter()
  //refresh when we come back to this page
  useEffect(() => {
    getPosts()
  }, [refresh])

  async function getPosts() {
    let g = await getIDs()
    setPosts(g)
  }
  const skip = () => {
    router.push({
      pathname: "history",
    })
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${posts.length} things have been thrown in the bin~`}</Text>
  
      <Entypo name='trash' size={100} color={colors.unimportantText} />
      <Text style={styles.description}>{"It's ok. They're kept safe and tight in the bin. You are free from them."}</Text>
      <Button mode="contained" onPress={skip} style={styles.btn} >Open your bin</Button>
    </View>
  );
}

const styling = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:30
  },
  title:{
    fontSize:20,
    textAlign:'center',
    marginVertical:20,
    fontWeight:'bold'
  },
  description:{
    textAlign:'center',
    marginVertical:20
  },
  btn: {
    marginTop: 20,
    width: '80%',
  },
});
