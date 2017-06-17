<template>
  <div class="stream">
    <div class="mdl-grid title-area">
      <div class="mdl-cell mdl-cell--12-col">LASTEST POST</div>
    </div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--12-col"><MsgCard :type="msg.type" :profileImageUrl="msg.profile.profileImage" :name="msg.profile.name" :text="msg.text" :postTime="msg.time" v-for="(msg, index) in sortMsg" :key="index"></MsgCard></div>
    </div>
  </div>
</template>

<script>
const MsgCard = resolve => {
  require.ensure(['@/components/MsgCard'], () => {
    resolve(require('@/components/MsgCard'))
  })
}

export default {
  name: 'Stream',
  props: ['msgs'],
  components: { MsgCard },
  computed: {
    sortMsg () {
      return this.msgs.sort((a, b) => {
        return b.unixtime - a.unixtime
      })
    }
  }
}
</script>
<style scoped>
  .title{
    margin-top: 0;
    margin-bottom: 0;
  }
  .title-area{
    padding-bottom: 0;
    font-weight: 700;
    font-size: 0.8em;
    color: #757575;
  }
  .mdl-grid{
    padding: 0 !important;
  }
</style>
