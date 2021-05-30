<template>
  <label class="title">
    <slot></slot>
  </label>
</template>

<script>
export default { name: 'Title',
  props: { text: String } };
</script>

<style scoped>
.title {
  font-size: 2rem !important;
  margin: 0;
}
</style>
