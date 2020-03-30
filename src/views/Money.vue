<template>
  <layout class-prefix="xxx">
    <div class="tags">
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>

      </ul>
      <div class="new">
        <button>新增标签</button>
      </div>
    </div>
    <div>
      <label class="notes">
        <span class="name">备注</span>
        <input placeholder="在这里输入备注" type="text">
      </label>
    </div>
    <div>
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div>
    <div class="numberPad">
      <div class="output">100</div>
      <div class="buttons">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button class="ok">OK</button>
        <button class="zero">0</button>
        <button>.</button>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
  export default {
    name: 'Money',
  };
</script>

<style lang="scss">
  .xxx-content{
    display: flex;
    flex-direction: column;;
  }
</style>

<style lang="scss" scoped>
  @import '~@/assets/styles/helper.scss';

  .tags {
    font-size: 14px;
    padding: 16px;
    flex-grow: 1;
    overflow: auto;
    display: flex;
    flex-direction: column-reverse;
    > .current {
      order: 1;
      display: flex;
      flex-wrap: wrap;

      > li {
        background: #d9d9d9;
        $h: 24px;
        height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-right: 12px;
        line-height: $h;
        margin-top: 4px;
      }
    }

    > .new {
      padding-top: 16px;

      > button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }

  .notes {
    background: #f5f5f5;
    display: flex;
    font-size: 14px;
    padding-left: 16px;
    align-items: center;

    > .name {
      padding-right: 16px;
    }

    > input {
      flex-grow: 1;
      height: 64px;
      border: none;
      background: transparent;
      padding-right: 16px;
    }
  }

  .types {
    display: flex;
    background: #c4c4c4;
    font-size: 24px;

    > li {
      width: 50%;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &.selected::after {
        content: '';
        display: block;
        height: 4px;
        background: #333;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
      }
    }
  }

  .numberPad {
    > .output {
      @extend %innerShadow;
      font-size: 36px;
      font-family: Consolas, monospace;
      text-align: right;
      padding: 9px 16px;
    }

    > .buttons {
      @extend %clearFix;

      > button {
        width: 25%;
        height: 64px;
        float: left;
        border: none;
        background: none;

        &.ok {
          height: 64*2px;
          float: right;
        }

        &.zero {
          width: 25*2%;
        }

        $bg: #f2f2f2;

        &:nth-child(1) {
          background: $bg;
        }

        &:nth-child(2), &:nth-child(5) {
          background: darken($bg, 4%);
        }

        &:nth-child(3), &:nth-child(6), &:nth-child(9) {
          background: darken($bg, 4*2%);
        }

        &:nth-child(4), &:nth-child(7), &:nth-child(10) {
          background: darken($bg, 4*3%);
        }

        &:nth-child(8), &:nth-child(11), &:nth-child(13) {
          background: darken($bg, 4*4%);
        }

        &:nth-child(14) {
          background: darken($bg, 4*5%);
        }

        &:nth-child(12) {
          background: darken($bg, 4*6%);
        }
      }
    }
  }
</style>