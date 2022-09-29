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
                v-model="empresa"
                type="text"
                label="Empresa"
              />
              <q-input
                square
                filled
                clearable
                outlined
                v-model="login"
                type="text"
                label="Login"
              />
              <q-input
                square
                filled
                clearable
                outlined
                v-model="senha"
                type="password"
                label="Senha"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              icon="login"
              color="yellow-8"
              text-color="grey-10"
              size="md"
              class="full-width"
              label="Entrar"
            />
          </q-card-actions>
        </q-card>
      </div>
      <div bordered class="row q-mt-sm">
        <q-btn
          size="sm"
          class="col text-caption"
          flat
          dense
          icon="mdi-database-plus"
          @click="void 0"
          label="Cadastrar"
        />
        <q-btn
          size="sm"
          class="col text-caption"
          flat
          dense
          icon="mdi-lock-reset"
          aria-label="Menu"
          @click="void 0"
          label="Recuperar senha"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import servAutenticacao from "src/services/ServAutenticacao.js";

export default {
  name: "CmpLogin",
  setup() {
    const { autenticacaoLogin } = servAutenticacao();
    return {
      autenticacaoLogin,
      empresa: "",
      login: "",
      senha: "",
    };
  },
  mounted() {
    this.autenticar();
  },
  methods: {
    autenticar() {
      const empresa = "";
      const login = "";
      const senha = "";
      const res = this.autenticacaoLogin(empresa, login, senha);
      console.log("Res Login: ", res);
    },
    //
  },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
