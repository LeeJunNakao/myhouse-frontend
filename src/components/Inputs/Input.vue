<template>
  <div class="input-wrapper" :class="{ 'no-label': !label }">
    <label v-if="label">{{ label }}</label>
    <Wrapper justify="space-between" class="wrapper" full>
      <input
        ref="input"
        @keypress="handleKeyPress"
        @input="setValue($event.target.value)"
        :value="value"
        :type="type || 'text'"
        :placeholder="placeholder"
        data-test="input"
      />
      <slot name="icon"></slot>
    </Wrapper>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import Wrapper from '@/components/Layout/Wrapper.vue';
import { Data } from '@/protocols/composition';
import { acceptOnlyNumbers } from '@/composition/input/numeric-input';

export default {
  name: 'Input',
  components: {
    Wrapper,
  },
  props: {
    label: String,
    placeholder: String,
    type: String,
    value: { required: true, type: [String, Number] },
    setValue: { required: true, type: Function },
    numericInput: Boolean,
    regex: RegExp,
  },
  setup(props: Data): Data {
    const inputValue = computed(() => props.value);
    const input = ref<HTMLInputElement | null>(null);
    const regex = computed(() => props.regex);
    const isNumericInput = ref(props.numericInput);

    const handleKeyPress = (event: KeyboardEvent) => {
      if (isNumericInput.value) {
        acceptOnlyNumbers(input.value as HTMLInputElement, inputValue.value, event, regex.value);
      }
    };

    return {
      input,
      inputValue,
      handleKeyPress,
    };
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
