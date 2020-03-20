<template>
  <div>
    <div>
      <mdatapick :child='mdatapickdata' @cb="callback"></mdatapick>
    </div>
  </div>
</template>

<script>
import mdatapick from '../components/mdatapick'
export default {
  data() {
    return {
      mdatapickdata: {
        start: "2020-02-02",
        end: "2020-03-18"
      }
    }
  },
  methods: {
    callback(startDate, endDate) {
      this.mdatapickdata.start = startDate;
      this.mdatapickdata.end = endDate;
    }
  },
  components: {
    mdatapick
  }
}
</script>
<style>
</style>
