<template>
  <layout class-prefix="layout">
    <Tabs :data-source="recordTypeList" :selection.sync="record.type"/>
    <Tags :selected-tags.sync="record.tags"/>
    <div class="notes">
      <FormItem :value.sync="record.notes" place-holder="请输入备注" field-name="备注"/>
    </div>
    <NumberPad :selected-tags="this.record.tags" @update:value="onUpdateAmount" @submit="saveRecord"/>
  </layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tags from '@/components/Money/Tags.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({
    components: {Tabs, NumberPad, FormItem, Tags},

  })
  export default class Money extends Vue {
    record: RecordItem = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0
    };

    recordTypeList = recordTypeList;

    get recordList(){
      return this.$store.state.recordList;
    }

    created(){
      this.$store.commit('fetchRecords');
    }

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value);
    }

    saveRecord() {
      this.$store.commit('createRecord', this.record);
      window.alert('保存成功');
      this.record.notes = '';
      this.record.tags = [];
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .layout-content {
    display: flex;
    flex-direction: column;
  }
  .notes{
    padding: 12px 0;
    font-size: 14px;
  }
</style>