<template>
  <div class="wrapper">
    {{ obj.name }} <el-button @click="add">筛选条件</el-button>
    <div class="filter-group-control">
      <div id="filter-group-relation"
        v-show="obj.arr.length > 1"
        class="filter-group-relation">
        <div class="relation-topline"></div>
        <button data-method="relation"
          data-relation="and"
          class="buttons"
          @click="toggle"
          type="button">{{ aliasname[obj.type] }}</button>
        <div class="relation-bottomline"></div>
      </div>
      <div v-for="(ele, idx) in obj.arr"
        class="item"
        :key="idx">
        <div class="case" @click.stop="open1(idx)" :style="{ 'z-index': 1000 - idx  }">
          {{ ele.value1.label }}
          <div class="hideBox" v-show="ele.state1">
            <input type="text" @input="filt" placeholder="搜索">
            <ul>
              <li v-for="elem in options1_cp"
                :key="elem.value"
                :class="{ active: ele.value1.label === elem.label }"
                @click.stop="select(elem, idx)">{{elem.label}}</li>
            </ul>
          </div>

        </div>
        <el-select v-model="ele.value2">
          <el-option v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!-- 有三种情况，中间条件为 包含和不包含时 第三个为下拉单选，还有一种是输入框  -->
        <div class="boxer"
          @click.stop="open(idx)" :style="{ 'z-index': 1000 - idx  }">
          <span v-for="(elem, index) in ele.elems"
            class="label-info"
            :key="index">
            {{ elem.name }}
            <span data-role="remove" @click="remove(index, idx)"></span>
          </span>
          <div class="tipbox">
            <input @input="check($event, idx)" :id="forId('input', idx)" @keyup.enter="submit($event, idx)" @keyup.delete="backspace($event, idx)" @blur="submit($event, idx)" />

            <ul v-show="ele.state3 && tips.length > 0">
              <li v-for="(tip, index) in tips_cp"
                :key="index"
                @click.stop="join(tip, idx)">
                {{ tip.name }}
              </li>
            </ul>
          </div>
        </div>
        <!-- 第{{ idx + 1 }}排 -->
        <el-button type="primary" icon="el-icon-edit" circle @click="unlock(idx)"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="del(idx)"></el-button>
      </div>
    </div>
    <pop v-if="dialogVisible" @close="close" @save="save" :dialogVisible="dialogVisible" :meanObj="meanObj" :idx="idx"></pop>
  </div>
</template>

<script>
import pop from '../components/pop';

