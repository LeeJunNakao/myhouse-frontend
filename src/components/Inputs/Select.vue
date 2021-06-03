<template>
  <Wrapper direction="column" class="select-wrapper" :class="{ disabled }">
    <Wrapper full justify="space-between" class="input-wrapper">
      <input
        v-model="searchValue"
        @focus="expand = true"
        @blur="handleBlur"
        @input="shouldSearch = true"
        name="select-component"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="{ 'text-not-select': disabled }"
      />
      <span
        class="material-icons icon"
        tabindex="0"
        @click="handleClick"
        @blur="handleBlur"
        name="select-component"
      >
        {{ expand ? 'expand_less' : 'expand_more' }}
      </span>
    </Wrapper>
    <div class="options-axiliar">
      <div class="options-wrapper" v-show="expand" name="select-component">
        <div
          class="list-navigate"
          @click="goBackward"
          name="select-component"
          tabindex="0"
          @blur="handleBlur"
        >
          <span class="material-icons icon upside-down">
            arrow_drop_down
          </span>
        </div>
        <div
          class="option text-not-select"
          v-for="(option, index) in displayedOptions"
          :key="index"
          tabindex="0"
          @blur="handleBlur"
          @click="handleSelect(option)"
          name="select-component"
        >
          {{ option.label || option }}
        </div>
        <div
          class="list-navigate"
          @click="goFoward"
          name="select-component"
          tabindex="0"
          @blur="handleBlur"
        >
          <span class="material-icons icon">
            arrow_drop_down
          </span>
        </div>
      </div>
    </div>
  </Wrapper>
</template>

<script lang="ts">
import { ref, computed, watch, toRefs } from 'vue';
import Wrapper from '@/components/Layout/Wrapper.vue';
import { Data, SetupContext } from '@/protocols/composition';

interface Option {
  label: string;
}

export default {
  name: 'Select',
  props: {
    disabled: Boolean,
    placeholder: String,
    /* A plain string[] string or Option[] */
    options: Array,
  },
  components: { Wrapper },
  setup(props: Data, { emit }: SetupContext): Data {
    const searchValue = ref('');
    const expand = ref(false);
    const currentOptionIndex = ref(0);
    const optionsSizeToDisplay = 4;
    const options = computed(() => props.options);
    const selectedOption = ref('');
    const shouldSearch = ref(false);
    const { disabled } = toRefs(props);

    const handleClick = () => {
      if (!disabled.value) expand.value = !expand.value;
    };
    const handleBlur = (event: any) => {
      if (!event.relatedTarget || event.relatedTarget.getAttribute('name') !== 'select-component') {
        expand.value = false;
      }
    };

    const handleSelect = (option: any) => {
      selectedOption.value = option;
      expand.value = false;
      shouldSearch.value = false;
      emit('handleSelect', option);
    };

    const filteredOptions = computed(() => {
      const word = searchValue.value;
      if (word && shouldSearch.value) {
        const filteredWords = options.value.filter((option: Option | string) => {
          const optionsIsString: boolean = typeof option === 'string';
          const normalizedOption = optionsIsString
            ? (option as string).toLowerCase()
            : (option as Option).label.toLowerCase();
          const normalizedWord = word.toLowerCase();
          return normalizedOption.match(normalizedWord);
        });
        return filteredWords;
      }
      return options.value;
    });

    const displayedOptions = computed(() => {
      const currentIndex = currentOptionIndex.value;
      return filteredOptions.value.slice(currentIndex, currentIndex + optionsSizeToDisplay) || [];
    });

    const goFoward = () => {
      const currentIndex = currentOptionIndex.value;
      if (currentIndex + optionsSizeToDisplay < options.value.length) {
        currentOptionIndex.value += 1;
      }
    };

    const goBackward = () => {
      const currentIndex = currentOptionIndex.value;
      if (currentIndex >= 1) {
        currentOptionIndex.value -= 1;
      }
    };

    watch(expand, (value) => {
      if (!value) currentOptionIndex.value = 0;
    });

    watch(searchValue, (value) => {
      if (!value) {
        handleSelect(null);
      }
    });

    watch(selectedOption, (option: Option | string) => {
      if (option) {
        searchValue.value = '';
        if (typeof option === 'object') searchValue.value = option.label;
        else searchValue.value = option;
      }
    });

    return {
      searchValue,
      expand,
      handleClick,
      handleBlur,
      currentOptionIndex,
      displayedOptions,
      goFoward,
      goBackward,
      filteredOptions,
      handleSelect,
      shouldSearch,
    };
  },
};
</script>

<style scoped lang="scss">
$options-padding: 0.5rem;

.select-wrapper {
  border: $border-width solid $dark-blue;
  border-radius: $border-radius;
  height: 2rem;
  width: 100%;

  input {
    border: 0;
    height: 100%;
  }
}

.options-axiliar {
  position: relative;
  width: 100%;
}

.options-wrapper {
  position: absolute;
  top: 10px;
  width: 100%;
  border: 0.15rem solid $dark-blue;
  z-index: 100;
}

.option {
  display: flex;
  padding: $options-padding;
  border-bottom: 0.1rem solid $dark-blue;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: white;
  justify-content: center;
  z-index: 100;
  color: $dark-blue;

  &:hover {
    cursor: pointer;
    background-color: $blue;
  }

  &:last-child {
    border-bottom: none;
  }
}

.list-navigate {
  padding: $options-padding;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: $dark-blue;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: $dark-blue;
    color: white;
  }

  &:first-child {
    border-bottom: 0.1rem solid $dark-blue;
  }
}

.disabled {
  background-color: $gray;
  color: $dark-gray;
  input {
    background: $gray;
    color: $dark-gray;
  }
}

.input-wrapper {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
</style>
