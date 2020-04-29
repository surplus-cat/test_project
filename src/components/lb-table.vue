<template>
  <div class="ctable">
    <el-table
      :data="tableData"
      :row-class-name="RowClassName"
      :height="height">
      <!--<el-table-column
        v-for="(item,key) in columnsConfig"
        :key="key"
        v-bind="item">

          <template slot-scope="{row}">
            <span>{{ row[column.field] }}</span>
          </template>

        </el-table-column> -->

        <template v-for="(colConfig, index) in columnsConfig">
          <slot v-if="colConfig.slot"
            :name="colConfig.slot" />
          <component
            v-if="colConfig.component"
            :is="colConfig.component"
            :col-config="colConfig"
            :key="index"/>

          <el-table-column
            v-if="colConfig.render"
            v-bind="colConfig"
            :key="index">
            <template slot-scope="scope">
              <div v-html="colConfig.render(scope.row)"></div>
            </template>
          </el-table-column>

          <el-table-column
            v-if="colConfig.prop"
            v-bind="colConfig" :key="index">
          </el-table-column>
      </template>
    </el-table>
    <span class="arrow"
      ref="arrow"
      v-if="isSymbol"></span>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: function () { return []; }
    },
    columnsConfig: {
      type: Array,
      default: function () { return []; }
    },
    isSymbol: {
      type: Boolean,
      default: false
    },
    isRowClick: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  methods: {
    clickRow(row, column, event) {
      if (!this.isRowClick) {
        return false;
      }
      this.$emit('clickrow', row);
      this.tableData.forEach(row => {
        row.isActive = false;
      });
      let index = this.tableData.findIndex(v => v.regionCode === row.regionCode);
      row.isActive = true;
      this.tableData.splice(index, 1, row);
      if (this.isSymbol) {
        let distance = 40; // 初始高度
        if (event) {
          distance = event.clientY - event.offsetY - document.querySelector('.baseTable').offsetTop;
        }
        this.$refs.arrow.style.top = distance + 'px';
      }
    },
    RowClassName({ row }) {
      if (row.isActive) {
        return 'highlight-row';
      }
    }
  }
}
</script>
<style lang="less" scoped>
.ctable {
  position: relative;
  height: 100%;
  border: none;
  .arrow {
    position: absolute;
    top: 0;
    right: -20px;
    display: block;
    width: 0;
    height: 0;
    // border-color: transparent transparent transparent #a3eaff;
    border-style: solid;
    border-width: 8px 7px 7px;
  }
  /deep/ .el-table {
    //overflow-y: scroll;
    background-color: transparent;
    &::before {
      width: 0;
      height: 0 !important;
    }
    // .highlight-row {
    //   background-color: #80f5ff;
    // }
  }
  /deep/ tr {
    // cursor: pointer;
    background-color: transparent;
    border-bottom: 1px solid rgba(255,255,255,0.12);
  }
  /deep/.el-table__header-wrapper {
    td,
    th.is-leaf,
    th {
      padding: 8px 0;
      color: #fff;
      background-color: transparent;
      border: none;
    }
  }
  /deep/.el-table__body-wrapper {
    td,
    th.is-leaf,
    th {
      padding: 6px 0;
      color: rgba(255,255,255,0.85);
      background-color: transparent;
      border: none;
    }
  }
  /deep/ .el-table--border {
    td,
    th {
      // border: none;
    }
  }
  // /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
  //   background-color: rgba(128, 245, 255, 0.6);
  // }
}
</style>
