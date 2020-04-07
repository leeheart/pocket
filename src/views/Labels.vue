<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" :to="`/labels/edit/${tag.id}`" v-for="(tag, index) in tags" :key="index">
        <span>{{tag.name}}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import store from '@/store/index2';

  @Component({
    components: {Button}
  })
  export default class Labels extends Vue {
    tags = store.tagList;

    createTag() {
      const name = window.prompt('请输入标签名：');
      store.createTag(name);
    }

  }
</script>

<style lang="scss" scoped>
  .tags {
    background: white;
    padding: 0 16px;
    font-size: 18px;

    > .tag {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;

      svg {
        color: #666;
      }
    }
  }

  .createTag {
    border: none;
    background: #3498DB;
    color: #fff;
    border-radius: 4px;
    height: 40px;
    padding: 0 16px;

    &-wrapper {
      text-align: center;
      margin-top: 28px;
      padding: 16px;
    }
  }
</style>
