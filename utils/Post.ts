import dayjs from "dayjs";

interface SerializablePost{
    date: string;
    emotion: string;
    content:string;
    id: string;
    aiReplies:string;
}

export class Post {
    date: Date;
    emotion: string;
    content:string;
    id: string;
    aiReplies:[];

    constructor(){
        this.date = new Date();
        this.emotion = '';
        this.content = '';
        this.id = this.date.getTime().toString();
        this.aiReplies = [];
    }

     getSerializable():string{
        return JSON.stringify({
            date: this.date.toISOString(),
            emotion: this.emotion,
            content: this.content,
            id: this.id,
            aiReplies:this.aiReplies
        })
    }
    static parseSerializable(serializable:string):Post{
        const post = new Post();
        const s = JSON.parse(serializable) as SerializablePost;
        post.date = dayjs(s.date).toDate();
        post.emotion = s.emotion;
        post.content = s.content;
        post.id = s.id;
        post.aiReplies = s.aiReplies;
        return post;
    }
    addReply(mode:string,reply:string){
        this.aiReplies.push({mode:mode,reply:reply})
    }
  }

