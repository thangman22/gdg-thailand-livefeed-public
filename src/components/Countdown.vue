<template>
  <div class="mdl-grid" v-if="getDiff > 0">
    <div class="mdl-cell mdl-cell--3-col mdl-cell--1-col-phone time-block"><span class="text">{{ days }}</span><span class="digit">D</span></div>
    <div class="mdl-cell mdl-cell--3-col mdl-cell--1-col-phone time-block"><span class="text">{{ hours }}</span><span class="digit">H</span></div>
    <div class="mdl-cell mdl-cell--3-col mdl-cell--1-col-phone time-block"><span class="text">{{ minutes }}</span><span class="digit">M</span> </div>
    <div class="mdl-cell mdl-cell--3-col mdl-cell--1-col-phone time-block"><span class="text">{{ seconds }}</span><span class="digit">S</span></div>
  </div>
</template>
<script>
export default {
  name: 'Countdown',
  props: ['deadline'],
  created () {
    window.setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000)
      this.diff = (Date.parse(this.deadline) / 1000) - ((new Date()).getTime() / 1000)
    }, 1000)
  },
  data () {
    return {
      diff: 0,
      date: Math.trunc(Date.parse(this.deadline) / 1000),
      now: Math.trunc((new Date()).getTime() / 1000)
    }
  },
  computed: {
    getDiff () {
      return this.diff
    },
    seconds () {
      return (this.date - this.now) % 60
    },
    minutes () {
      return Math.trunc((this.date - this.now) / 60) % 60
    },
    hours () {
      return Math.trunc((this.date - this.now) / 60 / 60) % 24
    },
    days () {
      return Math.trunc((this.date - this.now) / 60 / 60 / 24)
    }
  }
}
</script>
<style>
.time-block{
  text-align: center;
}
.text {
  font-weight: 200;
  font-size: 44px;
  color: #BDBDBD;
}
.digit {
  font-weight: 200;
  font-size: 24px;
  color: #BDBDBD;
}
</style>
