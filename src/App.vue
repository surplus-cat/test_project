<template>
  <div id="app">
    <div class="top"></div>
    <div class="middle"></div>
    <div class="tableBox">
      <myTable :data="tableData" :colConfigs="colConfigs" height="100%" />
    </div>
    <!--  -->
  </div>
</template>

<script>
import myTable from "./components/my-table.vue";
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

<style lang="less">
body {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: aquamarine;
  display: flex;
  flex-direction: column;
}
.top {
  height: 100px;
}
.middle {
  background-color: blueviolet;
  height: 200px;
}
.tableBox {
  flex: 1;
  overflow: hidden;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  &-track {
    // background: #aaa;
  }
  &-corner {
    background: inherit;
  }
  &-thumb {
    background: rgb(220, 220, 220);
    border-radius: 4px;
    &:hover {
      background: rgb(184, 184, 184);
    }
  }
}
</style>
