<template>
  <div class="poper">
    <span class="showText" v-show="!show" @click="toggle"></span>
    <div class="poperBox" v-show="show" @click="prevent">
      <el-input v-model="filterName" @input="filt"></el-input>
      <ul>
        <li>
          <input type="checkbox" id="全选" value="全选" v-model="isChecked" @change="allCheck">
          <label for="全选">全选</label>
        </li>
        <li v-for="(item, idx) in list_" :key="idx">
          <input type="checkbox" :id="item" :value="item" @change="check(item)">
          <label :for="item">{{item}}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterName: '',
      checkedNames: [],
      isChecked: false,
      list: ['jack', 'john', 'Mike'],
      show: false,
      list_: []
    };
  },
  components: {},
  computed: {},
  mounted() {
    document.addEventListener("click", this.shutup);
    this.list_ = this.list.slice(0)
  },
  beforeDestroy() {
    document.removeEventListener("click", this.shutup);
  },
  methods: {
    filt(e) {
      // e.data 表示当前输入的内容
      if (e.data === null && e.target.value === "") {
        this.list_ = this.list.slice(0);
      } else {
        let arr = this.list.slice(0);
        this.list_ = arr.filter(v => v.includes(e.data));
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
        this.checkedNames = this.list.slice(0);
      } else {
        this.checkedNames = [];
      }
    },
    check(item) {
      if (this.checkedNames.includes(item)) {
        this.checkedNames = this.checkedNames.filter(v => v !== item);
      } else {
        this.checkedNames.push(item);
      }
      if (this.checkedNames.length === this.list.length) {
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
  display: block;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.poper {
  position: relative;
  flex: 1;
  margin-left: 20px;
}
.poperBox {
  position: absolute;
  right: 0;
  background-color: #fff;
}
</style>
