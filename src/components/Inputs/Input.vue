<template>
  <div class="input-wrapper" :class="{ 'no-label': !label }">
    <label v-if="label">{{ label }}</label>
    <Wrapper justify="space-between" class="wrapper" full>
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
  height: 2.5rem;
  overflow: hidden;
  width: 100%;

  .wrapper {
    border: $border-width solid $dark-blue;
    border-radius: $border-radius;
    height: 100%;
    padding-left: 0.5rem;
    align-items: center;

    input {
      border: none;
      background-color: transparent;
      width: 100%;

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

.no-label {
  grid-template-columns: 1fr;
}
</style>
