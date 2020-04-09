<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <Icon class="rightIcon" name="confirm" @click="submit"/>
    </div>
    <div class="form-wrapper">
      <FormItem @update:value="onUpdateValue" :value="currentTag.name" field-name="标签名" place-holder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button class="button" @click="removeTag">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabel extends Vue {
    get currentTag() {
      return this.$store.state.currentTag;
    }
    newTagName?: string = undefined;

    created() {
      this.$store.commit('fetchTags');
      this.$store.commit('setCurrentTag', this.$route.params.id);
      this.newTagName = this.currentTag.name;
      if (!this.currentTag) {
        this.$router.replace('/404');
      }
    }
    onUpdateValue(name: string){
      this.newTagName = name;
    }
    submit() {
      if (this.newTagName === this.currentTag.name) {
        this.$router.back();
      } else if (this.newTagName === '') {
        window.alert('标签名不可为空');
      } else{
        this.$store.commit('updateTag', {id: this.currentTag.id, name: this.newTagName});
      }
    }
    removeTag() {
      const message = window.confirm('确定删除此标签？');
      if (message) {
        if (this.currentTag) {
          this.$store.commit('removeTag', this.currentTag.id);
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