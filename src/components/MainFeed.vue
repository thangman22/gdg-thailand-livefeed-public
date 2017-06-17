<template>
    <div class="mdl-grid" id="main">
      <div class="mdl-cell mdl-cell--5-col mdl-cell--1-offset-desktop mdl-cell--4-col-phone fblive-area"><live></live><FbLive :videos="liveVideos"></FbLive></div>
      <div class="mdl-cell mdl-cell--5-col mdl-cell--4-col-phone">
        <Countdown deadline="2017-05-17 00:00:00"></Countdown>
        <OnlineUser :users="users"></OnlineUser>
        <Stream :msgs="msg"></Stream>
      </div>
    </div>
</template>

<script>
const FbLive = resolve => {
  require.ensure(['@/components/FbLive'], () => {
    resolve(require('@/components/FbLive'))
  })
}

const OnlineUser = resolve => {
  require.ensure(['@/components/OnlineUser'], () => {
    resolve(require('@/components/OnlineUser'))
  })
}

const Live = resolve => {
  require.ensure(['@/components/YoutubeLive'], () => {
    resolve(require('@/components/YoutubeLive'))
  })
}

const Stream = resolve => {
  require.ensure(['@/components/Stream'], () => {
    resolve(require('@/components/Stream'))
  })
}

import Firebase from 'firebase'
import Countdown from '@/components/Countdown'

const firebaseApp = Firebase.initializeApp({
  apiKey: 'xxx',
  authDomain: 'xxx',
  databaseURL: 'xxx',
  projectId: 'xxx',
  storageBucket: 'xxx',
  messagingSenderId: 'xxx'
})
const db = firebaseApp.database()

export default {
  name: 'MainFeed',
  components: { OnlineUser, Stream, FbLive, Countdown, Live },
  firebase: {
    msg: {
      source: db.ref('msg').limitToLast(50),
      // optionally bind as an object
      asObject: false
    },
    users: db.ref('online-user'),
    liveVideos: db.ref('live').limitToLast(1)
  }
}
</script>
<style scoped>
  iframe{
    width:100%;
    height:450px;
  }

  #main {
    padding: 0 !important;
  }
</style>
