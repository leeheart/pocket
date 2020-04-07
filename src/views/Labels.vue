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
  import tagListModel from '@/models/tagListModel';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button}
  })
  export default class Labels extends Vue {
    tags = window.tagList;

    createTag() {
      const name = window.prompt('请输入标签名：');
      window.createTag(name);
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
