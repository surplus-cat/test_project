<template>
  <div>
    <div
      class="case"
      @click.stop="open(idx)"
      :style="{ 'z-index': zIndex - idx }">
      {{ ele.value1.label }}
      <div class="hideBox" v-show="ele.state1">
        <input type="text" @input="filt" placeholder="搜索" />
        <ul>
          <li
            v-for="elem in options_backup"
            :key="elem.value"
            :class="{ active: ele.value1.label === elem.label }"
            @click.stop="select(elem, idx)">
            {{ elem.label }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    zIndex: {
      type: Number,
      default: 2000
    },
    source: {
      type: Array,
      default: function() {
        return []
      }
    },
    ele: {
      type: Object,
      default: function() {
        return {}
      }
    },
    idx: {
      type: Number,
      default: 0
    },
    options1: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      options_backup: []
    };
  },
  computed: {

  },
  created() {

  },
  mounted() {
    this.options_backup = this.options1.slice(0);
  },
  watch: {

  },
  methods: {
    open(idx) {
      this.$emit("unfold", this.source, idx)
      this.options_backup = this.options1.slice(0);
    },
    filt(e) {
      // e.data 表示当前输入的内容
      if (e.data === null && e.target.value === "") {
        this.options_backup = this.options1.slice(0);
      } else {
        let arr = this.options1.slice(0);
        this.options_backup = arr.filter(v => v.label.includes(e.data));
      }
    },
    select(item, idx) {
      this.$emit("elect", this.source, item, idx);
    },
  },
  components: {

  },
};
</script>

<style scoped lang="less">
.case {
  width: 160px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #fff;
  position: relative;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  margin: 5px 10px 0;

  .hideBox {
    width: 162px;
    position: absolute;
    left: -1;
    top: 30px;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #ccc;
  }

  input {
    width: 160px;
    padding-left: 8px;
    height: 30px;
    outline: none;
    border: none;
    line-height: 20px;
    min-width: 60px;
    font-size: 14px;
    transition: background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    color: #212121;
    border-radius: 3px;
    box-shadow: none;
    background-color: #fff;
    vertical-align: middle;
    box-sizing: border-box;
  }

  ul {
    width: 160px;
    background-color: #fff;
    margin-top: 2px;
  }

  li {
    width: 160px;
    height: 30px;
    padding-left: 20px;
    line-height: 30px;
    text-align: left;
    box-sizing: border-box;
    color: #000;
    list-style: none;
    cursor: pointer;

    &:hover {
      background-color: #ccc;
    }

    &.active {
      background-color: pink;
    }
  }
}
</style>