export default {
  data() {
    return {
      tips: [
        { name: '浙江', value: 'zhejiang' },
        { name: '云南', value: 'yunnan' },
        { name: '福建', value: 'fujian' },
        { name: '山东', value: 'shandong' },
        { name: '山西', value: 'shanxi' },
        { name: '江苏', value: 'jiangsu' }
      ],
      tips_cp: [],
      options1_cp: [],
      options1: [{
        label: '元素内容',
        value: 'content'
      }, {
        label: '元素位置',
        value: 'location'
      }, {
        label: '元素类型',
        value: 'type'
      }, {
        label: '国家',
        value: 'country'
      }, {
        label: '屏幕宽度',
        value: 'width'
      }],
      options2: [{
        label: '等于',
        value: 'equal'
      }, {
        label: '不等于',
        value: 'unequal'
      }, {
        label: '包含',
        value: 'container'
      }, {
        label: '不包含',
        value: 'uncontainer'
      }, {
        label: '有值',
        value: 'hvalue'
      }, {
        label: '没值',
        value: 'nvalue'
      }, {
        label: '为空',
        value: 'empty'
      }, {
        label: '不为空',
        value: 'nempty'
      }, {
        label: '正则匹配',
        value: 'reg'
      }, {
        label: '正则不匹配',
        value: 'nreg'
      }],
      options3: [],
      obj: {
        name: '事件满足',
        type: '&',
        arr: [{
          name: 1,
          value1: {
            value: 'content',
            label: '元素内容'
          },
          state1: false,
          value2: 'equal',
          state3: false,
          elems: [],
          backState: false
        }]
      },
      aliasname: {
        '&': '且',
        '|': '或'
      },
      dialogVisible: false,
      meanObj: [],
      idx: 0
    };
  },
  components: {
    pop
  },
  mounted() {
    document.addEventListener('click', this.shutup);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.shutup);
  },
  methods: {
    unlock(idx) {
      this.idx = idx;
      this.meanObj = this.obj.arr[idx].elems
      this.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
    },
    save(arr, idx) {
      this.dialogVisible = false;
      this.obj.arr[idx].elems = arr.slice(0);
    },
    forId(name, index) {
      return `${name}_${index}`;
    },
    add() {
      let idx = this.obj.arr.length;
      let newobj = JSON.parse(JSON.stringify(this.obj.arr[idx - 1]));
      newobj.name = idx + 1;
      newobj.state1 = false;
      newobj.state3 = false;
      newobj.elems = [];
      newobj.backState = false;
      this.obj.arr.push(newobj);
    },
    del(idx) {
      this.obj.arr.splice(idx, 1);
    },
    toggle() {
      this.obj.type = this.obj.type === '&' ? '|' : '&';
    },
    filt(e) {
      // e.data 表示当前输入的内容
      if (e.data === null && e.target.value === '') {
        this.options1_cp = this.options1.slice(0)
      } else {
        let arr = this.options1.slice(0);
        this.options1_cp = arr.filter(v => v.label.includes(e.data));
      }
    },
    select(item, idx) {
      this.obj.arr[idx].value1.label = item.label;
      this.obj.arr[idx].value1.value = item.value;
      this.obj.arr[idx].state1 = false;
    },
    // 键盘回退事件
    backspace(e, idx) {
      if (!e.target.value && this.obj.arr[idx].backState) {
        this.obj.arr[idx].elems.pop();
      }
      this.calc(idx);
    },
    join(item, idx) {
      // console.log(item, idx);
      let arr = this.tips.slice(0)
      if (!this.obj.arr[idx].elems.some(v => v.name === item.name)) {
        this.obj.arr[idx].elems.push(item);
        document.getElementById(`input_${idx}`).value = '';
      }
      this.calc(idx);
    },
    check(e, idx) {
      let arr = this.tips.slice(0);
      let arrcp = arr.reduce((t, v) => {
        if (!this.obj.arr[idx].elems.find(k => k.name === v.name)) {
          t.push(v);
        }
        return t;
      }, []);
      if (e.data) {
        this.tips_cp = arrcp.filter(v => v.name.includes(e.data.toLocaleUpperCase()));
        if (document.getElementById(`input_${idx}`).value === '') {
          this.obj.arr[idx].backState = true;
        } else {
          this.obj.arr[idx].backState = false;
        }
      }
    },
    submit(event, idx) {
      // console.log(event.target.value, idx);
      let value = event.target.value;
      if (!this.obj.arr[idx].elems.some(v => v.name === value) && event.target.value) {
        this.obj.arr[idx].elems.push({
          name: `${value}`,
          value: `${value}`
        });
        document.getElementById(`input_${idx}`).value = '';
        this.calc(idx);
      }
    },
    remove(index, idx) {
      this.obj.arr[idx].elems.splice(index, 1);
      this.obj.arr[idx].state3 = true;
      document.getElementById(`input_${idx}`).focus();
      this.calc(idx);
    },
    calc(idx) {
      let arr = this.tips.slice(0);
      this.tips_cp = arr.reduce((t, v) => {
        if (!this.obj.arr[idx].elems.find(k => k.name === v.name)) {
          t.push(v);
        }
        return t;
      }, []);
      document.getElementById(`input_${idx}`).focus();
      // 输入框为空时加状态
      if (document.getElementById(`input_${idx}`).value === '') {
        this.obj.arr[idx].backState = true;
      } else {
        this.obj.arr[idx].backState = false;
      }
    },
    open(idx) {
      this.calc(idx);
      this.obj.arr.forEach(v => {
        v.state3 = false;
      });
      this.obj.arr[idx].state3 = true;
    },
    open1(idx) {
      this.obj.arr.forEach(v => {
        v.state1 = false;
      });
      this.obj.arr[idx].state1 = true;
      this.options1_cp = this.options1.slice(0);
    },
    shutup() {
      this.obj.arr.forEach(v => {
        v.state1 = false;
        v.state3 = false;
      });
    }
  }
};

