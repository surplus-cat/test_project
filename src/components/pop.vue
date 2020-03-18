<template>
  <el-dialog title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="close">
    <div>
      <textarea v-model="text"></textarea>
      <p class="help-block">注意：按换行符分隔，每行一个值。</p>
    </div>
    <span slot="footer"
      class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary"
        @click="save">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    meanObj: {
      type: Array,
      default: function () { return [] }
    },
    idx: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.text = this.meanObj.map(v => v.name).join('\n');
  },
  methods: {
    close() {
      this.$emit('close');
    },
    save() {
      let arr = this.text.split('\n').filter(v => v);
      let arrcp = arr.reduce((t, v) => {
        if (!this.meanObj.find(k => k.name === v)) {
          t.push(v);
        }
        return t;
      }, []).map(v => {
        return {
          name: v,
          value: v
        }
      }).concat(this.meanObj);
      this.$emit('save', arrcp, this.idx);
    }
  }
};

</script>
<style lang="less" scoped>
textarea {
  width: 100%;
  height: 300px;
  resize: none;
  outline: none;
}
.help-block {
  display: block;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #737373;
  text-align: left;
}
</style>
