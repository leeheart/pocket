<template>
  <div class="tags">
    <ul class="current">
      <li @click="toggle(tag.name)"
          :class="{selected: selectedTags.indexOf(tag.name)>=0}"
          v-for="(tag, index) in tagList" :key="index">{{tag.name}}
      </li>
    </ul>
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Tags extends Vue {
    selectedTags: string[] = [];

    get tagList(){
      return this.$store.state.tagList;
    }

    beforeCreate(){
      this.$store.commit('fetchTags')
    }

    toggle(tag: string) {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:value', this.selectedTags)
    }

    create() {
      const name = window.prompt('请输入标签名称：');
      this.$store.commit('createTag', name);
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    background: #fff;
    font-size: 14px;
    padding: 16px;
    flex-grow: 1;
    overflow: auto;
    display: flex;
    flex-direction: column-reverse;

    > .current {
      order: 1;
      display: flex;
      flex-wrap: wrap;

      > li {
        $bg: #d9d9d9;
        background: $bg;
        $h: 24px;
        height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-right: 12px;
        line-height: $h;
        margin-top: 8px;

        &.selected {
          background: darken($bg, 50%);
          color: #fff;
        }
      }
    }

    > .new {
      padding-top: 16px;

      > button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }
</style>