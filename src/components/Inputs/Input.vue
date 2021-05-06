<template>
  <div name="input" class="input-wrapper">
    <label>{{ label }}</label>
    <input
      :value="value"
      @input="setValue($event.target.value)"
      :type="type || 'text'"
      data-test="input"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'Input',
  props: {
    label: String,
    value: {
      required: true,
      type: String,
    },
    setValue: {
      required: true,
      type: Function,
    },
    type: String,
  },
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  input {
    border: 0.15rem solid #126e82;
    border-radius: $border-radius;
    height: 1.5rem;

    &:focus {
      outline: none;
    }
  }

  label {
    display: flex;
    width: 4rem;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
