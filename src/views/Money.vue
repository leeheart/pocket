<template>
  <layout class-prefix="layout">
    <div>{{record.tags}}</div>
    <div>{{record.notes}}</div>
    <div>{{record.type}}</div>
    <div>{{record.amount}}</div>
    <Tags @update:value="onUpdateTags" :tag-source.sync="tags"/>
    <Notes @update:value="onUpdateNotes"/>
    <Types :value.sync="record.type"/>
    <NumberPad @update:value="onUpdateAmount"/>
  </layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tags from '@/components/Money/Tags.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Types from '@/components/Money/Types.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import {Component} from 'vue-property-decorator';

  type Record = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
  }

  @Component({
    components: {NumberPad, Types, Notes, Tags}
  })
  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行'];
    record: Record = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0
    };

    onUpdateTags(value: string[]){
      this.record.tags = value;
    }
    onUpdateNotes(value: string){
      this.record.notes = value;
    }
    onUpdateAmount(value: string){
      this.record.amount = parseFloat(value);
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column;
  }
</style>