type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  save: () => void;
  create: (name: string) => 'success' | 'duplicated';
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
  create(name){
    const nameList = this.data.map(item => item.name);
    if(nameList.indexOf(name)>=0){return 'duplicated';}
    this.data.push({id: name, name: name});
    this.save();
    return 'success';
  }
};

export default tagListModel;