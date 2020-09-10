<template>
  <div>
    <el-input style="width: 100px;" v-model="filterName" @input="filt($event)" size="mini" />
    <div ref="list"
      class="infinite-list-container"
      @scroll="scrollEvent($event)">
      <div
        class="positionDiv">
        <label class="el-checkbox" :class="{ 'is-checked': checkedNames.length === listData_.length }">
          <span class="el-checkbox__input" :class="{ isDetermine: checkedNames.length > 0 && checkedNames.length < listData_.length, 'is-checked': checkedNames.length === listData_.length}">
            <span class="el-checkbox__inner"></span>
            <input type="checkbox" id="全选" class="el-checkbox__original" value="全选" v-model="isChecked" @change="allCheck"></span>
          <span class="el-checkbox__label">全选</span>
        </label>
      </div>
      <!-- <span>test {{screenHeight}}px</span> -->
      <div class="infinite-list-phantom"
        :style="{ height: listHeight + 'px' }"></div>
      <div class="infinite-list"
        :style="{ transform: getTransform }">
        <div ref="items"
          class="infinite-list-item"
          v-for="item in visibleData"
          :key="item.id"
          :style="{ height: itemSize + 'px',lineHeight: itemSize + 'px' }">
          <label class="el-checkbox" :for="item.value" :class="{ 'is-checked': checkedNames.includes(item.value) }">
            <span class="el-checkbox__input" :class="{ 'is-checked': checkedNames.includes(item.value) }">
              <span class="el-checkbox__inner"></span>
              <input type="checkbox" :id="item.value" class="el-checkbox__original" :value="item.value" v-model="checkedNames" @change="check(item)"></span>
            <span class="el-checkbox__label">{{item.value}}</span>
          </label>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'VirtualList',
  props: {
    //所有列表数据
    listData: {
      type: Array,
      default: () => []
    },
    //每项高度
    itemSize: {
      type: Number,
      default: 200
    },
  },
  computed: {
    //列表总高度
    listHeight() {
      return this.listData.length * this.itemSize;
    },
    //可显示的列表项数
    visibleCount() {
      return Math.ceil(this.screenHeight / this.itemSize)
    },
    //偏移量对应的style
    getTransform() {
      return `translate3d(0,${this.startOffset}px,0)`;
    },
    //获取真实显示列表数据
    visibleData() {
      if (this.filterName === '') {
        return this.listData.slice(this.startIndex, Math.min(this.endIndex, this.listData.length));
      }
      return this.listData.filter(v => v.value.includes(this.filterName)).slice(0, Math.ceil(this.screenHeight / this.itemSize));
    }
  },
  mounted() {
    this.screenHeight = 500 //this.$el.clientHeight;
    this.startIndex = 0;
    this.listData_ = this.listData.slice(0);
    this.endIndex = this.startIndex + this.visibleCount;
    console.log("listData", this.listData)
    console.log("listHeight", this.listHeight)
  },
  data() {
    return {
      //可视区域高度
      screenHeight: 0,
      //偏移量
      startOffset: 0,
      //起始索引
      startIndex: 0,
      //结束索引
      endIndex: null,
      // 选中元素
      checkedNames: [],
      // 是否全选
      isChecked: false,

      filterName: '',

      listData_: []
    };
  },
  methods: {
    scrollEvent() {
      //当前滚动位置
      let scrollTop = this.$refs.list.scrollTop;
      //此时的开始索引
      this.startIndex = Math.floor(scrollTop / this.itemSize);
      //此时的结束索引
      this.endIndex = this.startIndex + this.visibleCount;
      //此时的偏移量
      this.startOffset = scrollTop - (scrollTop % this.itemSize);
    },
    check () {
      if (this.checkedNames.length === this.listData_.length) {
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
    },
    filt(e) {
      // e.data 表示当前输入的内容
      if (e === undefined) {
        this.listData_ = this.listData.filter(v => v);
      } else {
        let arr = this.listData.filter(v => v);
        this.listData_ = arr.filter(v => v.value.includes(e));
      }
    },
    allCheck() {
      if ((this.checkedNames.length > 0 && this.checkedNames.length < this.listData_.length) || this.checkedNames.length === 0) {
        this.checkedNames = this.listData_.map(v => v.value);
        this.isChecked = true;
      } else if (this.checkedNames.length === this.listData_.length) {
        this.checkedNames = [];
        this.isChecked = false;
      }
    },
  }
};
</script>


<style lang="less" scoped>
.infinite-list-container {
  width: 189px;
  height: 500px;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.positionDiv {
  position: absolute;
  left: 0;
  top: 0px;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  /* z-index: 1; */
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: left;
}

.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>
