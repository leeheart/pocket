<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name" field-name="标签名" place-holder="请输入标签名" />
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';
  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabel extends Vue {
    tag?: {id: string; name: string};
    created(){
      const id = this.$route.params.id;
      const tags = tagListModel.fetch();
      const tag = tags.filter(item => item.id === id)[0];
      if(tag){
        this.tag = tag;
      }else{
        this.$router.replace('/404');
      }
    }

  }
</script>

<style lang="scss" scoped>
  .navBar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    font-size: 16px;
    background: #fff;
    > .leftIcon{
      width: 24px;
      height: 24px;
    }
    > .rightIcon{
      width: 24px;
      height: 24px;
    }
  }
  .form-wrapper{
    background: #fff;
    margin-top: 16px;
    font-size: 16px;
  }
  .button-wrapper{
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>