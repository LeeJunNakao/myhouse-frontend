<template>
  <div class="error">
      <label>{{ message }}</label>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    message: {
      required: true,
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
    width: 100%;

    label {
        font-size: 0.7rem;
        color: $red;
        text-align: justify;
        text-justify: inter-word;
    }
}
</style>
