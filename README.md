自定义图例颜色功能完成，但是未完成切换图表后图例颜色也要保持，就是柱状图切换到线图图例颜色也要迁移过去


########################################################

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

echarts 图表宽度的获取方式
echarts源码中有这么一个方法：Painter.prototype._getWidth
https://blog.csdn.net/tl101120/article/details/103271942

/api/events/custom/indicator/transform
神策保存自定义条件的接口入参

 [{expression: ""PaidOrder".用户数/"Web 元素点击".总次数/"App 元素点击".屏幕高度."人均值""App 浏览页面""}]

入参 且是有效入参
 [{expression: ""Web 浏览页面".用户数/"Web 元素点击".人均次数"}]

[
  {
    expression: "uniqcount(event.$pageview)/uniqavg(event.$WebClick)|null",
    events: ["$WebClick", "$pageview"]
  }
]

[{expression: ""App 被动启动".总次数/"App 元素点击".人均次数"}]

[
  {
    "expression":"count(event.$AppStartPassively)/uniqavg(event.$AppClick)|null",
    "events":["$AppStartPassively","$AppClick"]
  }
]

/api/events/report/?bookmarkId=&async=true&timeout=10&request_id=1590734615729:665357


approx: false
axis_config: {isNormalize: false, left: [], right: []}
by_fields: ["event.$Anything.$country"]
detail_and_rollup: true
filter: {}
from_date: "2020-04-14"
isSaved: false
jump_url: "/segmentation/?project=default#measures%5B0%5D%5Bevent_name%5D=%24AppStartPassively&measures%5B0%5D%5Baggregator%5D=general&measures%5B1%5D%5Bevent_name%5D=%24AppStart&measures%5B1%5D%5Baggregator%5D=average&unit=week&by_fields%5B%5D=event.%24Anything.%24country&chartsType=line&sampling_factor=64&axis_config%5BisNormalize%5D=false&rangeText=&from_date=2020-04-14&to_date=2020-04-30&approx=false&request_id=1590734615729:665357"
layer_other_rollup: false
measures: [{event_name: "$AppStartPassively", aggregator: "general"},…]
request_id: "1590734615729:665357"
sampling_factor: 64
sub_task_type: "SEGMENTATION"
to_date: "2020-04-30"
unit: "week"
use_cache: true


approx: false
axis_config: {isNormalize: false, left: [], right: []}
by_fields: ["event.$Anything.$country"]
detail_and_rollup: true
filter: {}
from_date: "2020-04-14"
isSaved: false
jump_url: "/segmentation/?project=default#measures%5B0%5D%5Bexpression%5D=count(event.%24AppStartPassively)%2Fmax(event.%24AppClick.%24screen_width)%2Bmax(event.%24AppViewScreen.%24screen_height)%7C%252p&measures%5B0%5D%5Bexpression_filters%5D%5B1%5D%5Brelation%5D=and&measures%5B0%5D%5Bexpression_filters%5D%5B1%5D%5Bconditions%5D%5B0%5D%5Bfield%5D=event.%24AppClick.%24distinct_id&measures%5B0%5D%5Bexpression_filters%5D%5B1%5D%5Bconditions%5D%5B0%5D%5Bfunction%5D=equal&measures%5B0%5D%5Bexpression_filters%5D%5B1%5D%5Bconditions%5D%5B0%5D%5Bparams%5D%5B%5D=111122222&measures%5B0%5D%5Bevents%5D%5B%5D=%24AppStartPassively&measures%5B0%5D%5Bevents%5D%5B%5D=%24AppClick&measures%5B0%5D%5Bevents%5D%5B%5D=%24AppViewScreen&measures%5B0%5D%5Bname%5D=emm&measures%5B0%5D%5Bformat%5D=%252p&measures%5B1%5D%5Bevent_name%5D=%24AppStart&measures%5B1%5D%5Baggregator%5D=average&unit=week&by_fields%5B%5D=event.%24Anything.%24country&chartsType=line&sampling_factor=64&axis_config%5BisNormalize%5D=false&rangeText=&from_date=2020-04-14&to_date=2020-04-30&approx=false&request_id=1590737330284:476670"
layer_other_rollup: false
measures: [
  {
    events: ["$AppStartPassively", "$AppClick", "$AppViewScreen"]
    expression: "count(event.$AppStartPassively)/max(event.$AppClick.$screen_width)+max(event.$AppViewScreen.$screen_height)|%2p"
    expression_filters: [
      {}, 
      {
        relation: "and",
        conditions: [{field: "event.$AppClick.$distinct_id", function: "equal", params: ["111122222"]}]
      }, 
      {}
    ],
    format: "%2p"
    name: "emm"
  },
  {
    event_name: "$AppStart", 
    aggregator: "average"
  }
]


