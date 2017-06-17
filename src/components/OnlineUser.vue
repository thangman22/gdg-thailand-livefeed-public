<template>
  <div>
    <div class="online-user" v-if="onlineUser.length > 0">
      <div class="mdl-grid title-area">
        <div class="mdl-cell mdl-cell--12-col">ONLINE REPORTER</div>
      </div>
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--12-col"><OnlineUserChip :imgUrl="user.profileImage" :name="user.name" v-for="(user, index) in onlineUser" :key="index"></OnlineUserChip></div>
      </div>
    </div>
  </div>
</template>

<script>

const OnlineUserChip = resolve => {
  require.ensure(['@/components/OnlineUserChip'], () => {
    resolve(require('@/components/OnlineUserChip'))
  })
}

export default {
  name: 'OnlineUser',
  props: ['users'],
  components: { OnlineUserChip },
  computed: {
    onlineUser: function () {
      let onlineUser = []
      for (let user of this.users) {
        if ((Math.round(new Date().getTime() / 1000) - 600) < user.unixtime) {
          onlineUser.push(user)
        }
      }
      return onlineUser
    }
  }
}
</script>
<style scoped>
  .title {
    margin-top: 0;
    margin-bottom: 0;
  }
  .title-area {
    padding-bottom: 0;
    font-weight: 700;
    font-size: 0.8em;
    color: #757575;
  }
  
</style>
