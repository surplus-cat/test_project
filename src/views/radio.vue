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
