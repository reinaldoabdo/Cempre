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
        <q-card
          rounded-borders
          bordered
          class="q-pa-sm shadow-1"
          style="height: 400px"
        >
          <!-- LOGIN -->

          <q-card-section v-show="show_form_login" key="1">
            <q-form class="q-gutter-md" key="2">
              <div class="text-h5 text-center">Entrar</div>

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
              <q-card-actions class="">
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
            </q-form>
          </q-card-section>

          <!--CADASTRO-->

          <q-card-section v-show="show_form_cadastro" key="3">
            <q-form class="q-gutter-md" key="4">
              <div class="text-h5 text-center">Cadastro</div>

              <q-input
                square
                filled
                outlined
                v-model="form.cnpj"
                type="text"
                label="CNPJ"
                mask="##.###.###/####-##"
              />

              <q-card-actions class="q-px-md">
                <q-btn
                  icon="mdi-database-plus"
                  color="yellow-8"
                  text-color="grey-10"
                  size="md"
                  class="col"
                  label="Cadastrar"
                  @click="cadastrar()"
                />
              </q-card-actions>
            </q-form>
          </q-card-section>

          <!--RECUPERAR SENHA-->

          <q-card-section v-show="show_form_recuperar_senha">
            <q-form class="q-gutter-md">
              <div class="text-h5 text-center">Recuperar senha</div>

              <q-input
                square
                filled
                outlined
                v-model="form.cnpj"
                type="text"
                label="E-Mail"
              />

              <q-card-actions class="q-px-md">
                <q-btn
                  icon="mdi-lock-reset"
                  color="yellow-8"
                  text-color="grey-10"
                  size="md"
                  class="col"
                  label="Recuperar senha"
                  @click="recuperar_senha()"
                />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
      <div bordered class="row q-mt-sm" style="max-height: 40px">
        <q-btn
          v-show="show_btn_login"
          size="sm"
          class="col text-caption"
          flat
          dense
          icon="mdi-login"
          @click="exibe_login()"
          label="Login"
        />

        <q-btn
          v-show="show_btn_cadastro"
          size="sm"
          class="col text-caption"
          flat
          dense
          icon="mdi-database-plus"
          @click="exibe_cadastro()"
          label="Cadastrar"
        />
        <q-btn
          v-show="show_btn_recuperar_senha"
          size="sm"
          class="col text-caption"
          flat
          dense
          icon="mdi-lock-reset"
          @click="exibe_recuperar_senha()"
          label="Recuperar senha"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import servAutenticacao from "src/services/ServAutenticacao.js";
import helpers from "src/composables/Helpers.js";

export default defineComponent({
  name: "CmpLogin",
  setup() {
    const serv = servAutenticacao();
    const help = helpers();
    const $q = useQuasar();
    const form = ref({
      empresa: "",
      login: "",
      senha: "",
      cnpj: "",
    });
    const show_form_login = ref(true);
    const show_form_cadastro = ref(false);
    const show_btn_cadastro = ref(true);
    const show_btn_login = ref(false);
    const show_btn_recuperar_senha = ref(true);
    const show_form_recuperar_senha = ref(false);

    //
    $q.notify.setDefaults({
      position: "top",
      timeout: 2500,
      textColor: "black",
    });

    return {
      show_btn_cadastro,
      show_btn_login,
      show_form_login,
      show_form_cadastro,
      show_form_recuperar_senha,
      show_btn_recuperar_senha,
      serv,
      help,
      form,
    };
  },
  mounted() {
    sessionStorage.setItem("sessionx", false);
    // this.$q.notify({
    //   type: "positive",
    //   message: "Iniciou !!!",
    // });
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
          this.$router.push(`cadastro/${sessionx.cnpj}`);
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
    //Cadastrar
    async cadastrar() {
      //Validar cnpj
      if (!this.form.cnpj || this.form.cnpj.length < 18) {
        this.$q.notify({
          type: "warning",
          message: "Verifique o CNPJ - Faltando dígitos.",
        });
        return false;
      }

      if (this.help.validaCNPJ(this.form.cnpj) === false) {
        this.$q.notify({
          type: "warning",
          message: "Verifique o CNPJ - Números incorretos.",
        });
        return false;
      }

      const cnpj = this.form.cnpj.replace(/[^\d]+/g, "");

      //Manda para o formulário
      this.$router.push(`cadastro/${cnpj}`);

      return;
    },
    // Botão exibir cadastro
    async exibe_cadastro() {
      this.show_form_cadastro = true;
      this.show_form_login = false;
      this.show_form_recuperar_senha = false;
      this.show_btn_login = true;
      this.show_btn_cadastro = false;
      this.show_btn_recuperar_senha = true;
    },
    // Botão exibir login
    async exibe_login() {
      this.show_form_login = true;
      this.show_form_cadastro = false;
      this.show_form_recuperar_senha = false;
      this.show_btn_login = false;
      this.show_btn_cadastro = true;
      this.show_btn_recuperar_senha = true;
    },
    // Botão exibir recuperar senha
    async exibe_recuperar_senha() {
      this.show_form_login = false;
      this.show_form_cadastro = false;
      this.show_form_recuperar_senha = true;
      this.show_btn_login = true;
      this.show_btn_cadastro = true;
      this.show_btn_recuperar_senha = false;
    },
  },
});
</script>

<style>
.q-card {
  width: 360px;
}
</style>
