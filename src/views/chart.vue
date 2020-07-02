<template>
  <div class="boxer">
    <div class="legendBar">
      <ul class="legendList">
        <li class="legend" v-for="(item, idx) in legendList" :key="idx" @click="dialogVisible = true">
          <i :style="{ backgroundColor: item.color }"></i>
          {{ item.name }}
        </li>
      </ul>

    </div>
    <div class="echart-wrapper">
      <echart ref="echarts" type="salemanTarget" />
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="innerBox">
        <ul class="legendList">
          <li class="legend" v-for="(item, idx) in legendList" :key="idx" @click="dialogVisible = true">
            <i :style="{ backgroundColor: item.color }"></i>
            {{ item.name }}
          </li>
        </ul>
        <div class="colorList">
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import echart from '../components/echart/index'

export default {
  data () {
    return {
      legendList: [],
      dialogVisible: false,
    };
  },
  components: {
    echart
  },
  computed: {},
  mounted() {
    console.log(this.$refs.echarts.option)
    let color = this.$refs.echarts.option.color;
    let legend = this.$refs.echarts.option.legend.data;
    for (let key in legend) {
      this.legendList.push(
        {
          name: legend[key],
          color: color[key]
        }
      )
    }
    this.draw();
  },
  methods: {
    draw () {
      let data = [
        {"saleArea":"0.00","salesmanId":"744ede9e84af4bb29e55017872cfb3f9","salesmanName":"陈海涛","unit":"m²","saleAmount":"10.00","percentageComplete":"-","goalAmount":"-","originVal":"0.00","salemanName":"陈海涛crny1fec","goalValue":"1","targetType":"gmv","NotSet":0},
        {"saleArea":"0.00","salesmanId":"744ede9e84af4bb29e55017872cfb3f9","salesmanName":"海涛","unit":"m²","saleAmount":"20.00","percentageComplete":"-","goalAmount":"-","originVal":"0.00","salemanName":"海涛crny2fec","goalValue":"2","targetType":"gmv","NotSet":0},
        {"saleArea":"0.00","salesmanId":"744ede9e84af4bb29e55017872cfb3f9","salesmanName":"陈涛","unit":"m²","saleAmount":"15.00","percentageComplete":"-","goalAmount":"-","originVal":"0.00","salemanName":"陈涛crns1fec","goalValue":"2","targetType":"gmv","NotSet":0},
        {"saleArea":"0.00","salesmanId":"744ede9e84af4bb29e55017872cfb3f9","salesmanName":"陈海","unit":"m²","saleAmount":"10.00","percentageComplete":"-","goalAmount":"-","originVal":"0.00","salemanName":"陈海crsy1fec","goalValue":"3","targetType":"gmv","NotSet":0},
        {"saleArea":"0.00","salesmanId":"744ede9e84af4bb29e55017872cfb3f9","salesmanName":"陈敏涛","unit":"m²","saleAmount":"0.00","percentageComplete":"-","goalAmount":"-","originVal":"0.00","salemanName":"陈敏涛cr2y1fec","goalValue":"4","targetType":"gmv","NotSet":30},
        {"saleArea":"0.00","salesmanId":"744ede9e84af4bb29e55017872cfb3f9","salesmanName":"陈艘涛","unit":"m²","saleAmount":"0.00","percentageComplete":"-","goalAmount":"-","originVal":"0.00","salemanName":"陈艘涛cwny1fec","goalValue":"5","targetType":"gmv","NotSet":20},
        {"saleArea":"0.00","salesmanId":"744ede9e84af4bb29e55017872cfb3f9","salesmanName":"陈未涛","unit":"m²","saleAmount":"0.00","percentageComplete":"-","goalAmount":"-","originVal":"0.00","salemanName":"陈未涛c9ny1fec","goalValue":"6","targetType":"gmv","NotSet": 10},
      ]

      this.$refs.echarts.option.dataset.source = data;
      setTimeout(() => {
        this.$refs.echarts.reDraw();
      })

    }
  }
};
</script>
<style lang="less" scoped>
.boxer {
  display: flex;
}
.legendBar {
  width: 10%;
  display: flex;
  margin-left: 20px;
  flex-direction: column;
  flex-flow: column-reverse;

  li {
    display: flex;
    margin-bottom: 20px;

    i {
      width: 20px;
      height: 20px;
      display: block;
      margin-right: 20px;
    }
  }
}
.innerBox {
  display: flex;
}
.colorList {
  flex: 1;
}
.legendList {
  width: 177px;
  li {
    display: flex;
    margin-bottom: 20px;

    i {
      width: 20px;
      height: 20px;
      display: block;
      margin-right: 20px;
    }
  }
}
.echart-wrapper {
  height: 600px;
  flex: 1;
  background-color: #08152a;
}
</style>
