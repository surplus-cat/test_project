<template>
  <div>
    <el-table ref="filterTable" :data="tableData" style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
        column-key="date"
      >
      </el-table-column>
      <el-table-column prop="gmv" label="总gmv" width="180" sortable> </el-table-column>
      <el-table-column prop="address" label="接单量"
        :sortable="true"
        :sort-method="(a,b) => sortMethod(a, b)"
        :formatter="formatter">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.tag }}</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          gmv: "￥111,183.11",
          address: "1,221,831.00",
          tag: "家"
        },
        {
          date: "2016-05-04",
          gmv: "￥110,183.00",
          address: "132,331.10",
          tag: "公司"
        },
        {
          date: "2016-05-01",
          gmv: "￥954,103.11",
          address: "218,331.00",
          tag: "家"
        },
        {
          date: "2016-05-03",
          gmv: "￥11,183.11",
          address: "1,223,831.00",
          tag: "公司"
        }
      ]
    };
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address + 'm²';
    },
    sortMethod(a, b) {
      const val1 = a.address.replace(/,/g, '');
      const val2 = b.address.replace(/,/g, '');
      return val1 - val2
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    }
  }
};
</script>
<style lang="less" scoped></style>
