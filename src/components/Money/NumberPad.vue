<template>
  <div class="numberPad">
    <div class="output"><span class="rmb">￥</span>{{output}}</div>
    <div class="buttons">
      <div class="button" @click="inputContent">1</div>
      <div class="button" @click="inputContent">2</div>
      <div class="button" @click="inputContent">3</div>
      <div class="button" @click="deleteNumber">
        <Icon name="backspace"/>
      </div>
      <div class="button" @click="inputContent">4</div>
      <div class="button" @click="inputContent">5</div>
      <div class="button" @click="inputContent">6</div>
      <div class="button" @click="clear">清零</div>
      <div class="button" @click="inputContent">7</div>
      <div class="button" @click="inputContent">8</div>
      <div class="button" @click="inputContent">9</div>
      <div class="button ok" @click="ok">OK</div>
      <div class="button zero" @click="inputContent">0</div>
      <div class="button" @click="inputContent">.</div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue {
    output = '0';
    @Prop({type: Array, required: true}) readonly selectedTags!: string[];

    inputContent(e: MouseEvent) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const input = (e.target as HTMLButtonElement).textContent!;
      if (this.output === '0') {
        if (input === '.') {
          this.output += input;
        } else {
          this.output = input;
        }
        return;
      }
      if (this.output.indexOf('.') >= 0) {
        const dotIndex = this.output.indexOf('.');
        const afterDotLength = this.output.substr(dotIndex + 1).length;
        if (input === '.') {return;}
        if (afterDotLength >= 2) {return;}
      }
      if (this.output.length === 16) {
        return;
      }
      this.output += input;
    }

    clear() {
      this.output = '0';
    }

    deleteNumber() {
      if (this.output.length === 1) {
        this.output = '0';
        return;
      }
      this.output = this.output.slice(0, -1);
    }

    ok() {
      if (this.selectedTags.length === 0) {
        window.alert('需至少选择一个标签');
        return;
      }
      if (this.output === '0') {
        window.alert('请输入金额');
        return;
      }
      this.$emit('update:value', this.output);
      this.$emit('submit', this.output);
      this.output = '0';
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .numberPad {
    > .output {
      @extend %innerShadow;
      font-size: 36px;
      font-family: Consolas, monospace;
      text-align: right;
      padding: 9px 16px;
      height: 72px;

      > .rmb {
        font-family: $font-hei;
      }
    }

    > .buttons {
      @extend %clearFix;
      $bg: #f2f2f2;

      > .button {
        text-align: center;
        width: 25%;
        height: 64px;
        line-height: 64px;
        float: left;
        font-size: 20px;
        border: 1px solid #fff;
        background: #F5F5F5;

        &.ok {
          height: 64*2px;
          line-height: 64*2px;
          float: right;
          background: #2ECC71;
          color: #fff;
        }

        &.zero {
          width: 25*2%;
        }

        &:nth-child(4) > svg {
          font-size: 24px;
        }
      }
    }
  }
</style>