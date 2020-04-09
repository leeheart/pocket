<template>
  <ul class="tabs">
    <li v-for="(item, index) in dataSource" :key="index"
        :class="liClass(item)"
        @click="select(item)">{{item.text}}</li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type DataSourceItem = {text: string; value: string};

  @Component
  export default class Tabs extends Vue{
    @Prop({required: true})
    dataSource!: DataSourceItem;
    @Prop(String)
    readonly value!: string;
    @Prop(String)
    readonly classPrefix?: string;

    liClass(item: DataSourceItem){
      return {
        selected: item.value === this.value,
        [this.classPrefix+'-item']: this.classPrefix
      }
    }

    select(item: DataSourceItem){
      this.$emit('update:value', item.value)
    }
  }
</script>

<style lang="scss" scoped>
  .tabs {
    display: flex;
    background: #c4c4c4;
    font-size: 24px;

    > li {
      width: 50%;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &.selected::after {
        content: '';
        display: block;
        height: 4px;
        background: #333;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
      }
    }
  }
</style>