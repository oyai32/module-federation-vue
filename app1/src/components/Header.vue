<template>
  <div>
    <h1>{{ name }}</h1>
  </div>
</template>
<script>

export default {
  props: {
    name: {
      type: String,
      default: '',
    },
  },
};
</script>
