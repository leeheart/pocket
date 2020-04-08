<template>
  <layout class-prefix="layout">
    <Tags @update:value="onUpdateSelectedTags"/>
    <div class="notes">
      <FormItem place-holder="请输入备注" field-name="备注" @update:value="onUpdateNotes"/>
    </div>
    <Types :value.sync="record.type"/>
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
  </layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tags from '@/components/Money/Tags.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Types from '@/components/Money/Types.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import {Component} from 'vue-property-decorator';


  @Component({
    components: {NumberPad, Types, FormItem, Tags},

  })
  export default class Money extends Vue {
    record: RecordItem = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0
    };

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