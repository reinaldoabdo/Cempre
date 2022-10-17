<template>
  <div class="row">
    <q-card class="q-ma-sm bg-red col-xs col-lg-8 shadow-5">
      <q-card-actions class="q-pa-none">
        <q-banner inline-actions class="q-ma-none fit">
          <div class="text-h6">Cadastro</div>

          <template v-slot:action>
            <div class="fixed z-top q-gutter-sm">
              <q-btn
                class="shadow-5"
                round
                color="yellow-9"
                label="Tst"
                @click="consultar_cnpj()"
              >
                <q-tooltip>Teste</q-tooltip>
              </q-btn>

              <q-btn
                class="shadow-5"
                round
                color="blue"
                icon="mdi-check"
                @click="salvar_cadastro"
              >
                <q-tooltip>Salvar</q-tooltip>
              </q-btn>
              <q-btn
                class="shadow-5"
                round
                color="red"
                icon="close"
                v-close-popup
              >
                <q-tooltip>Fechar</q-tooltip>
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
            class="col-xs-12 col-md-6 q-pa-xs"
            outlined
          />
          <q-input
            dense
            label="Login empresa"
            v-model="form.login_empresa"
            class="col-xs-12 col-md-6 q-pa-xs q-mb-md"
            hint="Nome de login da empresa para ser usado em conjunto com nome e senha do usuário."
            outlined
          />
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

export default defineComponent({
  name: "CmpCadastro",
  props: ["query"],
  setup() {
    const $q = useQuasar();
    const serv = servEmpresa();
    const route = useRoute();
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
      cnpj: "",
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
    ];

    return { serv, form, route, opt_tipo_conta, opt_tipo_empresa };
  },
  methods: {
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

        if (opcionais.indexOf(campo) > -1) {
          continue;
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

      this.$q.loading.show();
      const ret = await this.serv.cadastrarEmpresa(this.form);
      this.$q.loading.hide();
    },
    //CONSULTAR CNPJ
    async consultar_cnpj() {
      this.$q.loading.show();

      const ret = await this.serv.consultaCnpj(this.route.params);

      this.form = {
        cdg_tipo_conta: 1,
        cdg_tipo_empresa: 0,
        razao_social: ret.razao_social,
        nome_fantasia: ret.nome_fantasia,
        endereco: ret.endereco,
        bairro: ret.bairro,
        cep: ret.cep,
        cidade: ret.cidade,
        cnpj: ret.cnpj,
        insc_municipal: "",
        contato_financeiro: "",
        telefone_financeiro: ret.telefone,
        email_financeiro: "",
        contato_comercial: "",
        telefone_comercial: ret.telefone,
        email_comercial: ret.email,
        url: "http://www.",
        login_empresa: "",
        uf: ret.uf,
        pais: "Brasil",
        telefone: ret.telefone,
        situacao: ret.situacao,
      };

      this.$q.loading.hide();
    },
  },
  mounted() {
    //
    this.$q.notify({
      type: "positive",
      message: "Iniciou !!!",
    });

    //
    this.consultar_cnpj();
  },
});
</script>
