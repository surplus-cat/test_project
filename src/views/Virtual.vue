<template>
  <div class="wrap">
    <div class="VirtualList"
      :style="{height: windowH +'px', width:windowW +'px'}">
      <VirtualList
        ref="virtual"
        :listData="listData"
        :itemSize="40" />

    </div>
  </div>
</template>

<script>
import VirtualList from "../components/VirtualList.vue";
let listData = [];
for (let i = 0; i < 50000; i++) {
  listData.push({ id: i, value: `哈尼哟沙拉油${i}` });
}
export default {
  name: 'app',
  data() {
    return {
      listData: listData,
    };
  },
  computed: {
    windowW() {
      return document.documentElement.clientWidth
    },
    windowH() {
      return document.documentElement.clientHeight * 0.8
    },
  },
  components: {
    VirtualList
  }
};
</script>

<style lang="less" scoped>
.wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.VirtualList {
  // display: flex;
  /* justify-content: center; */
  width: 80%;
  height: 90%;
  margin-top: 50px;
  /deep/ .infinite-list-container {
    margin-left: 10px;
  }
}
#app {
  height: 100%;
  width: 100%;
}
</style>
