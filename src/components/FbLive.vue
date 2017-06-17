<template>
  <div>
  <div v-html="currentLive"></div>
  </div>
</template>

<script>

export default {
  name: 'FbLive',
  props: ['videos'],
  computed: {
    currentLive () {
      let liveEmbed = ''
      for (let video of this.videos) {
        liveEmbed = liveEmbed + video.embed_html
      }
      return liveEmbed
    }
  }
}
</script>
<style>
iframe {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
</style>
