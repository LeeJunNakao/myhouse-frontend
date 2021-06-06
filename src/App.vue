<template>
  <div class="loading-wrapper" v-if="isLoading">
    <Loading />
  </div>
  <router-view v-else />
</template>

<script lang="ts">
import { watch, computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import AuthStore from '@/composition/auth';
import UserStore from '@/composition/user';
import { Data } from '@/protocols/composition';
import Loading from '@/components/Loading/Loading.vue';
import * as authService from '@/services/auth';
import { ServiceHandler as HouseServiceHandler } from '@/composition/houses';
import { ServiceHandler as PurchasesServiceHandler } from '@/composition/purchases';

export default {
  name: 'Home',
  setup(): Data {
    const store = useStore();
    const houseServiceHandler = new HouseServiceHandler(store);
    const purchasesServiceHandler = new PurchasesServiceHandler(store);
    const router = useRouter();
    const route = useRoute();
    const auth = new AuthStore(store);
    const userStore = new UserStore(store);
    const isAuthenticated = computed(() => auth.getIsAuthenticated());
    const accessToken = computed(() => auth.getToken());
    const isLoading = ref(true);

    const validateToken = async (token: string | null): Promise<void> => {
      isLoading.value = true;
      try {
        if (token) {
          const userData = await authService.validateToken({ token });
          auth.setToken(token);
          auth.authenticate();
          userStore.setUserData(userData);
        }
      } catch {
        auth.logout();
      }
      isLoading.value = false;
    };

    router.beforeEach((to, from) => {
      if (
        !isAuthenticated.value &&
        to.path !== '/login' &&
        to.path !== '/register' &&
        to.path !== '/recover-password'
      ) {
        router.push({ name: 'Login' });
      }
    });

    watch(
      isAuthenticated,
      (newValue) => {
        if (!newValue) {
          if (route.path !== '/') router.push({ name: 'Login' });
        } else router.push({ name: 'Home' });
      },
      { immediate: true },
    );

    watch(accessToken, validateToken, { immediate: true });

    onMounted(async () => {
      await houseServiceHandler.getHouses();
      await purchasesServiceHandler.getPurchases();
    });

    return { isAuthenticated, isLoading };
  },
  components: { Loading },
};
</script>

<style lang="scss">
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>

<style scoped>
.loading-wrapper {
  height: 100vh;
  width: 100vw;
}
</style>
