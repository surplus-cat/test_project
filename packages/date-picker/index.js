import WeekPicker from './src/picker/date-picker';

/* istanbul ignore next */
WeekPicker.install = function install(Vue) {
  Vue.component(WeekPicker.name, WeekPicker);
};

export default WeekPicker;
