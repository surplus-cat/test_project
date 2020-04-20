import Picker from '../picker';
import WeekRangePanel from '../panel/week-range';

const getPanel = function(type) {
  if (type === 'weekrange') {
    return WeekRangePanel;
  }
};

export default {
  mixins: [Picker],

  name: 'WeekPicker',

  props: {
    type: {
      type: String,
      default: 'date'
    },
    timeArrowControl: Boolean
  },

  watch: {
    type(type) {
      if (this.picker) {
        this.unmountPicker();
        this.panel = getPanel(type);
        this.mountPicker();
      } else {
        this.panel = getPanel(type);
      }
    }
  },

  created() {
    this.panel = getPanel(this.type);
  }
};
