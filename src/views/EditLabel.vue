<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <Icon class="rightIcon" name="confirm" @click="submit"/>
    </div>
    <div class="form-wrapper">
      <FormItem @update:value="newTagName = $event" :value="tag.name" field-name="标签名" place-holder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button class="button" @click="removeTag">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabel extends Vue {
    tag?: { id: string; name: string };
    newTagName?: string;

    created() {
      const id = this.$route.params.id;
      const tags = tagListModel.fetch();
      const tag = tags.filter(item => item.id === id)[0];
      if (tag) {
        this.tag = tag;
      } else {
        this.$router.replace('/404');
      }
    }

    submit() {
      if (this.newTagName) {
        if (this.tag) {
          if(this.newTagName === this.tag.name){
            this.$router.back();
            return;
          }
          const message = tagListModel.update(this.tag.id, this.newTagName);
          if(message === 'duplicated'){
            window.alert('标签名已存在');
            return;
          }
        }
      }else if(this.newTagName === ''){
        window.alert('标签名不可为空');
        return;
      }
      this.$router.back();
    }

    removeTag() {
      const message = window.confirm('确定删除此标签？');
      if(message){
        if (this.tag) {
          if (tagListModel.remove(this.tag.id)) {
            this.$router.back();
          }
        }
      }
    }

    goBack() {
      this.$router.back();
    }
  }
</script>

<style lang="scss" scoped>
  .navBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    font-size: 16px;
    background: #fff;

    > .leftIcon {
      width: 24px;
      height: 24px;
    }

    > .rightIcon {
      width: 24px;
      height: 24px;
    }
  }

  .form-wrapper {
    background: #fff;
    margin-top: 16px;
    font-size: 16px;
  }

  .button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;

    > .button {
      background: #E74C3C;
    }
  }
</style>