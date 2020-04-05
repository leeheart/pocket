const localStorageKeyName = 'recordList';
const recordListModel = {
  clone(data: RecordItem){
    return JSON.parse(JSON.stringify(data)) as RecordItem;
  },
  fetch() {
    return JSON.parse(localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
  },
  save(data: RecordItem[]) {
    localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  }
};

export default recordListModel;