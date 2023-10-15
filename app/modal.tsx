import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import dayjs from 'dayjs';
import { findEmojiByid } from '../constants/Modes';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { getPostFromStorage } from '../utils/AppStorage';
import { ScrollView } from 'react-native-gesture-handler';

export default function ModalScreen() {
  const { id: id } = useLocalSearchParams();
  const [item, setPost] = useState(null)

  useEffect(() => {
    getPost()
  }, [id])
  async function getPost() {
    let g = await getPostFromStorage(id)
    setPost(g)
  }
  return item && (
    <View style={styles.outer}>
      <ScrollView style={styles.container}>
        <View style={styles.post}>
          <Text style={styles.date}>{dayjs(item.date).format("D MMM")}</Text>
          <Text style={styles.emotion}>{item.emotion}</Text>
          <Text style={styles.description}>{item.content}</Text>
          {
            item.aiReplies?.map((reply) => (
              <>
                <Text ><Text style={styles.mode} >
                  {findEmojiByid(reply.mode) + ' '}
                </Text>{reply.reply}</Text>
              </>
            )
            )
          }
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outer:{
    flex:1,
  },
  container: {
    flex: 1,

  },
  
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  post: {
    padding: 20,

  },
  mode: {
    color: 'gray',
    fontWeight: '300',

  },
  date: {
    color: 'gray',
    fontWeight: '300',
    paddingVertical:10,
    fontSize:20
  },
  emotion: {
    fontWeight: '500',
    fontSize:26,
    paddingBottom:10,
  },
  description:{
    paddingBottom:20
  }
});
