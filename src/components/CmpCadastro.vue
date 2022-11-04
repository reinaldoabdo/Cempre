<template>
  <div class="row">
    <q-card class="q-ma-sm bg-red col-xs col-lg-8 shadow-5">
      <q-card-actions class="q-pa-none">
        <q-banner inline-actions class="q-ma-none fit">
          <div class="text-h6">Cadastro da empresa</div>

          <template v-slot:action>
            <div class="fixed z-top q-gutter-sm">
              <q-btn
                class="shadow-5"
                round
                color="blue"
                icon="mdi-check"
                @click="salvar_cadastro"
              >
                <q-tooltip>Salvar</q-tooltip>
              </q-btn>
            </div>
          </template>
        </q-banner>
      </q-card-actions>
      <q-card-section class="bg-grey-8">
        <div class="row">
          <q-select
            dense
            options-dense
            v-model="form.cdg_tipo_conta"
            :options="opt_tipo_conta"
            emit-value
            map-options
            label="Tipo de conta"
            class="col-xs-12 col-sm-6 col-md-3 q-pa-xs"
            outlined
          >
          </q-select>
          <q-select
            dense
            options-dense
            v-model="form.cdg_tipo_empresa"
            :options="opt_tipo_empresa"
            emit-value
            map-options
            label="Tipo de empresa"
            class="col-xs-12 col-sm-6 col-md-3 q-pa-xs"
            outlined
          >
          </q-select>

          <q-input
            dense
            label="Razão social"
            v-model="form.razao_social"
            class="col-xs-12 col-md-6 q-pa-xs"
            dark
            outlined
          />
          <q-input
            dense
            label="Nome fantasia"
            v-model="form.nome_fantasia"
            class="col-xs-12 col-md-5 q-pa-xs"
            outlined
          />
          <q-input
            dense
            label="Endereço"
            v-model="form.endereco"
            class="col-xs-12 col-md-7 q-pa-xs"
            outlined
          />
          <q-input
            dense
            label="Bairro"
            v-model="form.bairro"
            class="col-xs-12 col-md-5 q-pa-xs"
            outlined
          />
          <q-input
            dense
            label="CEP"
            v-model="form.cep"
            class="col-xs-5 col-md-2 q-pa-xs"
            outlined
          />
          <q-input
            dense
            label="Cidade"
            v-model="form.cidade"
            class="col-xs-7 col-md-4 q-pa-xs"
            outlined
          />
          <q-input
            dense
            label="UF"
            v-model="form.uf"
            class="col-xs-2 col-md-1 q-pa-xs"
            outlined
          />
          <q-input
            dense
            label="País"
            v-model="form.pais"
            class="col-xs-10 col-md q-pa-xs"
            outlined
          />
          <q-input
            dense
            label="Telefone"
            v-model="form.telefone"
            class="col-xs-12 col-md q-pa-xs"
            outlined
          />
          <q-input
            dense
            label="CNPJ"
            v-model="form.cnpj"
            class="col-xs-6 col-md q-pa-xs"
            outlined
          />
          <q-input
            dense
            label="Ins. Municipal"
            v-model="form.insc_municipal"
            class="col-xs-6 col-md q-pa-xs"
            outlined
          />
          <div class="row q-ma-xs q-pa-xs bg-grey-7">
            <div class="col-xs-12 col-md-6 row">
              <div class="bg-secondary full-width text-center">Financeiro</div>
              <q-input
                dense
                label="Contato"
                v-model="form.contato_financeiro"
                class="col-xs-12 col-md-6 col-md-3 q-pa-xs"
                outlined
              />
              <q-input
                dense
                label="Telefone"
                v-model="form.telefone_financeiro"
                class="col-xs-12 col-md-6 col-md-3 q-pa-xs"
                outlined
              />
              <q-input
                dense
                label="Email"
                v-model="form.email_financeiro"
                class="col-xs-12 col-md-12 q-pa-xs"
                outlined
              />
            </div>
            <div class="col-xs-12 col-md-6 row q-px-xs">
              <div class="bg-secondary full-width text-center">Comercial</div>
              <q-input
                dense
                label="Contato"
                v-model="form.contato_comercial"
                class="col-xs-12 col-sm-6 col-md-6 q-pa-xs"
                outlined
              />
              <q-input
                dense
                label="Telefone"
                v-model="form.telefone_comercial"
                class="col-xs-12 col-sm-6 col-md-6 q-pa-xs"
                outlined
              />
              <q-input
                dense
                label="Email"
                v-model="form.email_comercial"
                class="col-xs-12 col-md-12 q-pa-xs"
                outlined
              />
            </div>
          </div>
        </div>

        <div class="row">
          <q-input
            dense
            label="Site"
            v-model="form.url"
            class="col-xs-12 col-sm q-pa-xs"
            outlined
          />
          <q-input
            dense
            label="Login empresa"
            v-model="form.login_empresa"
            class="col-xs-12 col-sm q-ma-xs"
            hint="Para ser usado em conjunto com nome e senha do usuário."
            outlined
          />
        </div>

        <div class="row">
          <q-input
            dense
            label="Usuário"
            v-model="form.usuario"
            class="col-xs-12 col-sm q-ma-xs"
            outlined
          />
          <q-input
            :type="tipo_password ? 'password' : 'text'"
            dense
            label="Senha"
            v-model="form.senha"
            class="col-xs-12 col-sm q-ma-xs"
            outlined
            hint="No mínimo 6 caracteres."
          >
            <template v-slot:append>
              <q-icon
                :name="tipo_password ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="tipo_password = !tipo_password"
              />
            </template>
          </q-input>
          <q-input
            :type="tipo_password ? 'password' : 'text'"
            dense
            label="Repetir a senha"
            v-model="form.repetir_senha"
            class="col-xs-12 col-sm q-pa-xs"
            outlined
          >
            <template v-slot:append>
              <q-icon
                :name="tipo_password ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="tipo_password = !tipo_password"
              />
            </template>
          </q-input>
        </div>

        <div class="row q-mt-lg">
          <div class="col text-primary">
            * Atenção! Guarde o "Login empresa", "Usuário" e "Senha", são os
            dados necessários para acesso.
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import servEmpresa from "src/services/ServEmpresa.js";
import servAutenticacao from "src/services/ServAutenticacao.js";

