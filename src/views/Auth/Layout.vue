<template>
  <Page>
    <div class="box">
      <div class="title-wrapper">
        <Title>myhouse</Title>
      </div>
      <slot></slot>
      <div class="box__button-wrapper">
        <Button :text="buttonText" :handleClick="handleSubmit" />
      </div>
      <div class="box__footer">
        <a :href="footerPath">{{ footerText }}</a>
      </div>
    </div>
  </Page>
</template>

<script>
import Page from '@/components/Page';
import Title from '@/components/Layout/Title.vue';
import Button from '@/components/Button/Button.vue';

export default {
  name: 'Layout',
  props: {
    buttonText: {
      required: true,
      type: String,
    },
    footerPath: {
      required: true,
      type: String,
    },
    footerText: {
      required: true,
      type: String,
    },
    handleSubmit: {
      required: true,
      type: String,
    },
  },
  components: {
    Page,
    Title,
    Button,
  },
};
</script>

<style lang="scss" scoped>
.box {
  background-color: white;
  border-radius: $border-radius;
  width: fit-content;
  padding: 1rem;
  color: $dark-blue;
}

.title-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 3rem;
  font-weight: bold;
  color: $dark-blue
}

.box__footer {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

a {
  font-weight: bold;
}

.box__button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
</style>
