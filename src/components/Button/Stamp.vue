<template>
  <Wrapper
    direction="column"
    align="center"
    class="stamp-wrapper text-not-select"
    :class="{ disabled, warning }"
  >
    <span :class="color" class="material-icons icon">
      {{ icon }}
    </span>
    <label :class="color" data-test="text">{{ text }}</label>
  </Wrapper>
</template>

<script lang="ts">
import Wrapper from '@/components/Layout/Wrapper.vue';

export default {
  name: 'Stamp',
  props: {
    disabled: Boolean,
    warning: Boolean,
    icon: String,
    text: String,
    color: String,
  },
  components: { Wrapper },
};
</script>

<style lang="scss" scoped>
.stamp-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: $border-radius;
  border: $border-width solid $dark-blue;
  padding: 1rem;
  width: 7rem;
  height: 7rem;

  span {
    font-size: 3rem;
    color: $dark-blue;
  }

  label {
    display: flex;
    justify-content: center;
    text-align: center;
    color: $dark-blue;
    font-weight: bold;
  }

  &:hover,
  label:hover {
    cursor: pointer;
  }

  &:active {
    color: white;
    background-color: $blue;
    border-color: $dark-blue;

    span,
    label {
      color: $dark-blue;
    }
  }
}

.disabled {
  background-color: $gray !important;
  border-color: $dark-gray !important;
  span,
  label {
    color: $dark-gray !important;
  }
}

.warning {
  background-color: $light-red;
  border-color: $red;
  span,
  label {
    color: white !important;
  }
}
</style>
