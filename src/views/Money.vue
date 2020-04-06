<template>
  <layout class-prefix="layout">
    <Tags @update:value="onUpdateTags" :tag-source.sync="tags"/>
    <div class="notes">
      <FormItem place-holder="请输入备注" field-name="备注" @update:value="onUpdateNotes"/>
    </div>
    <Types :value.sync="record.type"/>
    <NumberPad :type="record.type" @update:value="onUpdateAmount" @submit="saveRecord"/>
  </layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tags from '@/components/Money/Tags.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Types from '@/components/Money/Types.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import {Component, Watch} from 'vue-property-decorator';
  import recordListModel from '@/models/recordListModel';
  import tagListModel from '@/models/tagListModel';

  @Component({
    components: {NumberPad, Types, FormItem, Tags}
  })
  export default class Money extends Vue {
    tags = tagListModel.fetch();
    recordList = recordListModel.fetch();
    record: RecordItem = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0
    };

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value);
    }

    saveRecord() {
      const record2 = recordListModel.clone(this.record);
      record2.createAt = new Date();
      this.recordList.push(record2);
    }

    @Watch('recordList')
    onRecordChange() {
      recordListModel.save(this.recordList);
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column;
  }
  .notes{
    padding: 12px 0;
    font-size: 14px;
  }
</style>