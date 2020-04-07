import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';

const tagStore =  {
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList;
  },
  findTag(id: string) {
    return this.tagList.filter(item => item.id === id)[0];
  },
  saveTags() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  },
  createTag(name: string | null) {
    const nameList = this.tagList.map(item => item.name);
    if(name){
      if(nameList.indexOf(name)>=0){
        window.alert('标签已存在');
        return 'duplicated';
      }
      const id = createId().toString();
      this.tagList.push({id, name: name});
      this.saveTags();
      return 'success';
    }else if(name === ''){
      window.alert('标签名不可为空');
    }
  },
  removeTag(id: string) {
    const idList = this.tagList.map(item => item.id);
    if(idList.indexOf(id)>=0){
      const tag = this.tagList.filter(item => item.id === id)[0];
      const index = this.tagList.indexOf(tag);
      this.tagList.splice(index, 1);
      this.saveTags();
      return true;
    }else{
      return false;
    }
  },
  updateTag(id: string, name: string) {
    const idList = this.tagList.map(item => item.id);
    if(idList.indexOf(id)>=0){
      const nameList = this.tagList.map(item => item.name);
      if(nameList.indexOf(name)>=0){
        return 'duplicated';
      }else{
        const tag = this.tagList.filter(item => item.id === id)[0];
        tag.name = name;
        this.saveTags();
        return 'success';
      }
    }else{
      return 'not found'
    }
  }
};

tagStore.fetchTags();

export default tagStore;