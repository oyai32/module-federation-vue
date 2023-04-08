<template>
  <div id="app">
    <Header name="app2，使用 app1 的 header"/>
    <div>app2 dayjs：{{ day }}</div>
  </div>
</template>
<script>

export default {
  components: {
    Header: () => import('app1/Header')
  },
  data() {
    return {
      day:''
    };
  },
  async mounted() {
    import('app1/dayjs').then(({default:dayjs})=>{
      this.day = dayjs().format('YYYY-MM-DD');
    })
  },
}
</script>
