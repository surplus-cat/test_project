<template>
  <div class="chartConfiguation">
    <div class="chartBox">
      <h4 class="subtitle">支付订单的实付金额的总和</h4>
      <p class="timeZone">2020-03-12 ～ 2020-06</p>
      <div class="chartArea">
      </div>
    </div>

    <div class="deploy" :style="{'width': width + 'px'}">
      <span class="rightMark" @click="fewar"></span>
      <div class="deployContent" v-show="isShow">
        <h4 class="subtitle">图表配置</h4>
        <ul>
          <li>
            <div>
              <div class="subhead">
                <span class="trigon"></span>
                图表标题
              </div>

              <el-input v-model="title" size="small" maxlength="30" />
              <p class="count">{{title.length}}/30</p>
            </div>
          </li>
          <li>
            <div>
              <div class="subhead">
                <span class="trigon"></span>
                时间选择
              </div>
              <el-select
                v-model="timeDuration"
                size="small"
                placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </li>
          <li>
            <div>
              <div class="subhead">
                <span class="trigon"></span>
                时间维度
              </div>
              <el-radio-group v-model="vdoing" size="mini">
                <el-radio-button :label="item.value" v-for="(item, idx) in timeType" :key="idx">{{item.name}}</el-radio-button>
              </el-radio-group>
            </div>
          </li>

          <li>
            <div>
              <div class="subhead">
                <span class="trigon"></span>
                图表类型
              </div>
              <dl class="chartTypes">
                <dd v-for="(item, idx) in chartTypes" :key="idx"></dd>
              </dl>
            </div>
          </li>
          <li>
            <div>
              <div class="subhead">
                <span class="trigon"></span>
                显示设置
              </div>
              <div>
                <dl class="displaySetup">
                  <dd>
                    <span>属性</span>
                    <el-select v-model="timeDuration" placeholder="请选择" size="small">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </dd>
                  <dd>
                    <span>数据</span>
                    <el-select v-model="timeDuration" placeholder="请选择" size="small">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </dd>
                  <dd>
                    <span>图表颜色</span>
                    <span>设置</span>
                  </dd>
                </dl>
              </div>
            </div>
          </li>

          <li>
            <div>
              <div class="subhead">
                <span class="trigon"></span>
                坐标轴设置
              </div>
              <p class="axisBox">
                <span name>X轴坐标轴</span>
                <el-switch
                  v-model="axis.x"
                  active-color="#3654EA"
                  inactive-color="#C0C4CC">
                </el-switch>
              </p>
              <p class="axisBox">
                <span name>Y轴坐标轴</span>
                <el-switch
                  v-model="axis.y"
                  active-color="#3654EA"
                  inactive-color="#C0C4CC">
                </el-switch>
              </p>
            </div>
          </li>

          <li>
            <div>
              <div class="subhead">
                <span class="trigon"></span>
                图表备注
              </div>
              <el-input
                class="remarkBox"
                v-model="remark"
                type="textarea"
                row="2" />
                <p class="count">{{remark.length}}/200</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: '',
      timeDuration: 'payType',
      remark: '',
      vdoing: 1,
      axis: {
        x: false,
        y: false
      },
      chartTypes: ['line', 'bar', 'heap_bar', 'h_bar', 'heap_h_bar', 'pie', 'table', 'card'],
      options: [{
        value: 'payType',
        label: '支付时间'
      }],
      timeType: [
        {
          name: '总和',
          value: 1
        },
        {
          name: '按天',
          value: 2
        },
        {
          name: '按周',
          value: 3
        },
        {
          name: '按月',
          value: 4
        },
        {
          name: '按小时',
          value: 5
        }
      ],
      isShow: true,
      width: 302
    }
  },
  methods: {
    fewar () {
      if (this.isShow) {
        this.width = 0;
      } else {
        this.width = 302;
      }
      this.isShow = !this.isShow;
    }
  }
}

</script>
<style lang="less" scoped>
@import "./filter";
</style>
