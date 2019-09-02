<template>
  <div id="app">
    <div class="top"></div>
    <div class="middle"></div>
    <div class="tableBox">
      <h4 class="title">标题</h4>
      <my-table class="ctable" :table-data="tableData" :col-configs="colConfigs" height="100%" />
    </div>
    <!--  -->
  </div>
</template>

<script>
import myTable from "../components/my-table.vue";
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      colConfigs: [
        { prop: "date", label: "日期" },
        { prop: "name", label: "姓名" },
        { prop: "address", label: "地址" }
      ],
      tableData: [],
      pageSize: 300,
      pageNo: 1
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    query() {
      const params = {
        pageSize: this.pageSize,
        pageNo: this.pageNo
      };
      axios
        .post(
          "https://www.easy-mock.com/mock/5d69c9599da4252067f6c57f/example/query",
          params
        )
        .then(res => {
          this.tableData = res.data.data;
        });
    }
  },
  components: {
    myTable
  }
};
</script>

<style lang="less" scoped>
.top {
  height: 100px;
}
.middle {
  background-color: blueviolet;
  height: 200px;
}
.tableBox {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  .title {
    background-color: #0f2;
    line-height: 50px;
  }
  .ctable {
    flex: 1;
  }
}

</style>
