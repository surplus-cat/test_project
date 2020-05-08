<template>
  <div>
    <div class="filtro_gather">
      <div class="dimension">
        <ul>
          <li>
            <span class="name">客户</span>
            <el-input v-model="customerName" class="input_field" />
          </li>
          <li>
            <span class="name">业务员</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <p class="reset">重置</p>
          </li>
        </ul>
      </div>

      <div class="Last_update">
        <span class="clock">数据更新于 <span class="nowTime">{{ nowTime }}</span></span>
        <span class="refreshBtn">刷新 <i class="dj-bi- dj-bi-refresh dj-bi-histogram" /></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      customerName: '',
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
      nowTime: +new Date(),
    };
  },
  components: {},
  computed: {},
  watch: {},
  methods: {}
};

</script>
<style lang="less" scoped>
@import './default';

</style>
