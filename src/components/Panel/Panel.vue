<template>
  <div class="panel">
    <div class="title-wrapper">
      <Title>myhouse</Title>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import Title from '@/components/Layout/Title.vue';

export default { name: 'Layout',
  components: { Title } };
</script>

<style lang="scss" scoped>
.panel {
  padding: 1rem;
  background-color: white;
  border-radius: $border-radius;
  height: 25rem;
  width: 300px;
}

.title-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 3rem;
  font-weight: bold;
  color: $dark-blue;
}

@media only screen and (max-width: $small-max-width) {
  .panel {
    min-width: 100px !important;
    width: 100vh !important;
    max-width: 100vh !important;
  }
}
</style>
