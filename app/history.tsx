import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { getAllPostsFromStorage } from '../utils/AppStorage';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { findEmojiByid } from '../constants/Modes';

export default function TabTwoScreen() {
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
        renderItem={({item})=>(<PostEntryView post={item}/>)} />
    </View>
  );
}
const PostEntryView=(props)=> {
  const item = props.post
  const router = useRouter()
  return (
    <TouchableOpacity onPress={() =>{ router.push({
      pathname: "modal", params: {
        id:props.post.id
      }
    })

    }}>
      <View style={styles.post}>
        <Text style={styles.date}>{dayjs(item.date).format("D MMM")}</Text>
        <Text style={styles.emotion}>{item.emotion}</Text>
        <Text>{item.content}</Text>
        {
        item.aiReplies?.length>0 ?
         <Text style={styles.date}>{`View ${item.aiReplies?.length} replies`} </Text>
        :<></>
        }
      </View>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listStyle: {
    flex: 1,
    width: '100%',
    // backgroundColor: '#ccc'
  },
  post: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderBottomColor:'#ccc',
    borderBottomWidth:1,
  },
  mode: {
    color: 'gray',
    fontWeight: '300',

  },
  date: {
    color: 'gray',
    fontWeight: '300'
  },
  emotion: {
    fontWeight: '500'
  }
});