静态时间 传值

measures: [{,…}, {event_name: "$AppStart", aggregator: "average"}]
unit: "week"
filter: {}
by_fields: ["event.$Anything.$country", "event.$Anything.$screen_height"]
sampling_factor: 64
axis_config: {isNormalize: false, left: [], right: []}
from_date: "2020-04-07"
to_date: "2020-04-14"
approx: false
tType: "n"
ratio: "n"
detail_and_rollup: true
layer_other_rollup: false
isSaved: false
sub_task_type: "SEGMENTATION"
jump_url: "/segmentation/?project=default#measures%5B0%5D%5Bexpression%5D=count(event.%24AppStartPassively)%2Fmax(event.%24AppClick.%24screen_width)%2Bmax(event.%24AppViewScreen.%24screen_height)%7C%252p&measures%5B0%5D%5Bexpression_filters%5D%5B1%5D%5Brelation%5D=and&measures%5B0%5D%5Bexpression_filters%5D%5B1%5D%5Bconditions%5D%5B0%5D%5Bfield%5D=event.%24AppClick.%24distinct_id&measures%5B0%5D%5Bexpression_filters%5D%5B1%5D%5Bconditions%5D%5B0%5D%5Bfunction%5D=equal&measures%5B0%5D%5Bexpression_filters%5D%5B1%5D%5Bconditions%5D%5B0%5D%5Bparams%5D%5B%5D=111122222&measures%5B0%5D%5Bevents%5D%5B%5D=%24AppStartPassively&measures%5B0%5D%5Bevents%5D%5B%5D=%24AppClick&measures%5B0%5D%5Bevents%5D%5B%5D=%24AppViewScreen&measures%5B0%5D%5Bname%5D=emm&measures%5B0%5D%5Bformat%5D=%252p&measures%5B1%5D%5Bevent_name%5D=%24AppStart&measures%5B1%5D%5Baggregator%5D=average&unit=week&by_fields%5B%5D=event.%24Anything.%24country&by_fields%5B%5D=event.%24Anything.%24screen_height&chartsType=line&sampling_factor=64&axis_config%5BisNormalize%5D=false&rangeText=&from_date=2020-04-07&to_date=2020-04-14&approx=false&tType=n&ratio=n&request_id=1591077472999:836642"
request_id: "1591077472999:836642"
use_cache: true

动态时间 传值

measures: [{,…}, {event_name: "$AppStart", aggregator: "average"}]
unit: "week"
filter: {}
by_fields: ["event.$Anything.$country", "event.$Anything.$screen_height"]
sampling_factor: 64
axis_config: {isNormalize: false, left: [], right: []}
from_date: "2020-04-07"
to_date: "2020-04-14"
approx: false
tType: "n"
ratio: "n"
detail_and_rollup: true
layer_other_rollup: false
isSaved: false
sub_task_type: "SEGMENTATION"
jump_url: "/segmentation/?project=default#measures%5B0%5D%5Bexpression%5D=count(event.%24AppStartPassively)%2Fmax(event.%24AppClick.%24screen_width)%2Bmax(event.%24AppViewScreen.%24screen_height)%7C%252p&measures%5B0%5D%5Bexpression_filters%5D%5B1%5D%5Brelation%5D=and&measures%5B0%5D%5Bexpression_filters%5D%5B1%5D%5Bconditions%5D%5B0%5D%5Bfield%5D=event.%24AppClick.%24distinct_id&measures%5B0%5D%5Bexpression_filters%5D%5B1%5D%5Bconditions%5D%5B0%5D%5Bfunction%5D=equal&measures%5B0%5D%5Bexpression_filters%5D%5B1%5D%5Bconditions%5D%5B0%5D%5Bparams%5D%5B%5D=111122222&measures%5B0%5D%5Bevents%5D%5B%5D=%24AppStartPassively&measures%5B0%5D%5Bevents%5D%5B%5D=%24AppClick&measures%5B0%5D%5Bevents%5D%5B%5D=%24AppViewScreen&measures%5B0%5D%5Bname%5D=emm&measures%5B0%5D%5Bformat%5D=%252p&measures%5B1%5D%5Bevent_name%5D=%24AppStart&measures%5B1%5D%5Baggregator%5D=average&unit=week&by_fields%5B%5D=event.%24Anything.%24country&by_fields%5B%5D=event.%24Anything.%24screen_height&chartsType=line&sampling_factor=64&axis_config%5BisNormalize%5D=false&rangeText=%E8%BF%87%E5%8E%BB49%E5%A4%A9+-+%E8%BF%87%E5%8E%BB56%E5%A4%A9&from_date=2020-04-07&to_date=2020-04-14&approx=false&tType=n&ratio=n&request_id=1591077424884:563659"
request_id: "1591077424884:563659"
use_cache: true