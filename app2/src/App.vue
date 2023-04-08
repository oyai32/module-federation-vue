<template>
  <div id="app">
    <Header name="app2，使用 app1 的 header"/>
  </div>
</template>
<script>

export default {
  components: {
    Header: () => import('app1/Header')
  },
}
</script>
