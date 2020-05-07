<template>
  <div>
    <div class="common_nav">
      <ul>
        <li v-for="(item, index) in items" :key="item" @click="handleClick(index)" :class="{ active: activeIndex === index }">
          {{ item }}
        </li>
      </ul>
    </div>
    <h4 class="subtitle">温州分公司客户数据</h4>
    <div class="content">
      <salemanManage />
    </div>
  </div>
</template>

<script>
import salemanManage from './salemanManage.vue';

export default {
  data () {
    return {
      activeIndex: 0,
      items: [
        '首页',
        '销售看板',
        '客户看板',
        '业务员看板',
        '待付款看板',
        '购物车看板'
      ],
    };
  },
  components: {
    salemanManage
  },
  computed: {},
  watch: {},
  methods: {
    handleClick(index) {
      this.activeIndex = index;
    }
  }
};

</script>
<style lang="less" scoped>
@import './common';

.common_nav {
  height: 58px;
  line-height: 58px;
  padding-left: 49px;
  background:rgba(8,21,42,1);
  box-shadow:0px 12px 48px 16px rgba(0,0,0,0.12);

  ul {
    display: flex;
  }

  li {
    color: rgba(255,255,255,0.65);
    font-size: 14px;
    margin-right: 34px;
    cursor: pointer;

    &.active {
      color: #fff;

      &:after {
        content: '';
        width: 100%;
        height: 3px;
        display: block;
        background:rgba(0,100,235,1);
        margin-top: -10px;
      }
    }
  }
}

.subtitle {
  line-height: 32px;
  font-size: 20px;
  margin-top: 24px;
  margin-bottom: 16px;
  margin-left: 48px;
  color: #fff;
  text-align: left;
}

.content {
  margin: 0 24px;
}
</style>
