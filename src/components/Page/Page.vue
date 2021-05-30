<template>
  <div class="page-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default { name: 'PageWrapper' };
</script>

<style scoped lang="scss">
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $blue;
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
