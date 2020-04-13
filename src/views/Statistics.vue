<template>
  <Layout>
    <Tabs :data-source="recordTypeList" :selection.sync="type" class-prefix="types"/>
    <ol>
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          {{beautify(group.title)}}
          <span>{{type}}￥{{group.total}}</span>
        </h3>
        <ol>
          <li class="record" v-for="(item, index) in group.items" :key="index">
            <span class="tag">{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span class="money">￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div class="emptyNote" v-if="groupedList.length===0">暂无记录</div>
  </Layout>
</template>


<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    type = '-';
    recordTypeList = recordTypeList;

    beautify(date: string) {
      const day = dayjs(date);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else {
        return day.format('YYYY年M月D日');
      }
    }

    tagString(tags: string[]) {
      return tags.join(',') || '无标签';
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      const {recordList} = this;
      const sortedList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
      if (sortedList.length === 0) {return [] as Result;}
      type Result = { title: string; items: RecordItem[]; total?: number }[];
      const result: Result = [{title: dayjs(sortedList[0].createAt).format('YYYY-MM-DD'), items: [sortedList[0]]}];
      for (let i = 1; i < sortedList.length; i++) {
        const current = sortedList[i];
        const last = result[result.length - 1];
        if (dayjs(current.createAt).isSame(dayjs(last.title), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.forEach(group => {
        group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
      });
      return result;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }
  }
</script>

<style lang="scss" scoped>
  %item {
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

    .tag {
      width: 30%;
      overflow: auto;
    }

    .notes {
      flex-grow: 1;
      margin-right: 8px;
      margin-left: 8px;
    }

    .money {
      width: 20%;
      text-align: right;
      overflow: auto;
    }
  }

  .emptyNote {
    font-size: 20px;
    text-align: center;
    margin-top: 36px;
    color: rgba(0, 0, 0, 0.5);
  }
</style>
