<template>
  <div data-test="message-box" class="message text-not-select" :class="{ error }">
    <label>{{ text }}</label>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MessageBox',
  props: {
    text: String,
    error: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: $border-radius;
  padding: 1rem;
  border: 0.2rem solid $dark-blue;
  color: $dark-blue;
  margin-top: 2rem;
}

.error {
  border: $border-width solid $red;
  color: $red;
}
</style>
