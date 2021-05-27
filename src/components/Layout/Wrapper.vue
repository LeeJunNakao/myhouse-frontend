<template>
  <div
    class="wrapper"
    ref="wrapper"
    :class="{
      'wrapper-grid': grid,
      'wrapper-width-full': full,
      'justify-center': justify === 'center',
      'justify-start': justify === 'start',
      'justify-end': justify === 'end',
      'justify-space-between': justify === 'space-between',
      'align-start': align === 'start',
      'align-center': align === 'center',
      'align-end': align === 'end',
      'template-columns': templateColumns,
      'wrapper-flex-column': direction === 'column',
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
  props: {
    full: Boolean,
    grid: Boolean,
    direction: String,
    width: String,
    justify: String,
    align: String,
    templateColumns: String,
  },
  watch: {
    width: {
      immediate: true,
      handler(w) {
        if (w) this.$refs.wrapper.style.width = w;
      },
    },
    templateColumns: {
      immediate: true,
      handler(template) {
        if (template) this.$refs.wrapper.style.gridTemplateColumn = template;
      },
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
}

.wrapper-flex-column {
  flex-direction: column;
}

.wrapper-grid {
  display: grid;
}

.wrapper-width-full {
  width: 100%;
}

.justify-center {
  justify-content: center;
}

.justify-start {
  justify-content: flex-start;
}

.justify-end {
  justify-content: flex-end;
}

.justify-space-between {
  justify-content: space-between;
}

.align-center {
  align-items: center;
}

.align-start {
  align-items: flex-start;
}

.align-end {
  align-items: flex-end;
}
</style>
