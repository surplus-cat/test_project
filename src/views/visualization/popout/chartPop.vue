<template>
  <el-dialog
    custom-class="resultDialog"
    :visible.sync="dislogState"
    :has-footer="false"
    :title="ChartObj.title"
    @close="close">
    <div class="vessel">
      <echart ref="echart" :type="ChartObj.ChartType" height="600px" v-show="isWhether"/>
      <div class="nodata" v-show="!isWhether"></div>
    </div>
  </el-dialog>
</template>

<script>
import echart from '@/components/echart';

export default {
  props: {
    ChartObj: {
      type: Object,
      default: function() {
        return {
          ChartType: '',
          title: '',
          data: []
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
      isWhether: true
    };
  },
  components: {
    echart
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
  }
};
</script>
<style lang="less" scoped>
/deep/ .el-dialog {
  // background-color: rgba(0,0,0,0.65);

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


  /deep/ .el-icon-close {
    font-family: "dj-bi-" !important;
    font-size: 16px;
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
  height: 600px;
  .nodata {
    height: 100%;
    //background-image: url("../assets/images/noData.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100px 100px;
  }
}
</style>
