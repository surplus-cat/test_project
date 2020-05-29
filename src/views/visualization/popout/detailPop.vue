<template>
  <el-dialog
    custom-class="resultDialog"
    :visible.sync="dislogState"
    :has-footer="false"
    :title="dataObj.title"
    @close="close">
    <div class="vessel">
      <div class="filtrateBox">
        <span class="">订单状态</span>
        <el-select class="statusBox" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input
          class="input_box"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="input2">
        </el-input>
      </div>
      <lb-table
        class="btable"
        ref="baseTable"
        :data="dataObj.tableData"
        :column="colConfigs">
      </lb-table>
    </div>
  </el-dialog>
</template>

<script>
import LbTable from '@/components/lb-table/lb-table';

export default {
  props: {
    dataObj: {
      type: Object,
      default: function() {
        return {
          title: '',
          tableData: [],
          colConfigsNum: 0 // 对应colConfigs的序号
        }
      }
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isWhether: true,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      input2: '',
      tableData: [],
      colConfigs: [
        {
          label: '订单号',
          width: '140px',
          render: (h, scope) => {
            return (
              !scope.row.orderNumber
                ? <span>{scope.row.orderNumber}</span>
                : <span class="count" on-click={() => this.open(scope.row.orderNumber) } >{scope.row.orderNumber}</span>
            )
          }
        },
        {
          prop: 'paytime',
          label: '支付时间',
        },
        {
          prop: 'size',
          label: '落料规格',
        },
        { prop: 'gmv', label: 'GMV' },
        { prop: 'saleAmount', label: '接单量' },
      ],
      colConfigs2: [
        { prop: 'orderNumber', label: '订单号', width: '140px' },
        {
          prop: 'paytime',
          label: '支付时间',
        },
        {
          prop: 'size',
          label: '规格',
          sortable: true,
        },
        { prop: 'amount', label: '数量' },
        { prop: 'gmv', label: 'GMV' },
      ],
    };
  },
  components: {
    LbTable
  },
  computed: {
    dislogState () {
      return this.dialogVisible || false;
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    open() {

    }
  }
};
</script>
<style lang="less" scoped>
@import '../common';

/deep/ .el-dialog {
  background-color: rgba(8,21,42,1);

  .el-dialog__body {
    padding: 0
  }
}
/deep/ .el-dialog__header {
  position: relative;
  padding: 36px 28px 24px;
  text-align: left;

  .el-dialog__headerbtn {
    top: 40px;
    right: 30px;
  }

  .el-dialog__title {
    color: #fff;
  }

  /deep/ .el-icon-close {
    font-family: "dj-bi-" !important;
    font-size: 26px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &:before {
      content: "\e61c";
    }
  }
}
.vessel {
  position: relative;
  width: 100%;
  //width: 913px;
  height: 600px;
  .nodata {
    height: 100%;
    //background-image: url("../assets/images/noData.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100px 100px;
  }
}

.filtrateBox {
  display: flex;
  line-height: 40px;
  margin: 0 31px 28px;
  color: #fff;

  .statusBox {
    width: 146px;
    margin: 0 16px;
  }

  .input_box {
    width: 260px;
  }
}
</style>
