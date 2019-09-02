<template>
  <div id="app">
    <div class="top"></div>
    <div class="middle"></div>
    <div class="tableBox">
      <div class="left"></div>
      <div class="boxer">
        <p class="title">标题</p>
        <my-table class="ctable" :table-data="tableData" :col-configs="colConfigs" height="100%" v-loadmore="loadmore" />
      </div>

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
        { prop: "rank", label: "排名" },
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
    loadmore() {
      this.pageNo++;
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
          this.tableData = this.tableData.concat(res.data.data);
          this.tableData.forEach((v, index) => {
            v.rank = index + 1
          })
        });
    },
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
          this.tableData.forEach((v, index) => {
            v.rank = index + 1
          })
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
  overflow: hidden;
  .left {
    flex: 1;
    background-color: #ff2;
  }
  .boxer {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 2;
  }
  .title {
    background-color: #0f2;
    line-height: 50px;
  }
  .ctable {
    flex: 1;
  }
}

</style>
