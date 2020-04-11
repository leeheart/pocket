<template>
  <Layout>
    <Tabs :data-source="recordTypeList" :selection.sync="type" class-prefix="types"/>
    <Tabs :data-source="intervalList" :selection.sync="interval" class-prefix="interval"/>
    <ol>
      <li v-for="(group, name) in result" :key="name">
        <h3 class="title">
          {{name}}
        </h3>
        <ol>
          <li class="record" v-for="(item, index) in group" :key="index">
            <span class="tag">{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span class="money">￥{{item.amount}}33333333333</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<style lang="scss" scoped>
  %item{
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    @extend %item;
  }
  .record {
    background: #fff;
    @extend %item;
    .tag{
      width: 20%;
    }
    .notes{
      flex-grow: 1;
      margin-right: 8px;
      margin-left: 8px;
    }
    .money{
      width: 20%;
      text-align: right;
      overflow: auto;
    }
  }
</style>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    type = '-';
    interval = 'day';
    intervalList = intervalList;
    recordTypeList = recordTypeList;

    tagString(tags: string[]){
      return tags.join(',') || '无标签'
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get result() {
      const {recordList} = this;
      const hashTable: { [key: string]: RecordItem[] } = {};
      for (let i = 0; i < recordList.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const [date] = recordList[i].createAt!.split('T');
        hashTable[date] = hashTable[date] || [];
        hashTable[date].push(recordList[i]);
      }
      return hashTable;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep {
    .types-tabs-item {
      background: #fff;

      &.selected {
        background: #c4c4c4;

        &::after {
          display: none;
        }
      }
    }

    .interval-tabs-item {
      height: 48px;
    }
  }
</style>
