<template>
  <div class="home-wrapper">
    <Page>
      <Panel>
        <UserInfo />
        <UserHouses :selectDisabled="selectDisabled" />
        <Buttons
          :setShowForm="setShowForm"
          :showForm="showForm"
          :selectedHouse="selectedHouse"
          @changeEditMode="setIsEditing"
          @changeCreateMode="setFormData"
        />
        <Form :showForm="showForm" :name="name" :setName="setName" :buttonText="buttonText" />
        <MessageBox
          v-if="responseMessage.message"
          :text="responseMessage.message"
          :error="responseMessage.type === 'error'"
        />
      </Panel>
    </Page>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { ref, onMounted, watch, computed, provide } from 'vue';
import { Data } from '@/protocols/composition';
import Page from '@/components/Page/Page.vue';
import Panel from '@/components/Panel/Panel.vue';
import { FormHandler, ServiceHandler } from '@/functions/houses';
import UserInfo from './components/UserInfo.vue';
import UserHouses from './components/UserHouses.vue';
import Buttons from './components/Buttons.vue';
import Form from './components/Form.vue';
import MessageBox from '@/components/MessageBox/MessageBox.vue';

export default {
  name: 'Home',
  components: {
    Page,
    Panel,
    UserInfo,
    UserHouses,
    Buttons,
    Form,
    MessageBox,
  },
  setup(): Data {
    const store = useStore();
    const formHandler = new FormHandler(store);
    const showForm = ref(false);
    const selectDisabled = ref(false);
    const isEditing = ref(false);
    const name = ref('');
    const selectedHouse = computed(() => {
      const house = formHandler.getSelectedHouse();
      return { ...house, label: house?.name };
    });
    const responseMessage = computed(() => formHandler.getResponseMessage());

    const setName = (n: string) => {
      name.value = n;
    };

    const setShowForm = (show: boolean) => {
      showForm.value = show;
    };

    const setFormData = (mode: boolean) => {
      if (mode) {
        name.value = selectedHouse.value?.label || '';
        selectDisabled.value = true;
      } else {
        name.value = '';
        selectDisabled.value = false;
      }
    };
    const setIsEditing = (editing: boolean) => {
      isEditing.value = editing;
      setFormData(editing);
    };

    const buttonText = computed(() => {
      if (isEditing.value) return 'Editar';
      return 'Salvar';
    });

    onMounted(() => {
      watch(selectedHouse, (house) => {
        if (!house) setName('');
      });
    });

    provide('isEditing', isEditing);
    provide('formHandler', formHandler);
    return {
      setShowForm,
      showForm,
      selectedHouse,
      setName,
      name,
      selectDisabled,
      setIsEditing,
      setFormData,
      buttonText,
      responseMessage,
    };
  },
};
</script>

<style scoped lang="scss">
.home-wrapper::v-deep {
  width: 100vw;

  .title-wrapper {
    margin-bottom: 2rem;
  }

  .message {
    margin-top: 1rem;
  }
}
</style>
