<template>
	<div>
    <h2>文字停顿滚动</h2>
    <div class="text-container">
      <transition-group class="inner-container2" name="slide" mode="out-in">
        <!-- 关键在于:key="text.id" 被识别为动态组件 -->
        <div class="text2" :key="text.id">
          {{ text.val }}
        </div>

      </transition-group>
    </div>
    <h2>列表过渡</h2>
    <div class="text-container">
      <transition-group tg="div" name="list" class="list-container" mode="out-in">
        <p v-for="(text, index) in arr2" :key="text + index" class="list-item">{{text}}</p>
      </transition-group>
    </div>
	</div>
</template>

<script>
const totalDuration = 1000 * 5;

export default {
  name: 'demo11',
  props: [],
  data() {
    return {
      arr: [],
      arr2: [],
      number: -1,
      number2: -1,
      timer: null
    }
  },
  computed: {
    text() {
      return {
        id: this.number,
        val: this.arr[this.number]
      }
    }
  },
  mounted() {
    this.startMove();
    // this.startMove2();
    setTimeout(() => {
      this.arr = this.arr.concat([
        '1 不是被郭德纲发现的，也不是一开始就收为徒弟。',
        '2 现在雅阁这个状态像极了新A4L上市那段日子。',
        '3 低配太寒碜，各种需要加装，中配定价过高，又没啥特色',
        '4 然后各种机油门、经销商造反什么的幺蛾子。',
        '5 看五月销量，建议参考A4，打8折吧。',
        '1 不是被郭德纲发现的，也不是一开始就收为徒弟。',
        '2 现在雅阁这个状态像极了新A4L上市那段日子。',
        '3 低配太寒碜，各种需要加装，中配定价过高，又没啥特色',
        '4 然后各种机油门、经销商造反什么的幺蛾子。',
        '5 看五月销量，建议参考A4，打8折吧。',
        '1 不是被郭德纲发现的，也不是一开始就收为徒弟。',
        '2 现在雅阁这个状态像极了新A4L上市那段日子。',
        '3 低配太寒碜，各种需要加装，中配定价过高，又没啥特色',
        '4 然后各种机油门、经销商造反什么的幺蛾子。',
        '5 看五月销量，建议参考A4，打8折吧。',
        '1 不是被郭德纲发现的，也不是一开始就收为徒弟。',
        '2 现在雅阁这个状态像极了新A4L上市那段日子。',
        '3 低配太寒碜，各种需要加装，中配定价过高，又没啥特色',
        '4 然后各种机油门、经销商造反什么的幺蛾子。',
        '5 看五月销量，建议参考A4，打8折吧。',
        '1 不是被郭德纲发现的，也不是一开始就收为徒弟。',
        '2 现在雅阁这个状态像极了新A4L上市那段日子。',
        '3 低配太寒碜，各种需要加装，中配定价过高，又没啥特色',
        '4 然后各种机油门、经销商造反什么的幺蛾子。',
        '5 看五月销量，建议参考A4，打8折吧。',
      ])
    }, 1000 * 10)
    setTimeout(() => {
      this.arr = this.arr.concat(['6 看秀秀秀', '7 看妹妹', '8 看帝霸', '8 看霸天', '9 看秀秀秀', '10 看妹妹', '11 看帝霸', '12 看白霸天'])
    }, 1000 * 60)
  },
  methods: {
    startMove() {
      this.timer = setTimeout(() => {
        if (this.number === (this.arr.length - 1)) {
          // this.number = 0;
          clearTimeout(this.timer);
        } else {
          this.number += 1;
        }
        this.startMove();
      }, totalDuration)
    },
  },
  components: {}
}
</script>

<style scoped>
  h2 {
    margin: 20px 0
  }
  .text-container {
    width: 500px;
    height: 37px;
    line-height: 37px;
    margin: 10px auto;
    border: 1px solid cornflowerblue;
    overflow: hidden;
    position: relative;
  }
  .text, .text2 {
    margin: 0;
  }
  .inner-container {
    animation: myMove 5s linear infinite;
    animation-fill-mode: forwards;
  }
  /*文字无缝滚动*/
  @keyframes myMove {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-150px);
    }
  }
  /*文字停顿滚动*/
  @keyframes myMove2 {
    0% {
      transform: translateY(0);
    }
    10% {
      transform: translateY(-30px);
    }
    20% {
      transform: translateY(-30px);
    }
    30% {
      transform: translateY(-60px);
    }
    40% {
      transform: translateY(-60px);
    }
    50% {
      transform: translateY(-90px);
    }
    60% {
      transform: translateY(-90px);
    }
    70% {
      transform: translateY(-120px);
    }
    80% {
      transform: translateY(-120px);
    }
    90% {
      transform: translateY(-150px);
    }
    100% {
      transform: translateY(-150px);
    }
  }
  /*.slide-transition {

    position: absolute
  }*/
  .text2 {
    position: absolute;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s linear;
    z-index: 10
  }
  .slide-leave-to {
    transform: translateY(-37px);
  }
  .slide-enter {
    transform: translateY(37px);
  }
  .slide-enter-to {
    transform: translateY(0px);
  }
  .list-container {
    position: relative;
    overflow: hidden;
  }
  .list-item {
    margin: 0;
    transition: all 1s;
    overflow: hidden;
  }
  .list-move {
    /*transition: transform 1s;*/
  }

  .list-enter {
    transform: translateY(30px);
  }

  .list-enter-to, .list-leave {
    transform: translateY(0);
  }

  .list-leave-to {
    transform: translateY(-30px)
  }

  .list-leave-active {
    position: absolute;
    width: 0;
  }


</style>
