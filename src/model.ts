const model = {
  clone(data: RecordItem){
    return JSON.parse(JSON.stringify(data)) as RecordItem;
  },
  fetch() {
    return JSON.parse(localStorage.getItem('recordList') || '[]') as RecordItem[];
  },
  save(data: RecordItem[]) {
    localStorage.setItem('recordList', JSON.stringify(data));
  }
};

export default model;