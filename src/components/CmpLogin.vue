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
                outlined
                v-model="form.empresa"
                type="text"
                label="Empresa"
              />
              <q-input
                square
                filled
                outlined
                v-model="form.login"
                type="text"
                label="Login"
              />
              <q-input
                square
                filled
                outlined
                v-model="form.senha"
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
              @click="autenticar()"
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
import { defineComponent, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import servAutenticacao from "src/services/ServAutenticacao.js";

export default defineComponent({
  name: "CmpLogin",
  setup() {
    const serv = servAutenticacao();
    const $q = useQuasar();
    const form = ref({
      empresa: "",
      login: "",
      senha: "",
    });
    //
    $q.notify.setDefaults({
      position: "top",
      timeout: 2500,
      textColor: "black",
    });
    // Mounted
    onMounted(() => {
      //autenticar();
      $q.notify({
        type: "positive",
        message: "Iniciou !!!",
      });
    });

    return {
      serv,
      form,
    };
  },
  // Methods
  methods: {
    //Autenticar
    async autenticar() {
      console.log("aqui", this.form);

      try {
        if (
          !this.form.empresa ||
          !this.form.login ||
          !this.form.senha ||
          this.form.empresa.length < 3 ||
          this.form.login.length < 3 ||
          this.form.senha.length < 3
        ) {
          this.$q.notify({
            type: "negative",
            message: "Os campos Empresa, Login e Senha são obrigatórios",
          });
          return false;
        }

        const dados = Object.assign(this.form);

        const res = await this.serv.autenticacaoLogin(dados);
        console.log("res", res);

        if (res.info[0].msg.length > 0) {
          this.$q.notify({
            type: "negative",
            message: res.info[0].msg,
          });
          return false;
        }

        if (res.dados && res.dados[0].chave) {
          sessionStorage.setItem("sessionx", JSON.stringify(res.dados[0]));
          //Recupera a session
          const sessionx = JSON.parse(sessionStorage.getItem("sessionx"));
          sessionStorage.setItem("chave", sessionx.chave);
          this.$router.push("cadastro");
        } else {
          this.$q.notify({
            type: "negative",
            message: res.info[0].msg,
          });
          return false;
        }

        console.log("Res Login: ", res);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>

<style>
.q-card {
  width: 360px;
}
</style>
