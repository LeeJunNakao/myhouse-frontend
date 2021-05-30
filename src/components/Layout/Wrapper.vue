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
      'wrapper-flex-column': direction === 'column',
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Data } from '@/protocols/composition';
import { setStyleProperty } from '@/functions/setter';

export default { name: 'Wrapper',
  props: { full: Boolean,
    grid: Boolean,
    direction: String,
    width: String,
    justify: String,
    align: String,
    templateColumns: String,
    gapColumns: String },
  setup(props: Data): Data {
    const wrapper = ref<any>(null);
    const width = ref(props.width);
    onMounted(() => {
      watch(
        width,
        (w) => {
          setStyleProperty(wrapper, 'width', w);
        },
        { immediate: true },
      );
      const templateColumns = ref(props.templateColumns);
      watch(
        templateColumns,
        (columns) => {
          setStyleProperty(wrapper, 'grid-template-columns', columns);
        },
        { immediate: true },
      );
      const gapColumns = ref(props.gapColumns);
      watch(
        gapColumns,
        (gap) => {
          setStyleProperty(wrapper, 'gap-columns', gap);
        },
        { immediate: true },
      );
    });

    return { wrapper };
  } };
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
