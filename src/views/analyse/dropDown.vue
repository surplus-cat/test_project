<template>
  <div class="poper" :style="{ 'z-index': Zindex }">
    <span class="showText" @click="toggle" v-text="showText"></span>
    <div class="poperBox" v-show="show" @click="prevent">
      <el-input v-model="filterName" @input="filt" size="mini" placeholder="请输入数据"></el-input>
      <ul>
        <li v-show="filterName === ''">
          <input type="checkbox" class="allCheck" :class="{ isDetermine: checkedNames.length > 0 && checkedNames.length < list_.length }" id="全选" value="全选" v-model="isChecked" @change="allCheck">
          <label for="全选" class="text">全选</label>
        </li>
        <li v-for="(item, idx) in list_" :key="idx">
          <input type="checkbox" :id="item" :value="item" v-model="checkedNames" @change="check(item)">
          <label :for="item" class="text">{{item}}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    source: {
      type: Array,
      default: function() {
        return []
      }
    },
    Zindex: {
      type: Number,
      default: 500
    }
  },
  data () {
    return {
      filterName: '',
      checkedNames: [],
      isChecked: false,
      show: false,
      list_: [],
    };
  },
  components: {},
  computed: {
    showText() {
      if (this.source.length <= 10) {
        if (this.checkedNames.length === this.source.length) {
          return '显示全部';
        } else {
          return `共${this.source.length}条，已选${this.checkedNames.length}条`
        }
      } else {
        return `共${this.source.length}条，已选${this.checkedNames.length}条`
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.shutup);
    this.list_ = this.source.slice(0)
  },
  beforeDestroy() {
    document.removeEventListener("click", this.shutup);
  },
  methods: {
    filt(e) {
      console.log(e);
      // e.data 表示当前输入的内容
      if (e === undefined) {
        this.list_ = this.source.slice(0);
      } else {
        let arr = this.source.slice(0);
        this.list_ = arr.filter(v => v.includes(e));
      }
    },
    toggle(event) {
      event.stopPropagation();
      this.show = !this.show;
    },
    prevent(event) {
      event.stopPropagation();
    },
    allCheck() {
      if (this.isChecked) {
        this.checkedNames = this.list_.slice(0);
      } else {
        this.checkedNames = [];
      }
    },
    check(item) {
      if (this.checkedNames.length === this.list_.length) {
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
    },
    shutup() {
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
@import "./filter";
.showText {
  position: relative;
  display: block;
  height: 32px;
  text-indent: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;

  &::after {
    content: '';
    width: 0;
    height: 0;
    display: block;
    position: absolute;
  }
}
.poper {
  position: relative;
  flex: 1;
  margin-left: 20px;
}
.poperBox {
  position: absolute;
  right: 0;
  top: 38px;
  padding: 14px 16px 26px;
  background-color: #fff;
  box-shadow:0px 2px 12px 0px rgba(48,49,51,0.06);

  &::after {
    content: '';
    width: 0;
    height: 0;
    display: block;
    position: absolute;
    display: inline-block;
    left: 17px;
    top: -2%;
    vertical-align: middle;
    border-bottom: 6px dashed #fff;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
  }

  ul {
    max-height: 240px;
    overflow-y: scroll;
  }

  li {
    line-height: 14px;
    margin-top: 20px;

    .text {
      margin-left: 12px;
    }
  }
}
.isDetermine {
  background-color: #409eff;
  border-color: #409eff;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    display: block;
    background-color: #fff;
    height: 2px;
    transform: scale(.5);
    left: 0;
    right: 0;
    top: 5px;
  }
}
</style>
