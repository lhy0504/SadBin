export const modes = [
  // this is the parent or 'item'
  {
    name: '🧸 Comforting',
    id: 'Comforting',
  },
  {
    name: '💪 Cheerful',
    id: 'Cheerful',
  },
  {
    name: '🤡 Humorous',
    id: 'Humorous',
  },
  {
    name: '🧑‍⚖️ Judging',
    id: 'Judging',
  },
  {
    name: '🤬 Rude',
    id: 'Rude',
  },
  {
    name: '🧑‍✈️ Angry busdriver',
    id: 'Angry busdriver',
  },
  {
    name: '-- Skip For Now --',
    id: 'skip',
  },




];

export function findEmojiByid(id:string):string{
  const emoji = modes.find((modes) => modes.id === id);
  if(emoji){
    return emoji.name.slice(0,2);
  }
  return id;
}