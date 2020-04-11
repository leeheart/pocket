import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordStore =  {
  recordList: [] as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(localStorage.getItem(localStorageKeyName) || '[]');
    return this.recordList;
  },
  createRecord(record: RecordItem) {
    const record2 = clone(record);
    record2.createAt = new Date().toISOString();
    this.recordList && this.recordList.push(record2);
    this.saveRecords();
  },
  saveRecords() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  }
};

recordStore.fetchRecords();

export default recordStore;