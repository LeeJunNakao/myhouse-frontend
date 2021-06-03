<template>
  <div class="button-wrapper">
    <button @click="handleClick" data-test="button">{{ text }}</button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: { type: String, required: true },
    handleClick: { type: Function, required: true },
  },
};
</script>

<style lang="scss" scoped>
.button-wrapper {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: $border-radius;
  z-index: 10;

  button {
    z-index: 1;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background-color: $dark-blue;
    border: none;
    border-radius: $border-radius;
    color: white;
    font-weight: bold;
    height: 2.5rem;
    box-sizing: border-box;

    &:focus {
      outline: none;
    }

    &:active {
      opacity: 0.3;
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
