<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="text-secondary">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-bold">
          Cempre - Cadastro de empresas
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header class="text-bold shadow-7"> MENU </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <transition
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
      >
        <router-view />
      </transition>
    </q-page-container>

    <q-dialog v-show="false"> <CmpCadastro /></q-dialog>

    <q-footer class="text-center text-dark">
      &copy;2022 BTMS - Cempre - Todos os direitos reservados.
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import CmpCadastro from "components/CmpCadastro.vue";

const session = JSON.parse(sessionStorage.getItem("sessionx"));

const linksList = [
  {
    title: "Cadastro da empresa",
    icon: "mdi-database-plus",
    link: "/cadastro/" + session.cnpj,
  },
  {
    title: "Enviar convite",
    icon: "mdi-mail",
    link: "/convites",
  },

  {
    title: "Sair",
    icon: "logout",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    CmpCadastro,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
