<template>
  <div class="about">
    <!-- <form class="counter_form">
      <ul class="counter_form_list">
        <li class="counter_form_item">
          <label class="counter_form_label" for="start">start</label>
          <input class="counter_form_input_text" id="start" type="number" v-model="start"/>
        </li>
        <li class="counter_form_item">
          <label class="counter_form_label" for="end">end</label>
          <input class="counter_form_input_text" id="end" type="number" v-model="end"/>
        </li>
        <li class="counter_form_item">
          <label class="counter_form_label" for="duration">duration</label>
          <input class="counter_form_input_text" id="duration" type="number" v-model="duration"/>
        </li>
        <li class="counter_form_item">
          <label class="counter_form_label" for="format">format</label>
          <input class="counter_form_input_checkbox" id="format" type="checkbox" v-model="format"/>
        </li>
      </ul>
      <input class="counter_form_button" type="button" value="Let's start!" @click="init"/>
    </form> -->
    <div class="counter_monitor">{{ counter }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { TweenMax, Power2 } from 'TweenMax';
import { TweenMax, Power2 } from 'gsap';

export default {
  props: {
    end: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      counter: 0,
      start: 0,
      // end: 700000,
      duration: 3,
      format: true
    };
  },
  computed: {
    formatter() {
      return new Intl.NumberFormat('en-GB');
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    end (newValue, oldValue) {
      TweenMax.to(this, this.duration, {
        ease: Power2.easeInOut,
        log: newValue,
        onUpdate: () => {
          this.counter = this.format ? this.formatter.format(this.log)
            : this.log;
        }
      });
      TweenMax.set(this, {
        log: this.start
      });
      this.start = oldValue;
        // new TWEEN.Tween({
        //   number: oldValue
        // })
        // .to({
        //   number: newValue
        // }, 5000)
        // .onUpdate(tween => {
        //   this.numTween = tween.number.toFixed(0)
        // })
        // .start()
        // function animate() {
        //   if (TWEEN.update()) {
        //     requestAnimationFrame(animate);
        //   }
        // }
        // animate();
    }
  },
  methods: {
    init() {
      TweenMax.to(this, this.duration, {
        ease: Power2.easeInOut,
        log: this.end,
        onUpdate: () => {
          this.counter = this.format ? this.formatter.format(this.log)
            : this.log;
        }
      });
      TweenMax.set(this, {
        log: this.start
      });
      // this.start = this.end;
    }
  }
};

</script>

<style>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: #ddd;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.2rem;
}

.counter_form {
  position: absolute;
  top: 0;
  left: 0;
  margin: 20px;
}
.counter_form_list {
  margin: 0;
  padding: 0;
}
.counter_form_item {
  display: flex;
  align-items: center;
  list-style: none;
  margin-bottom: 10px;
}
.counter_form_label {
  display: block;
  width: 80px;
}
.counter_form_input_text {
  width: 100px;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #bbb;
  font-family: "Source Sans Pro", sans-serif;
  transition: 300ms;
}
.counter_form_input_text:focus {
  color: #ffdd40;
  border-color: #ffdd40;
}
.counter_form_button {
  width: 180px;
  height: 30px;
  padding: 0;
  margin: 0;
  border-radius: 4px;
  border: none;
  background: rgba(255, 255, 255, 0.4);
  font-size: 1.2rem;
  font-family: "Source Sans Pro", sans-serif;
  cursor: pointer;
  transition: 300ms;
}
.counter_form_button:hover {
  background: #ffdd40;
}
.counter_monitor {
  color: #f00;
  font-size: 5rem;
}

input:focus {
  outline: none;
}

</style>
