<template>
  <Wrapper
    direction="column"
    align="center"
    class="stamp-wrapper text-not-select"
    :class="{ disabled }"
  >
    <span :class="color" class="material-icons icon">
      {{ icon }}
    </span>
    <label :class="color">{{ text }}</label>
  </Wrapper>
</template>

<script lang="ts">
import Wrapper from '@/components/Layout/Wrapper.vue';

export default {
  name: 'Stamp',
  props: {
    disabled: Boolean,
    icon: String,
    text: String,
    color: String,
  },
  components: {
    Wrapper,
  },
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
  background-color: #dfdfdf !important;
  border-color: #949494 !important;
  span,
  label {
    color: #949494 !important;
  }
}
</style>
