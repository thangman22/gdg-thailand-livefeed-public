<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <!-- Title -->
          <span class="mdl-layout-title"><img src="static/logo.png" class="logo" alt="Google I/O Extend Thailand Live Stream"></span>
          <div class="mdl-layout-spacer"></div>
        </div>
      </header>
      <main class="mdl-layout__content">
        <div class="page-content"><router-view></router-view></div>
      </main>
    </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style scoped>
.mdl-layout__header {
  background: #FFF;
}
.logo {
  max-height: 50px;
}
@media only screen and (max-width: 500px) {
  .logo {
    max-width: 250px;
  }
}
</style>
