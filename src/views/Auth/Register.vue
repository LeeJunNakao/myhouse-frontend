<template>
  <Layout buttonText="Registrar" footerPath="/" footerText="logar">
    <Input label="Nome" />
    <Input label="Email" />
    <Input label="Senha" />
    <Input label="Repita Senha" />
  </Layout>
</template>

<script>
import Input from '@/components/Inputs';
import Layout from './Layout.vue';

export default {
  components: {
    Layout,
    Input,
  },
};
</script>

<style>
.input-wrapper + .input-wrapper {
  margin-top: 1rem;
}
</style>
