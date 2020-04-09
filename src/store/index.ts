import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);

type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
  x?: number;
}

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
    x: undefined
  } as RootState,
  mutations: {
    setX(state){
      state.x = 1
    },
    setCurrentTag(state, id){
      state.currentTag = state.tagList.filter(item => item.id === id)[0];
    },
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
        router.back();
      }else{
        window.alert('删除失败')
      }
    },
    updateTag(state, payload: {id: string; name: string}) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if(idList.indexOf(id)>=0){
        const nameList = state.tagList.map(item => item.name);
        if(nameList.indexOf(name)>=0){
          window.alert('标签名已存在');
        }else{
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
          router.back();
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
});

export default store;

