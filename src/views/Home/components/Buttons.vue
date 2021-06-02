<template>
  <Wrapper full align="center" justify="space-between" class="button-wrapper">
    <Stamp
      :icon="config.first.icon"
      :text="config.first.text"
      :disabled="config.first.disabled"
      @click="config.first.handler"
      class="transition-ease"
    />

    <Stamp
      :icon="config.second.icon"
      :text="config.second.text"
      :disabled="config.second.disabled"
      @click="config.second.handler"
      class="transition-ease"
    />
  </Wrapper>
</template>

<script lang="ts">
import { ref, toRefs, computed, onMounted, watch, inject } from 'vue';
import { useStore } from 'vuex';
import { Data, SetupContext } from '@/protocols/composition';
import Wrapper from '@/components/Layout/Wrapper.vue';
import Stamp from '@/components/Button/Stamp.vue';
import { FormHandler } from '@/functions/houses';

export default {
  name: 'Buttons',
  components: { Wrapper, Stamp },
  props: {
    showForm: Boolean,
    setShowForm: Function,
    selectedHouse: Object,
  },
  setup(props: Data, { emit }: SetupContext): Data {
    const formHandler: FormHandler | undefined = inject('formHandler');
    const house = computed(() => formHandler?.getSelectedHouse());
    const newHouseMode = ref(false);
    const editMode = ref(false);
    const { showForm } = toRefs(props);

    const handleNewHouse = () => {
      props.setShowForm(true);
      newHouseMode.value = true;
    };
    const handleEditMode = () => {
      editMode.value = true;
      newHouseMode.value = false;
    };
    const handleBack = () => {
      props.setShowForm(false);
      editMode.value = false;
      newHouseMode.value = false;
      formHandler?.selectHouse(null);
    };
    if (formHandler) formHandler.handleBack = handleBack;

    const config = computed(() => {
      const newHouse = {
        text: 'Nova casa',
        icon: 'cottage',
        handler: handleNewHouse,
      };

      const back = {
        text: 'Voltar',
        icon: 'backspace',
        handler: handleBack,
      };

      const edit = {
        text: 'Editar',
        icon: 'mode_edit',
        handler: handleEditMode,
      };

      const purchase = {
        text: 'Compras',
        icon: 'attach_money',
        handler: handleBack,
      };

      const unselected = {
        first: newHouseMode.value ? { ...newHouse, disabled: true } : newHouse,
        second: newHouseMode.value ? back : { ...back, disabled: true },
      };

      const selected = {
        first: edit,
        second: showForm.value ? back : purchase,
      };

      if (house.value) return selected;
      return unselected;
    });

    onMounted(() => {
      watch(house, (h) => {
        newHouseMode.value = false;
        if (!h) {
          props.setShowForm(false);
        }
      });
      watch(newHouseMode, (mode) => {
        if (mode) props.setShowForm(true);
        emit('changeCreateMode', mode);
      });
      watch(editMode, (mode) => {
        if (mode) props.setShowForm(true);
        emit('changeEditMode', mode);
      });
    });

    return {
      config,
    };
  },
};
</script>

<style scoped lang="scss">
.button-wrapper {
  margin-top: 1rem;
}

.box {
  width: 30px;
  height: 30px;
  background: teal;
  margin-top: 20px;
}

.new-house-enter-active,
.back-enter-active {
  animation: disappear 0.5s reverse;
}

.new-house-leave-active,
.back-leave-active {
  animation: disappear 0.5s;
}
</style>
