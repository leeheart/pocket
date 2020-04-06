<template>
  <button class="button" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Button extends Vue {

  }
</script>

<style lang="scss" scoped>
  .button {
    border: none;
    background: #767676;
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