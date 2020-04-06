type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  save: () => void;
  create: (name: string) => 'success' | 'duplicated';
  update: (id: string, newName: string) => 'not found' | 'duplicated' | 'success';
  remove: (id: string) => boolean;
}
const localStorageKeyName = 'tagList';
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  save() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  update(id, newName){
    const idList = this.data.map(item => item.id);
    if(idList.indexOf(id)>=0){
      const nameList = this.data.map(item => item.name);
      if(nameList.indexOf(newName)>=0){
        return 'duplicated';
      }else{
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = newName;
        this.save();
        return 'success';
      }
    }else{
      return 'not found'
    }
  },
  create(name){
    const nameList = this.data.map(item => item.name);
    if(nameList.indexOf(name)>=0){return 'duplicated';}
    this.data.push({id: name, name: name});
    this.save();
    return 'success';
  },
  remove(id){
    const idList = this.data.map(item => item.id);
    if(idList.indexOf(id)>=0){
      const tag = this.data.filter(item => item.id === id)[0];
      const index = this.data.indexOf(tag);
      this.data.splice(index, 1);
      this.save();
      return true;
    }else{
      return false;
    }
  }
};

export default tagListModel;