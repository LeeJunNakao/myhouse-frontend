<template>
  <transition name="form">
    <Wrapper class="form-wrapper" justify="center" v-show="showForm">
      <Input
        placeholder="Nome da casa"
        :class="{ deleting: isDeleting }"
        :value="name"
        :setValue="(n) => setName(n)"
        @keypress.enter="handleSubmit"
      >
        <template v-slot:icon v-if="isEditing">
          <span class="material-icons icon" @click="handleDelete">
            delete
          </span>
        </template>
      </Input>
      <Wrapper justify="center">
        <Button :text="buttonText" :handleClick="handleSubmit" />
      </Wrapper>
    </Wrapper>
  </transition>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { inject, computed, ref, watch } from 'vue';
import Wrapper from '@/components/Layout/Wrapper.vue';
import Input from '@/components/Inputs/Input.vue';
import Button from '@/components/Button/Button.vue';
import { Data, Ref } from '@/protocols/composition';
import { FormHandler, ServiceHandler } from '@/composition/houses';

export default {
  name: 'Form',
  props: {
    showForm: Boolean,
    name: String,
    buttonText: String,
    setName: Function,
  },
  components: { Wrapper, Input, Button },
  setup(props: Data): Data {
    const store = useStore();
    const serviceHandler = new ServiceHandler(store);
    const formHandler: FormHandler | undefined = inject('formHandler');
    const name = computed<string>(() => props.name);
    const isEditing: Ref<boolean> | undefined = inject('isEditing');
    const isDeleting = ref<boolean>(false);

    const selectedHouse = computed(() => formHandler?.getSelectedItem());
    watch(selectedHouse, (house) => {
      if (!house) isDeleting.value = false;
    });

    const goBack = (): void => {
      if (formHandler?.handleBack) formHandler.handleBack();
    };

    const handleSubmit = async () => {
      const houseData = selectedHouse.value;
      const house =
        isEditing?.value && houseData
          ? await serviceHandler.updateHouse({
            ...houseData,
            name: name.value,
          })
          : await serviceHandler.createHouse(name.value);
      goBack();
      if (house) formHandler?.selectItem(house);
    };

    const handleDelete = async () => {
      if (isDeleting.value) {
        await serviceHandler.deleteHouse();
        goBack();
      }
      isDeleting.value = true;
    };

    return { handleSubmit, isEditing, handleDelete, isDeleting };
  },
};
</script>

<style scoped lang="scss">
.form-wrapper::v-deep {
  flex-wrap: wrap;
  margin-top: 1rem;
  height: 2.2rem;
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 1rem;

  .input-wrapper {
    height: 100%;
    grid-template-columns: 1fr;

    input {
      height: 100%;
      width: 100%;
    }
  }
}

.form-enter-active {
  animation: disappear 0.5s reverse;
}

.form-leave-active {
  animation: disappear 0.5s;
}

.icon {
  font-size: 1rem;
  color: $dark-blue;
  margin-right: 0.5rem;

  &:active {
    color: $blue;
  }
}

.deleting::v-deep {
  .wrapper {
    border-color: $red;
  }
  span {
    color: $red;
  }
}
</style>
