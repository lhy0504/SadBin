import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { FlatList } from 'react-native-gesture-handler';
import { getAllPostsFromStorage } from '../utils/AppStorage';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { findEmojiByid } from '../constants/Modes';
import Colors from '../constants/Colors';
import ThemeContext from '../constants/ThemeContext';

export default function TabTwoScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const colors = Colors[theme??'light'];
  const styles = styling(colors);

  const [posts, setPosts] = useState([])
  const { refresh: refresh } = useLocalSearchParams()

  //refresh when we come back to this page
  useEffect(() => {
    getPosts()
  }, [refresh])

  async function getPosts() {
    console.log(refresh)
    let g = await getAllPostsFromStorage()
    setPosts(g)
  }
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listStyle} keyExtractor={item => item.id}
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.unimportant}>{dayjs(item.date).format("D MMM")}</Text>
            <Text style={styles.emotion}>{item.emotion}</Text>
            <Text style={styles.content}>{item.content}</Text>
            {item.aiReplies?.map((reply) => (
              <>
                <Text ><Text style={styles.unimportant} >
                  {findEmojiByid(reply.mode)+' '}
                  </Text>{reply.reply}</Text>
              </>
            )
            )}
          </View>
        )
        } />
    </View>
  );
}

const styling=(colors) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:colors.background
  },
  listStyle: {
    flex: 1,
    width: '100%',
  },
  post: {
    padding: 10,
    margin: 10,
    backgroundColor:colors.background
  },
  unimportant: {
    color:colors.unimportantText,
    fontWeight:'300',
  },
  
  emotion:{
    fontWeight:'500',
    fontweight:'bold',
    color:colors.text
  },
  content:{
    fontWeight:'500',
    color:colors.text
  }
});
