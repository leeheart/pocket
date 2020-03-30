<template>
  <nav>
    <router-link class="item" to="/money" active-class="selected">
      <Icon name="#money"/>
      记账
    </router-link>
    <router-link class="item" to="/labels" active-class="selected">
      <Icon name="#label" />
      标签
    </router-link>
    <router-link class="item" to="/statistics" active-class="selected">
      <Icon name="#statistics" />
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
  export default {
    name: 'Nav'
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";
  nav{
    @extend %outerShadow;
    display: flex;
    font-size: 12px;
    > .item {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2px 0;
      transition: all 0.5s linear;
      > .icon{
        width: 32px;
        height: 32px;
      }
    }
    > .item.selected{
      color: red;
    }
  }
</style>