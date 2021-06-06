<template>
  <div class="input-wrapper" :class="{ 'no-label': !label }">
    <label v-if="label">{{ label }}</label>
    <Wrapper justify="space-between" class="wrapper" full>
      <slot name="prepend"></slot>
      <input
        ref="input"
        @keypress="handleKeyPress"
        @keydown.backspace="shouldValidate = false"
        @input="setPreview($event.target.value)"
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
import { ref, computed, watch } from 'vue';
import Wrapper from '@/components/Layout/Wrapper.vue';
import { Data } from '@/protocols/composition';
import { acceptOnlyNumbers, acceptDateFormat, setInputValueFormatted } from '@/composition/input';
import { getOnlyNumberString } from '@/composition/parser';

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
    // { regex: /regex/, date: Boolean}
    numericInput: Object,
  },
  setup(props: Data): Data {
    const inputValue = computed(() => props.value);
    const setValue = computed(() => props.setValue).value;
    const input = ref<HTMLInputElement | null>(null);
    const preview = ref('');
    const regex = computed(() => props.numericInput.regex);
    const isNumericInput = ref(props.numericInput);
    const shouldValidate = ref(true);

    const setPreview = (value: string) => {
      if (isNumericInput.value?.date) {
        preview.value = getOnlyNumberString(value);
      } else {
        preview.value = value;
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      shouldValidate.value = true;
      if (isNumericInput.value) {
        acceptOnlyNumbers(input.value as HTMLInputElement, inputValue.value, event, regex.value);
      }
      if (isNumericInput.value?.date) {
        acceptDateFormat(input.value as HTMLInputElement, preview.value, event);
      }
    };

    watch(preview, (p: string) => {
      if (isNumericInput.value?.date && shouldValidate.value) setInputValueFormatted(p, setValue);
      else setValue(p);
    });

    return {
      input,
      inputValue,
      handleKeyPress,
      setPreview,
      shouldValidate,
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
      font-size: 1rem;

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
