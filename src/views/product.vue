<template>
  <div>
    <div class="el-select_box">
      <div>
        <span>
          <span v-if="selected.length > 0">{{options.find(v => v.value === [selected[0]])}}</span>
        </span>
        <el-input class="el-inputs" v-model="text" @focus="visible = true" @input="input" v-clickoutside="handleClose" />
      </div>
      <div class="el-select-hiddenBox" v-show="visible">
        <ul>
          <li v-for="item in options_"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :class="{ 'selected': selected.includes(item.value) }"
            @click="choose(item)">
            {{ item.label }}
          </li>
        </ul>
        <p v-show="visible && this.options_.length === 0">
          无匹配数据
        </p>
      </div>

    </div>
    <!--  -->
  </div>
</template>

<script>
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
        // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
          // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
     // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
};
import { func } from '@/util'
export default {
  name: "app",
  data() {
    return {
      visible: false,
      text: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      options_: [],
      selected: []
    };
  },
  mounted() {
    this.options_ = this.options.slice(0);
  },
  directives: {clickoutside},
  methods: {
    handleClose(e) {
      this.visible = false;
    },
    choose(item) {
      if (this.selected.includes(item.value)) {
        this.selected = this.selected.filter(v => v !== item.value);
      } else {
        this.selected.push(item.value);
      }
    },
    input(value) {
      func.debounce(() => {
        console.log(value)
        this.options_ = this.options_.filter(v => v.label.includes(value));
        if (value === '') {
          this.options_ = this.options;
        }
      }, 1000)
    }
  },
};
</script>

<style lang="less" scoped>
.el-select_box {
  width: 300px;
  height: 40px;
  display: inline-block;
  position: relative;
  margin: 0 auto;
  position: relative;

  .el-inputs {

  }

  .el-select-hiddenBox {
    width: 197px;
    max-height: 274px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.06);
    box-sizing: border-box;
    margin: 5px 0;
    position: absolute;
    left: 0;
    top: 40px;

    ul {
      list-style: none;
      padding: 6px 0;
      margin: 0;
      box-sizing: border-box;
    }

    li {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;
      text-align: left;

      &:hover {
        background-color: #f8f9fd;
      }

      &.selected {
        color: #3654ea;
        background-color: #fff;
        font-weight: 700;

        &::after {
          position: absolute;
          right: 20px;
          font-family: element-icons;
          content: "\E6DA";
          font-size: 12px;
          font-weight: 700;
          -webkit-font-smoothing: antialiased;
        }
      }
    }
  }
}

</style>
