<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background-color: #2c2c2c"
  >
    <div class="column">
      <q-card
        rounded-borders
        bordered
        bg-yellow-8
        class="q-pa-lg q-mb-sm shadow-1"
      >
        <img alt="Cempre logo" src="~assets/logo-cempre-sem-fundo.png" />
      </q-card>
      <div class="row">
        <q-card rounded-borders bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                outlined
                v-model="email"
                type="email"
                label="email"
              />
              <q-input
                square
                filled
                clearable
                outlined
                v-model="password"
                type="password"
                label="password"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              color="yellow-8"
              text-color="grey-8"
              size="lg"
              class="full-width"
              label="Entrar"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Recuperar senha</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "CmpLogin",
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
