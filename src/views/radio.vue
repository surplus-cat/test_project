<template>
  <div>
    <p class="button" @click="add">新增10000</p>
    <p class="button" @click="plus">减10000</p>
    <!-- <el-radio-group v-model="radio">
      <el-radio v-for="(item, index) in options" :label="item.value"  :key="index">
        {{ item.label }}
      </el-radio>
    </el-radio-group> -->

    <tween :end="value" ref="tween" />
    <div class="block">
      <span class="demonstration">周</span>
      <el-date-picker
        v-model="value1"
        type="week"
        format="yyyy 年 MM 月 第 WW 周"
        placeholder="选择周">
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">月</span>
      <el-date-picker
        v-model="value2"
        type="month"
        placeholder="选择月">
      </el-date-picker>
    </div>

    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker
        v-model="value3"
        type="monthrange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
import tween from '../components/tween'
export default {
  data () {
    return {
      radio: 0,
      options: [{
        label: '男',
        value: 0
      }, {
        label: '女',
        value: 1
      }],
      value: 100.54,
      value1: '',
      value2: '',
      value3: ''
    }
  },
  components: {
    tween
  },
  computed: {},
  watch: {},
  methods: {
    add() {
      this.value += 10000.12;
      this.$nextTick(() => {
        this.$refs.tween.init();
      })

    },
    plus() {
      this.value -= 10000.12;
      this.$nextTick(() => {
        this.$refs.tween.init();
      })
    }
  }
}

</script>
<style lang="less" scoped>
.button {
  width: 100px;
  line-height: 40px;
  background-color: #f42;
  cursor: pointer;
  outline: none;
  margin: 20px auto;
}
</style>
