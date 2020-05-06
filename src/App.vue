<template>
  <div id="app">
    <router-view/>
    <!-- <a class="btn" href="javascript:;" @click="backTop">回顶部</a> -->
  </div>
</template>
<script>
import TWEEN from 'TWEEN';

export default {
  name: 'app',

  mounted: function () {
    // 初始化 TweenJs 监听
    this.tweenAni();
  },

  methods: {
    // TweenJs 动画监听
    tweenAni: function () {
      requestAnimationFrame(this.tweenAni);
      TWEEN.update(); // ================================= 关键是这句
    },
    // 回到顶部
    backTop: function () {
      // 获取当前的窗口滚动距离
      let AppScrollTopNow = {
        y: window.scrollY
      }; // ================================= 定义一个初始位置

      let AppScrollTopEnd = {
        y: 0
      };// ================================= 定义一个结束位置

      // 设置新的缓动动画
      new TWEEN.Tween(AppScrollTopNow) // 传入开始位置
        .to(AppScrollTopEnd, 600) // 指定时间内完成结束位置
        .easing(TWEEN.Easing.Quadratic.Out) // 缓动方法名
        .onUpdate(() => {
          // 上面的值更新时执行的设置
          document.documentElement.scrollTop = AppScrollTopNow.y;
          document.body.scrollTop = AppScrollTopNow.y;
        })
        .start();// ================================= 不要忘了合适的时候启动动画
    }
  }
}

</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // background-color: #f13460;
  display: flex;
  flex-direction: column;
  background-color: #000;
}

.btn {
  position: absolute;
  right: 0;
  bottom: 0vh;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  &-track {
    // background: #aaa;
  }
  &-corner {
    background: inherit;
  }
  &-thumb {
    background: rgb(220, 220, 220);
    border-radius: 4px;
    &:hover {
      background: rgb(184, 184, 184);
    }
  }
}
</style>
