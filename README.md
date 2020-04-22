


日期选择器 周区间自定义组件 封装未解决问题：

babel-loader exclude 编译文件 文件 popper.js 和 date.js;

改为直接引用element-ui 样式

开始周和结束周的样式未修复
蓝色圆圈是 对应 start-date 和 end-date, 需要新增自定义 样式

ui显示时 开始和结束时间修改为周一和周日

限定结束周在开始周往后12周以内;

element-ui 和antd的日期联动选择周不同，
element-ui联动没有确切的开始和结束时间之分，只有等到了两个日期都选择完毕后，小的则是开始时间，大的是结束时间;
而 antd 一旦选定了开始时间，则不可往前回退，只能往后选择结束时间

element-ui 新增 自定义字体图标例如iconfont
步骤1：在iconfont图标库选好 字体图标，
下载到本地，然后将字体资源和对应的css样式文件放置assets文件夹
然后在main.js 引入 就可以了
详见 iconfont.css  和  table.vue 文件

问题关键还是在于 font-family