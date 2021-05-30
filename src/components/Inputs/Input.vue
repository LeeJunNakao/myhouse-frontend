<template>
  <div name="input" class="input-wrapper">
    <label v-if="label">{{ label }}</label>
    <input
      :value="value"
      @input="setValue($event.target.value)"
      :type="type || 'text'"
      data-test="input"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts">
export default { name: 'Input',
  props: { label: String,
    placeholder: String,
    type: String,
    value: { required: true,
      type: String },
    setValue: { required: true,
      type: Function } } };
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: grid;
  grid-template-columns: 4rem 1fr;
  input {
    border: $border-width solid $dark-blue;
    border-radius: $border-radius;
    height: 1.5rem;
    padding-left: .5rem;

    &:focus {
      outline: none;
    }
  }

  label {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
