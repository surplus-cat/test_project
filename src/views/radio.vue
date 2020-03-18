<template>
  <div>
    <el-radio-group v-model="radio">
      <el-radio v-for="(item, index) in options" :label="item.value"  :key="index">
        {{ item.label }}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
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
      }]
    }
  },
  components: {},
  computed: {},
  watch: {},
  methods: {}
}

</script>
<style lang="less" scoped>
</style>
