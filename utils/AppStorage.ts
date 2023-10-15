import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post, } from './Post';

export async function getPostFromStorage(id: string): Promise<Post> {
  try {
    const data = await AsyncStorage.getItem('@sadbin:' + id);
    if (data !== null) {
      return Post.parseSerializable((data));
    } else {
      return new Post()
    }
  } catch (error) {
    return new Post()
  }
}

export async function savePostToStorage(item: Post) {

  // save the post
  try {
    const jsonValue = (item.getSerializable())
    await AsyncStorage.setItem('@sadbin:' + item.id, jsonValue)
  } catch (e) {
    console.log(e)
  }

  // check if storage has an array of ids, if not, create one
  try {
    const jsonValue = await AsyncStorage.getItem('@sadbin:ids')
    if (jsonValue === null) {
      await AsyncStorage.setItem('@sadbin:ids', JSON.stringify([item.id]))
    } else {
      const ids = JSON.parse(jsonValue)
      if (!ids.includes(item.id)) {
        ids.push(item.id)
        await AsyncStorage.setItem('@sadbin:ids', JSON.stringify(ids))
      }
    }
  } catch (e) {
    console.log(e)
  }

}

export async function getIDs() {
  try {
    const jsonValue = await AsyncStorage.getItem('@sadbin:ids')
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log(e)
  }
}

// function to get all posts from storage
export async function getAllPostsFromStorage(): Promise<Post[]> {
  const ids = await getIDs()

  const posts: Post[] = []
  for (let i = ids.length - 1; i >= 0; i--) {
    const post = await getPostFromStorage(ids[i])
    posts.push(post)
  }

  return posts
}

// function to add a property to a post by id
export async function addPropertyToPost(id: string,mode:string, value: string) {
  try {
    let post :Post= (await getPostFromStorage(id))
    post.addReply(mode,value)

    await AsyncStorage.setItem('@sadbin:' + id, post.getSerializable())
    console.log((await getPostFromStorage(id)).getSerializable())
  } catch (e) {
    console.log(e)
  }
}