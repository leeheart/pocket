<template>
  <div class="tabs-wrapper">
    <ul class="tabs">
      <li v-for="(item, index) in dataSource" :key="index"
          :class="liClass(item)"
          class="tabs-item"
          @click="select(item)">{{item.text}}</li>
    </ul>
  </div>
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
    readonly selection!: string;
    @Prop(String)
    readonly classPrefix?: string;

    liClass(item: DataSourceItem){
      return {
        selected: item.value === this.selection,
        [this.classPrefix+'-tabs-item']: this.classPrefix
      }
    }

    select(item: DataSourceItem){
      this.$emit('update:selection', item.value)
    }
  }
</script>

<style lang="scss" scoped>
  .tabs-wrapper{
    padding: 12px 64px;
    background: #2ECC71;
  }
  .tabs {
    border: 1px solid black;
    border-radius: 6px;
    display: flex;
    font-size: 20px;
    overflow: hidden;

    &-item {
      width: 50%;
      height: 38px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      color: #fff;

      &.selected{
        background: #34495E;
      }

      /*&.selected::after {*/
      /*  content: '';*/
      /*  display: block;*/
      /*  height: 4px;*/
      /*  background: #3498DB;*/
      /*  position: absolute;*/
      /*  bottom: 0;*/
      /*  left: 0;*/
      /*  width: 100%;*/
      /*}*/
    }
  }
</style>