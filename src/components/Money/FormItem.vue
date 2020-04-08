<template>
  <label class="formItem">
    <span class="name">{{fieldName}}</span>
    <input :value="value" :placeholder="placeHolder" type="text" @input="onValueChanged($event.target.value)"/>
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue {
    @Prop({default: ''}) readonly value!: string;
    @Prop({required: true}) fieldName!: string;
    @Prop() placeHolder?: string;

    onValueChanged(value: string) {
      this.$emit('update:value', value);
    }
  }
</script>

<style lang="scss" scoped>
  .formItem {
    display: flex;
    padding-left: 16px;
    align-items: center;

    > .name {
      padding-right: 16px;
    }

    > input {
      flex-grow: 1;
      height: 40px;
      border: none;
      background: transparent;
      padding-right: 16px;
    }
  }
</style>