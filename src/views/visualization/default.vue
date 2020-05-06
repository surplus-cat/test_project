<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="销售看板" name="first">销售看板</el-tab-pane>
      <el-tab-pane label="客户看板" name="second">客户看板</el-tab-pane>
      <el-tab-pane label="业务员看板" name="third">业务员看板</el-tab-pane>
      <el-tab-pane label="待付款看板" name="fourth">待付款看板</el-tab-pane>
      <el-tab-pane label="购物车看板" name="fifth">购物车看板</el-tab-pane>
    </el-tabs>
    <div class="content">

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: ''
    };
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};

</script>
<style lang="less" scoped>
/deep/ .el-tabs__header {
  background-color: #08152A;

  .el-tabs__item {
    color: rgba(255,255,255,0.65);
  }
}

.content {
  margin: 0 24px;
}
</style>
