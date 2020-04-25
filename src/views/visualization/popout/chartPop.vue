<template>
  <el-dialog
    custom-class="resultDialog"
    :visible.sync="dialogVisible"
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
  methods: {
    close() {
      this.$emit('close');
    },
  }
};
</script>
<style lang="less" scoped>
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
