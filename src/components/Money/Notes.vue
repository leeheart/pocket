<template>
  <label class="notes">
    <span class="name">备注</span>
    <input placeholder="在这里输入备注" type="text" v-model="value"/>
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue{
    value = '';
  }
</script>

<style lang="scss" scoped>
  .notes {
    background: #f5f5f5;
    display: flex;
    font-size: 14px;
    padding-left: 16px;
    align-items: center;

    > .name {
      padding-right: 16px;
    }

    > input {
      flex-grow: 1;
      height: 64px;
      border: none;
      background: transparent;
      padding-right: 16px;
    }
  }
</style>