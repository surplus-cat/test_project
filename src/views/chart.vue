<template>
  <div class="boxer">
    <div class="legendBar">

      <ul class="legendList">
        <li
          class="legend"
          v-for="(item, idx) in legendList"
          :key="idx"
          @click="open(idx)"
        >
          <i :style="{ backgroundColor: item.color }"></i>
          {{ item.name }}
        </li>
      </ul>
      <ul>
        <li v-for="(item, idx) in typeList" :key="idx" @click="modify(item.value)">
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
      :before-close="handleClose"
    >
      <div class="innerBox">
        <ul class="legendList">
          <li
            class="legend"
            v-for="(item, idx) in legendList_"
            :key="idx"
            @click="toggle(idx)"
            :class="{ active: idx === index }"
          >
            <i :style="{ backgroundColor: item.color }"></i>
            {{ item.name }}
          </li>
        </ul>
        <div class="colorList">
          <ul>
            <li
              v-for="(item, idx) in colorList"
              :key="idx"
              @click="choose(item)"
              :class="{ tick: item === pickColor }"
            >
              <span :style="{ backgroundColor: item }"></span>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ensure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import echart from "../components/echart/index";

const clone = function (obj) {
  var newobj = obj.constructor === Array ? [] : {};
  if (typeof obj !== "object") {
    return;
  }
  for (var i in obj) {
    newobj[i] = typeof obj[i] === "object" ? clone(obj[i]) : obj[i];
  }
  return newobj;
};

export default {
  data() {
    return {
      legendList: [],
      legendList_: [],
      dialogVisible: false,
      colorList: [
        "#ccc",
        "#ff0",
        "#f00",
        "#f11",
        "#00f",
        "#0ff",
        "#2db7f5",
        "#ff6600",
        "#808bc6",
        "#ff31ac"
      ],
      index: 0,
      pickColor: "",
      typeList: [
        {
          name: "折线图",
          value: "line"
        },
        {
          name: "面积图",
          value: "area"
        },
        {
          name: "柱状图",
          value: "bar"
        }
      ]
    };
  },
  components: {
    echart
  },
  mounted() {
    // console.log(this.$refs.echarts.option)
    let color = this.$refs.echarts.option.color;
    let legend = this.$refs.echarts.option.legend.data;
    for (let key in legend) {
      this.legendList.push({
        name: legend[key],
        color: color[key]
      });
    }
    this.legendList_ = clone(this.legendList);
    this.draw();
  },
  methods: {
    open(idx) {
      this.dialogVisible = true;
      this.index = idx;
      this.pickColor = this.legendList_[this.index].color;
    },
    draw() {
      let data = [
        {
          saleArea: "0.00",
          salesmanId: "744ede9e84af4bb29e55017872cfb3f9",
          salesmanName: "陈海涛",
          unit: "m²",
          saleAmount: "10.00",
          percentageComplete: "-",
          goalAmount: "-",
          originVal: "0.00",
          salemanName: "陈海涛crny1fec",
          goalValue: "1",
          targetType: "gmv",
          NotSet: 0
        },
        {
          saleArea: "0.00",
          salesmanId: "744ede9e84af4bb29e55017872cfb3f9",
          salesmanName: "海涛",
          unit: "m²",
          saleAmount: "20.00",
          percentageComplete: "-",
          goalAmount: "-",
          originVal: "0.00",
          salemanName: "海涛crny2fec",
          goalValue: "2",
          targetType: "gmv",
          NotSet: 0
        },
        {
          saleArea: "0.00",
          salesmanId: "744ede9e84af4bb29e55017872cfb3f9",
          salesmanName: "陈涛",
          unit: "m²",
          saleAmount: "15.00",
          percentageComplete: "-",
          goalAmount: "-",
          originVal: "0.00",
          salemanName: "陈涛crns1fec",
          goalValue: "2",
          targetType: "gmv",
          NotSet: 0
        },
        {
          saleArea: "0.00",
          salesmanId: "744ede9e84af4bb29e55017872cfb3f9",
          salesmanName: "陈海",
          unit: "m²",
          saleAmount: "10.00",
          percentageComplete: "-",
          goalAmount: "-",
          originVal: "0.00",
          salemanName: "陈海crsy1fec",
          goalValue: "3",
          targetType: "gmv",
          NotSet: 0
        },
        {
          saleArea: "0.00",
          salesmanId: "744ede9e84af4bb29e55017872cfb3f9",
          salesmanName: "陈敏涛",
          unit: "m²",
          saleAmount: "0.00",
          percentageComplete: "-",
          goalAmount: "-",
          originVal: "0.00",
          salemanName: "陈敏涛cr2y1fec",
          goalValue: "4",
          targetType: "gmv",
          NotSet: 30
        },
        {
          saleArea: "0.00",
          salesmanId: "744ede9e84af4bb29e55017872cfb3f9",
          salesmanName: "陈艘涛",
          unit: "m²",
          saleAmount: "0.00",
          percentageComplete: "-",
          goalAmount: "-",
          originVal: "0.00",
          salemanName: "陈艘涛cwny1fec",
          goalValue: "5",
          targetType: "gmv",
          NotSet: 20
        },
        {
          saleArea: "0.00",
          salesmanId: "744ede9e84af4bb29e55017872cfb3f9",
          salesmanName: "陈未涛",
          unit: "m²",
          saleAmount: "0.00",
          percentageComplete: "-",
          goalAmount: "-",
          originVal: "0.00",
          salemanName: "陈未涛c9ny1fec",
          goalValue: "6",
          targetType: "gmv",
          NotSet: 10
        }
      ];

      this.$refs.echarts.option.dataset.source = data;
      setTimeout(() => {
        this.$refs.echarts.reDraw();
      });
    },
    toggle(idx) {
      this.index = idx;
      this.pickColor = this.legendList_[this.index].color;
    },
    modify(value) {
      // console.log(value);
      // console.log(this.$refs.echarts.option)
      for (let v of this.$refs.echarts.option.series) {
        // console.log(v)
        // console.log(value)
        if (value === "area") {
          v.type = 'line';
          v.stack = "总量";
        } else {
          v.type = value;
          v.stack = '';
        }

      }
      this.$refs.echarts.drawLine();
    },
    choose(item) {
      this.pickColor = item;
      this.legendList_[this.index].color = item;
    },
    ensure() {
      this.legendList = clone(this.legendList_);
      this.$refs.echarts.option.color = this.legendList_.map(v => v.color);
      this.$refs.echarts.drawLine();
      this.dialogVisible = false;
    },
    handleClose() {}
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
  margin-left: 10px;

  ul {
    width: 100%;
    display: flex;
  }

  li {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    display: block;
    border-radius: 100%;
    cursor: pointer;

    &.tick {
      &::after {
        content: "1";
      }
    }
  }

  span {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    display: block;
  }
}
.legendList {
  width: 177px;
  li {
    display: flex;
    margin-bottom: 20px;

    &.active {
      background-color: #ccc;
    }

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
