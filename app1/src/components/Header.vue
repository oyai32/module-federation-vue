<template>
  <div>
    <h1>{{ name }}</h1>
    <div>使用 dayjs：{{ day }}</div>
    <div>{{ message }}</div>
  </div>
</template>
<script>
import dayjs from 'dayjs';

export default {
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      day:'',
      message: '',
    };
  },
  async mounted() {
    this.day = dayjs().format('YYYY-MM-DD');
    this.message = await fetch('localhost:8090/getData')
      .then(response => response.json())
      .catch(error => this.error = error)
  },
};
</script>
