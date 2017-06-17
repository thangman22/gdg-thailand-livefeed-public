<template>
  <transition name="fade">
    <div class="msg-card mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title">
        <span class="contact-image-area"><img class="mdl-chip__contact" :src="profileImageUrl" :alt="name"></span></img> {{name}} <span class="muted time"><timeago :since="postTime" :auto-update="60"></timeago></span>
      </div>
      
      <div class="mdl-card__supporting-text" v-if="type === 'text' && isUrl === false">
        {{text}}
      </div>
      <div class="mdl-card__supporting-text image-type" v-if="type === 'image'">
        <img :src="text">
      </div>
      <div class="mdl-card__supporting-text image-type" v-if="isUrl">
        <img :src="og.ogImage.url" v-if="og.ogImage.url"> <br>
        <a :href="og.ogUrl" target="_blank">{{og.ogTitle}}</a><br>
        <span class="muted">{{og.ogUrl}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MsgCard',
  props: ['profileImageUrl', 'name', 'text', 'type', 'postTime'],
  data () {
    return {
      og: {},
      isUrl: false
    }
  },
  mounted () {
    let regex = new RegExp('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?')
    if (regex.test(this.text) === true && this.type === 'text') {
      let url = this.text
      fetch('https://us-central1-thangman22-pwa.cloudfunctions.net/og/?url=' + url)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if (json.data.ogTitle || json.data.ogImage.url) {
          this.og = json.data
          this.isUrl = true
        }
      })
    }
  }
}
</script>
<style scoped>
  .msg-card.mdl-card {
    width: 100%;
    min-height: 80px;
    margin-bottom: 9px;
  }
  .mdl-card__title {
    font-size: 16px;
    color: #757575;
    padding-bottom: 5px;
  }
  .mdl-chip__contact {
    height: 20px;
    width: 20px;
    vertical-align: middle;
  }
  .mdl-card__supporting-text{
    font-size: 16px;
    color: #212121;
    padding-top: 10px;
    padding-bottom: 5px;
  }
  .image-type{
    text-align: center;
  }
  .image-type > img{
    max-height: 150px;
    max-width: 100%;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
  .muted{
    font-size: 10px;
    color: #3D5AFE;
  }
  .time {
    padding-left: 5px;
  }
</style>
