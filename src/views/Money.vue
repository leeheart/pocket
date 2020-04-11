<template>
  <layout class-prefix="layout">
    <Tags @update:value="onUpdateSelectedTags"/>
    <div class="notes">
      <FormItem place-holder="请输入备注" field-name="备注" @update:value="onUpdateNotes"/>
    </div>
    <Tabs :data-source="recordTypeList" :selection.sync="record.type"/>
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
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

    onUpdateSelectedTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value);
    }

    saveRecord() {
      this.$store.commit('createRecord', this.record);
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