<template>
  <div class="loading">
      Loading...
  </div>
</template>

<script>
export default {
  name: 'Loading',
};
</script>

<style lang="scss" scoped>
.loading {
    width: 100%;
    height: 100%;
    background-color: $blue;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $dark-blue;
    font-family: -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif;
    font-weight: bold;
}
</style>
