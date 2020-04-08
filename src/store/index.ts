import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[]
  },
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(localStorage.getItem('recordList') || '[]');
    },
    createRecord(state, record: RecordItem) {
      const record2 = clone(record);
      record2.createAt = new Date();
      state.recordList.push(record2);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },

    fetchTags(state) {
      state.tagList = JSON.parse(localStorage.getItem('tagList') || '[]');
    },
    findTag(state, id: string) {
      return state.tagList.filter(item => item.id === id)[0];
    },
    saveTags(state) {
      localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    createTag(state, name: string | null) {
      const nameList = state.tagList.map(item => item.name);
      if(name){
        if(nameList.indexOf(name)>=0){
          window.alert('标签已存在');
          return 'duplicated';
        }
        const id = createId().toString();
        state.tagList.push({id, name: name});
        store.commit('saveTags');
        return 'success';
      }else if(name === ''){
        window.alert('标签名不可为空');
      }
    },
    removeTag(state, id: string) {
      const idList = state.tagList.map(item => item.id);
      if(idList.indexOf(id)>=0){
        const tag = state.tagList.filter(item => item.id === id)[0];
        const index = state.tagList.indexOf(tag);
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        return true;
      }else{
        return false;
      }
    }
  },
  actions: {
  },
  modules: {
  }
});

export default store;

