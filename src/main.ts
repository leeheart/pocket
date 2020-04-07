import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

window.tagList = tagListModel.fetch();
window.findTag = (id: string)=>{
  console.log('find了');
  return window.tagList.filter(item => item.id === id)[0];
};
window.createTag = (name) => {
  if (name) {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
      window.alert('标签已存在');
    }
  } else if (name === '') {
    window.alert('标签名不可为空');
  }
};
window.removeTag = (id: string) => {
  return tagListModel.remove(id);
};
window.updateTag = (id: string, name: string) => {
  return tagListModel.update(id, name);
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
