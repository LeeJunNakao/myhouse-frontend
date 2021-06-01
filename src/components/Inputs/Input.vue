<template>
  <div name="input" class="input-wrapper">
    <label v-if="label">{{ label }}</label>
    <Wrapper justify="space-between" class="wrapper">
      <input
        :value="value"
        @input="setValue($event.target.value)"
        :type="type || 'text'"
        data-test="input"
        :placeholder="placeholder"
      />
      <slot name="icon"></slot>
    </Wrapper>
  </div>
</template>

<script lang="ts">
import Wrapper from '@/components/Layout/Wrapper.vue';

export default {
  name: 'Input',
  components: {
    Wrapper,
  },
  props: {
    label: String,
    placeholder: String,
    type: String,
    value: { required: true, type: String },
    setValue: { required: true, type: Function },
  },
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: grid;
  grid-template-columns: 4rem 1fr;
  .wrapper {
    border: $border-width solid $dark-blue;
    border-radius: $border-radius;
    height: 100%;
    padding-left: 0.5rem;
    align-items: center;

    input {
      border: none;

      &:focus {
        outline: none;
      }
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
