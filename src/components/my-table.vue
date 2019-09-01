// my-table.vue
<template>
  <el-table :data="data" :height="height">
    <template v-for="colConfig in colConfigs">
      <slot v-if="colConfig.slot" :name="colConfig.slot"></slot>
      <component
        v-if="colConfig.component"
        :is="config.component"
        :col-config="colConfig">
      </component>
      <el-table-column v-else v-bind="colConfig"></el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  props: ['colConfigs', 'data', 'height']
}
</script>
