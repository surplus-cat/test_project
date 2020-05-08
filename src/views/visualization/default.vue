<template>
  <div>
    <div class="common_nav">
      <ul>
        <li>首页</li>
        <li v-for="(item, index) in items" :key="item" @click="handleClick(index)" :class="{ active: activeIndex === index }">
          {{ item }}
        </li>
      </ul>
    </div>
    <h4 class="subtitle">温州{{ titles[activeIndex] }}</h4>
    <div class="content">
      <saleBoard v-if="activeIndex === 0" />
      <providerBoard v-if="activeIndex === 1" />
      <customerBoard v-if="activeIndex === 2"/>
      <salemanBoard v-if="activeIndex === 3" />
      <saleData v-if="activeIndex === 4 || activeIndex === 5" :index="activeIndex" />
    </div>
  </div>
</template>

<script>
import salemanBoard from './salemanBoard.vue';
import saleBoard from './saleBoard.vue';
import providerBoard from './providerBoard.vue';
import saleData from './saleData.vue';
import customerBoard from './customerBoard.vue';

export default {
  data () {
    return {
      activeIndex: 0,
      items: [
        '销售看板',
        '供应商看板',
        '客户看板',
        '业务员看板',
        '待付款看板',
        '购物车看板'
      ],
      titles: [
        '分公司接单数据',
        '分公司供应商接单数据',
        '分公司客户数据',
        '分公司业务员数据',
        '分公司今日待付款',
        '分公司今日购物车'
      ]
    };
  },
  components: {
    saleBoard,
    salemanBoard,
    providerBoard,
    saleData,
    customerBoard
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
</style>