</script>
<style lang="less" scoped>
.wrapper {
  padding-left: 20px;
  background-color: #ccc;
}
.filter-group-control {
  align-items: center;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  .item {
    width: 94%;
    padding-left: 41px;
    margin-bottom: 10px;
    text-align: left;
    display: flex;
  }

  .icon {
    margin-left: 10px;
  }
}

.case {
  width: 160px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #fff;
  position: relative;
  margin-right: 10px;
  border-radius: 5px;

  .hideBox {
    width: 160px;
    position: absolute;
    left: 0;
    top: 41px;
  }

  input {
    width: 160px;
    padding-left: 8px;
    height: 40px;
    outline: none;
    border: none;
    line-height: 20px;
    min-width: 60px;
    font-size: 14px;
    transition: background .2s ease-in-out,box-shadow .2s ease-in-out;
    color: #212121;
    border-radius: 3px;
    box-shadow: none;
    background-color: #fff;
    vertical-align: middle;
    box-sizing: border-box;

  }

  ul {
    width: 160px;
    background-color: #fff;
    margin-top: 2px;
  }

  li {
    width: 160px;
    height: 30px;
    padding-left: 20px;
    line-height: 30px;
    text-align: left;
    box-sizing: border-box;
    color: #000;
    cursor: pointer;

    &:hover {
      background-color: #ccc;
    }

    &.active {
      background-color: greenyellow;
    }
  }
}
.boxer {
  min-width: 100px;
  height: 40px;
  background-color: #fff;
  margin-left: 10px;
  border-radius: 5px;
  margin-right: 5px;
  display: flex;

  .tipbox {
    position: relative;
    height: 40px;
  }

  input {
    width: 40px;
    padding-left: 8px;
    height: 40px;
    outline: none;
    border: none;
    line-height: 20px;
    min-width: 60px;
    font-size: 14px;
    transition: background .2s ease-in-out,box-shadow .2s ease-in-out;
    color: #212121;
    border-radius: 3px;
    box-shadow: none;
    background-color: #fff;
    vertical-align: middle;
  }

  ul {
    width: 160px;
    position: absolute;
    left: 0;
    top: 42px;
    background-color: #fff;
  }

  li {
    width: 160px;
    height: 30px;
    padding-left: 24px;
    line-height: 30px;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
      background-color: #ccc;
    }

    &.active {
      background-color: #ccc;
    }
  }

  .label-info {
    padding: .2em .6em .3em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25em;
    font-size: 12px;
    font-weight: 300;
    color: #745ec5;
    border: 1px solid #745ec5;
    background-color: #f5f4fb;
    position: relative;
    height: 12px;
    padding-right: 28px;
    padding-top: 6px;
    margin-top: 8px;
    margin-left: 6px;
    margin-right: 2px;
  }

  .label-info:hover {
    background-color: #d5ceee;
    color: #5840b0;
    border: 1px solid #5840b0;
  }

  .label-info span[data-role="remove"] {
    display: inline-block;
    width: 22px;
    height: 23px;
    font-size: 14px;
    line-height: 21px;
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 0 3px 3px 0;
    transition: background 0.2s;
    cursor: pointer;
  }

  .label-info span[data-role="remove"]:after {
    content: "×";
  }

  .label-info span[data-role="remove"]:hover {
    color: #fff;
    background: #e55b41;
    border-left: 1px solid #5840b0;
  }
}

.filter-group-control .filter-group-relation {
  width: 30px;
  position: absolute;
  height: calc(100% - 10px);
}

.filter-group-control .filter-group-relation button {
  min-width: 36px;
  width: 36px;
}

.filter-group-control .filter-group-relation .relation-topline {
  margin: 15px 0 0 20px;
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
  width: 100%;
  height: calc(50% - 33px);
}

.filter-group-control .filter-group-relation .relation-bottomline {
  margin: 0 0 15px 20px;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  width: 100%;
  height: calc(50% - 33px);
}

.buttons {
  background: #f6f8fa;
  border: 1px solid #a8b7c8;
  padding: 6px 10px;
  display: inline-block;
  outline: 0;
  height: 36px;
  line-height: 20px;
  min-width: 60px;
  font-size: 14px;
  transition: background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
</style>
<style>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
