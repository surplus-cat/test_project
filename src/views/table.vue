<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100vw;margin-bottom: 20px;"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" label="日期" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>

    <!--<el-table
      :data="tableData1"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table> -->
    <div class="block" style="margin-bottom: 20px;">
      <span class="demonstration">周</span>
      <el-date-picker
        v-model="value1"
        type="week"
        :format="format(value1)" 
        :picker-options="{'firstDayOfWeek': 1}"
        value-format="yyyy-MM-dd"
        :clearable="false"
        placeholder="选择周">
      </el-date-picker>
      <el-date-picker
        v-model="value11"
        type="week"
        format="yyyy 年 MM 月 第 WW 周"
        :picker-options="{'firstDayOfWeek': 1}"
        value-format="yyyy-MM-dd"
        placeholder="选择周">
      </el-date-picker>
    </div>
    <!-- <div class="block">
      <span class="demonstration">月</span>
      <el-date-picker
        v-model="value2"
        type="month"
        placeholder="选择月">
      </el-date-picker>
    </div> -->

    <div class="block" style="margin-bottom: 20px;">
      <span class="demonstration">周</span>
      <el-date-picker
        v-model="value4"
        type="weekrange"
        range-separator="至"
        start-placeholder="开始周"
        end-placeholder="结束周">
      </el-date-picker>
    </div>

    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker
        v-model="value3"
        type="monthrange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份">
      </el-date-picker>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          children: [
            {
              id: 11,
              date: "2016-05-01",
              name: "李小波",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 12,
              date: "2016-05-01",
              name: "王二狗",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小波",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王黑虎",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          children: [
            {
              id: 66,
              date: "2019-05-01",
              name: "王波",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 68,
              date: "2020-05-01",
              name: "李虎",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        }
      ],
      tableData1: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          hasChildren: true
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value11: ''
    };
  },
  methods: {
    format(date) {
      
      let now = new Date(date).getDay();
      let firstDay = new Date(`${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-01`).getDay();
      // 判断当月的1号是不是周一
      let isFirstWeek = firstDay === 1;

      let a = 1;
      return `yyyy 年 MM 月 ${a} 周`
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            id: 32,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          }
        ]);
      }, 1000);
    },
    getWeekNum(date) {
      let firstDay = new Date(`${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-01`).getDay();
      // 判断当月的1号是不是周一
      let isFirstWeek = firstDay === 1;
      let FirstDay = firstDay === 0 ? 7 : firstDay
      console.log((new Date(date).getDate() + FirstDay) / 7 + Number(isFirstWeek));
    }
  }
};
</script>
<style scoped>
/deep/.el-table__indent {
  padding-left: 3px!important;
}
</style>
