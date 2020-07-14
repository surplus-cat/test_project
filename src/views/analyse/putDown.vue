<template>
  <div class="poperBox">
    <button class="dropdown" @click.stop="open">
      <span v-text="showText"></span>
    </button>
    <ul class="popBox" v-show="showPop">
      <li v-for="(item, idx) in list" @mouseover="enter(item)" @mouseout="leave(item)" @click.stop="choose(item, idx)" :key="idx">
        <a href="#" :class="{ extend: item.children && item.children.length > 0, active: idx === arr[0] }">{{ item.name }}</a>
        <ul class="dropdown-menu" v-if="item.children && item.children.length > 0" v-show="item.isShow">
          <li v-for="(subItem, index) in item.children" @click.stop="choose(subItem, idx, index)" :key="index">
            <a href="#" :class="{ active: idx === arr[0] && index === arr[1] }">{{ subItem.name }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {
      showText: '总次数',
      showPop: false,
      list: [
        {
          name: '总次数',
          value: 'cishu'
        },
        {
          name: '用户数',
          value: 'yonghu'
        },
        {
          name: '人均次数',
          value: 'renjun'
        },
        {
          name: '屏幕宽度',
          isShow: false,
          children: [
            {
              name: '总和',
              value: 'sum'
            },
            {
              name: '去重数',
              value: 'deweight'
            },
            {
              name: '最大值',
              value: 'max'
            }
          ]
        },
        {
          name: '屏幕高度',
          isShow: false,
          children: [
            {
              name: '总和',
              value: 'sum'
            },
            {
              name: '去重数',
              value: 'deweight'
            },
            {
              name: '最小值',
              value: 'min'
            }
          ]
        },
        {
          name: '前向地址',
          isShow: false,
          children: [
            {
              name: '去重数',
              value: 'deweight'
            },
          ]
        }
      ],
      arr: [0],
    };
  },
  computed: {

  },
  created() {

  },
  mounted() {
    document.addEventListener("click", this.shutup);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.shutup);
  },
  methods: {
    open() {
      this.showPop = true;
    },
    enter(item) {
      if (!item.isShow) {
        item.isShow = true;
      }
    },
    leave(item) {
      item.isShow = false;
    },
    shutup() {
      this.showPop = false;
    },
    choose(item, primaryKey, secondKey) {
      if (!item.children) {
        this.arr = [primaryKey];
      }
      if (!isNaN(secondKey)) {
        this.arr.push(secondKey);
      }
      if (!item.children || !isNaN(secondKey)) {
        this.showPop = false;

        if (!isNaN(secondKey)) {
          this.showText = `${this.list[primaryKey].name}的${this.list[primaryKey].children[secondKey].name}`;
        } else {
          this.showText = this.list[primaryKey].name;
        }
      }
    }
  },
  components: {

  },
};
</script>

<style scoped lang="less">
.poperBox {
  position: relative;
  margin-left: 8px;

  .dropdown {
    background: #f6f8fa;
    border: 1px solid #a8b7c8;
    padding: 6px 10px;
    display: inline-block;
    outline: 0;
    height: 36px;
    line-height: 20px;
    min-width: 60px;
    font-size: 14px;
    transition: background .2s ease-in-out,box-shadow .2s ease-in-out;
    color: #333;
    vertical-align: middle;
    border-radius: 3px;
    padding-right: 26px;
    position: relative;
    text-align: left;
    border-radius: 3px;
    color: #4C535A;
    background-color: #fff;
    border-color: #E2E9F1;
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      display: inline-block;
      right: 8px;
      top: 43%;
      width: 0;
      height: 0;
      vertical-align: middle;
      border-top: 4px dashed;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
    }

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
    }
  }

  .popBox {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    font-size: 14px;
    text-align: left;
    list-style: none;
    background-color: #fff;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid #ccc;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 4px;
    -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
    min-width: 100%;
    border-radius: 0;
    padding: 0;
    max-width: 320px;
    z-index: 1070;

    & > li {
      position: relative;
      text-align: left;

      & > a {
        display: block;
        padding: 6px;
        color: #4C535A;
        cursor: pointer;
        //width: 100%;
        height: 100%;
        line-height: 1.6;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: background .2s ease-in-out;
        text-decoration: none;

        &.extend {

          &::after {
            display: block;
            content: " ";
            position: absolute;
            width: 0;
            height: 0;
            border-color: transparent;
            border-style: solid;
            border-width: 5px 0 5px 5px;
            border-left-color: #ccc;
            right: 7px;
            top: 11px;
          }
        }

        &.active {
          color: #fff;
          background: #2DCA93!important;
          font-weight: 400;
        }

        &:hover {
          background-color: #ccc;
        }
      }
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      float: left;
      min-width: 160px;
      padding: 5px 0;
      margin: 2px 0 0;
      font-size: 14px;
      text-align: left;
      list-style: none;
      background-color: #fff;
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
      border: 1px solid #ccc;
      border: 1px solid rgba(0,0,0,.15);
      border-radius: 4px;
      -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
      box-shadow: 0 6px 12px rgba(0,0,0,.175);
      min-width: 100%;
      border-radius: 0;
      padding: 0;
      max-width: 320px;
      z-index: 1070;
      top: 0;
      left: 100%;
      margin-top: 0;

      li {
        position: relative;
      }

      a {
        display: block;
        padding: 6px;
        color: #4C535A;
        cursor: pointer;
        // width: 100%;
        height: 100%;
        line-height: 1.6;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: background .2s ease-in-out;
        text-decoration: none;

        &.active {
          color: #fff;
          background: #2DCA93!important;
          font-weight: 400;
        }

        &:hover {
          background-color: #ccc;
        }
      }
    }
  }
}

li {
  list-style: none;
}
</style>
