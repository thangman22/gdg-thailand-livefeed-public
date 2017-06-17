<template>
  <img class="mdl-chip__contact" :src="imgUrl"></img>
</template>

<script>

export default {
  name: 'OnlineUserChip',
  props: ['name', 'imgUrl']
}
</script>
<style scope>
  .mdl-chip--contact{
    margin-right: 5px;
  }
</style>
