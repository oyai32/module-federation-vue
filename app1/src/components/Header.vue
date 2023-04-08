<template>
  <div>
    <h1>{{ name }}</h1>
    <div>使用 dayjs：{{ day }}</div>
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
      day:''
    };
  },
  async mounted() {
    this.day = dayjs().format('YYYY-MM-DD');
  },
};
</script>