export default defineComponent({
  name: "CmpCadastro",
  props: ["query"],
  setup() {
    const session = JSON.parse(sessionStorage.getItem("sessionx"));
    const $q = useQuasar();
    const servE = servEmpresa();
    const servA = servAutenticacao();
    const route = useRoute();
    const dadosFake = ref();
    const tipo_password = ref(true);
    //
    $q.notify.setDefaults({
      position: "top",
      timeout: 2500,
      textColor: "black",
      type: "warning",
    });
    const form = ref({
      cdg_tipo_conta: 1,
      cdg_tipo_empresa: 0,
      razao_social: "",
      nome_fantasia: "",
      endereco: "",
      bairro: "",
      cep: "",
      cidade: "",
      cnpj: route.params.cnpj,
      insc_municipal: "",
      contato_financeiro: "",
      telefone_financeiro: "",
      email_financeiro: "",
      contato_comercial: "",
      telefone_comercial: "",
      email_comercial: "",
      url: "",
      login_empresa: "",
      uf: "",
      pais: "",
      telefone: "",
      usuario: "",
      senha: "",
      repetir_senha: "",
    });

    const opt_tipo_conta = [
      {
        label: "Particular",
        value: 0,
      },
      {
        label: "Empresa",
        value: 1,
      },
    ];
    const opt_tipo_empresa = [
      {
        label: "Ag. de Turismo",
        value: 0,
      },
      {
        label: "Atrativo",
        value: 1,
      },
      {
        label: "Transporte",
        value: 2,
      },
    ];

    return {
      session,
      servE,
      servA,
      form,
      route,
      dadosFake,
      opt_tipo_conta,
      opt_tipo_empresa,
      tipo_password,
    };
  },
  methods: {
    /**
     * FAKE LOGIN
     * Se causar problema de segurança, enviar para o backend.
     * Só adicionar login com poucas permissões
     */
    async fakeLogin() {
      const dados = {
        empresa: "abaetur",
        login: "reinaldo",
        senha: "r142536",
      };

      const resA = await this.servA.autenticacaoLogin(dados);

      if (resA.dados[0]) {
        this.dadosFake = resA.dados[0];
      } else {
        const msg = "Erro ao fazer a autenticação temporária";
        this.$q.notify({
          type: "negative",
          message: msg,
        });
        return false;
      }

      console.log("FakeLogin", resA);
    },
    /**
     * SALVAR CADASTRO
     */
    async salvar_cadastro() {
      const campos = [
        "cdg_tipo_conta",
        "cdg_tipo_empresa",
        "razao_social",
        "nome_fantasia",
        "endereco",
        "bairro",
        "cep",
        "cidade",
        "cnpj",
        "insc_municipal",
        "contato_financeiro",
        "telefone_financeiro",
        "email_financeiro",
        "contato_comercial",
        "telefone_comercial",
        "email_comercial",
        "url",
        "login_empresa",
        "uf",
        "pais",
        "telefone",
        "situacao",
        "usuario",
        "senha",
        "repetir_senha",
      ];
      const opcionais = [
        "insc_municipal",
        "contato_financeiro",
        "telefone_financeiro",
        "email_financeiro",
        "contato_comercial",
        "telefone_comercial",
        "email_comercial",
        "url",
        "pais",
        "situacao",
      ];

      for (var i in campos) {
        const campo = campos[i];

        if (
          ((campo == "email_comercial" || campo == "email_financeiro") &&
            !this.form.email_comercial &&
            !this.form.email_financeiro) ||
          (this.form.email_comercial.length < 5 &&
            !this.form.email_financeiro.length < 5)
        ) {
          this.$q.notify({
            type: "negative",
            message: "É necessário preencher ao menos um dos emails.",
          });
          return false;
        }

        if (opcionais.indexOf(campo) > -1) {
          continue;
        }

        if (
          campo == "senha" &&
          (!this.form.senha ||
            this.form.senha.length < 6 ||
            this.form.senha != this.form["repetir_senha"])
        ) {
          this.$q.notify({
            type: "negative",
            message:
              "A senha deve conter no mínimo 6 caracteres e deve conferir com repetir senha.",
          });
          return false;
        }

        if (
          (this.form[campo] != 0 && !this.form[campo]) ||
          this.form[campo].length < 1
        ) {
          let nome_campo = campo.replace("_", " ");
          nome_campo = nome_campo.toLocaleUpperCase();
          const msg = "Preencha o campo " + nome_campo;
          this.$q.notify({
            type: "negative",
            message: msg,
          });
          return false;
        }
      }

      sessionStorage.setItem("sform", JSON.stringify(this.form));

      console.log("***log: this.dadosFake", this.dadosFake);

      if (this.session.chave == undefined) {
        this.form.chave = this.dadosFake.chave;
        this.form.cdg_empresa = this.dadosFake.cdg_empresa;
        this.form.cdg_utilizador = this.dadosFake.cdg_utilizador;
      } else {
        this.form.chave = this.session.chave;
        this.form.cdg_empresa = this.session.cdg_empresa;
        this.form.cdg_utilizador = this.session.cdg_utilizador;
      }

      this.$q.loading.show();
      const ret = await this.servE.cadastrarEmpresa(this.form);
      this.$q.loading.hide();

      if (ret.info[0].msg) {
        this.$q.notify({
          type: "negative",
          message: ret.info[0].msg,
        });
      }
    },
    //CONSULTAR CNPJ
    async consultar_cnpj() {
      console.log("this.dadosFake: ", this.dadosFake);

      let dados = {};

      if (this.dadosFake !== undefined) {
        dados = {
          chave: this.dadosFake.chave,
          cnpj: this.form.cnpj,
          cdg_empresa: this.dadosFake.cdg_empresa,
          cdg_utilizador: this.dadosFake.cdg_utilizador,
        };
      } else {
        dados = {
          chave: this.session.chave,
          cnpj: this.session.cnpj,
          cdg_empresa: this.session.cdg_empresa,
          cdg_utilizador: this.session.cdg_utilizador,
        };
      }

      this.$q.loading.show();
      const ret = await this.servE.consultaCnpj(dados);
      this.$q.loading.hide();

      if (ret.existe === 1) {
        if (this.session.chave == undefined) {
          this.$q.notify({
            type: "warning",
            message: "Esta empresa já está cadastrada. Faça o login.",
          });
          //this.$router.push("/login");
          return;
        } else {
          this.$q.notify({
            type: "positive",
            message: "Bem-vindo(a)!",
          });
        }
      }

      console.log("RREET", ret);

      let cdg_tipo_empresa = 0;
      if (ret.agencia == 1) {
        cdg_tipo_empresa = 0;
      } else if (ret.atrativo == 1) {
        cdg_tipo_empresa = 1;
      } else if (ret.transporte == 1) {
        cdg_tipo_empresa = 2;
      }

      this.form = {
        cdg_tipo_conta: 1,
        cdg_tipo_empresa: cdg_tipo_empresa,
        razao_social: ret.razao_social,
        nome_fantasia: ret.nome_fantasia,
        endereco: ret.endereco,
        bairro: ret.bairro,
        cep: ret.cep,
        cidade: ret.cidade,
        cnpj: ret.cnpj,
        insc_municipal: ret.insc_municipal,
        contato_financeiro: ret.contato_financeiro,
        telefone_financeiro: ret.telefone_financeiro,
        email_financeiro: ret.email_financeiro,
        contato_comercial: ret.contato_comercial,
        telefone_comercial: ret.telefone_comercial,
        email_comercial: ret.email_comercial,
        url: ret.url,
        login_empresa: ret.login_empresa,
        uf: ret.uf,
        pais: ret.pais,
        telefone: ret.telefone,
        usuario: "",
        senha: "",
      };

      console.log("FORM", this.form);
    },
  },
  async mounted() {
    //

    if (this.session.chave == undefined) {
      await this.fakeLogin();
    }

    //
    this.consultar_cnpj();
  },
});
</script>
