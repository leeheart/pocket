<template>
  <div class="nav-wrapper">
    <div class="content">
      statistics
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Statistics',
  };
</script>

<style lang="scss" scoped>
  .nav-wrapper{
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .content {
    border: 1px solid green;
    flex-grow: 1;
    overflow: auto;
  }
</style>