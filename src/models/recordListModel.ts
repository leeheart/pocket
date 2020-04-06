import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  fetch() {
    this.data = JSON.parse(localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  create(record: RecordItem){
    const record2 = clone(record);
    record2.createAt = new Date();
    this.data.push(record2);
    this.save();
  },
  save() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};

export default recordListModel;