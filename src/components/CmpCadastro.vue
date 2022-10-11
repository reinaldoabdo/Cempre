<template>
  <div class="q-pa-none row q-ma-none">
    <q-card style="width: 100%" class="q-pa-none">
      <q-card-actions align="left" class="bg-white text-teal q-pa-none">
        <q-banner
          inline-actions
          class="q-ma-none text-white bg-teal-8"
          style="width: 100%"
        >
          Cadastro
          <template v-slot:action>
            <q-btn
              dense
              flat
              color="teal-2"
              icon="done"
              @click="salva_cadastro"
            >
              <q-tooltip content-class="bg-accent">Salvar</q-tooltip>
            </q-btn>
            <q-btn
              flat
              class="on-right"
              dense
              icon="exit_to_app"
              color="teal-2"
              v-close-popup
            />
          </template>
        </q-banner>
      </q-card-actions>
      <q-card-section class="bg-yellow-1" input-class="text-blue-10">
        <div class="row">
          <div class="row col-xs-12 col-lg-4">
            <q-select
              dense
              options-dense
              v-model="form.cdg_tipo_conta"
              :options="optTipoConta"
              option-label="label"
              option-value="value"
              emit-value
              map-options
              label="Tipo de conta"
              class="col-xs-6 q-pa-xs"
            >
            </q-select>
            <q-select
              v-if="form.cdg_tipo_conta == 1"
              dense
              options-dense
              v-model="form.cdg_tipo_empresa"
              :options="optTipoEmpresa"
              option-label="label"
              option-value="value"
              emit-value
              map-options
              label="Tipo de empresa"
              class="col-xs-6 q-pa-xs"
              input-class="text-blue-10"
              options-selected-class="text-blue-10"
            >
            </q-select>
          </div>
          <q-input
            dense
            label="Razão social"
            v-model="form.razao_social"
            input-class="text-blue-10"
            class="col-xs-12 col-md-6 col-lg-4 q-pa-xs"
          />
          <q-input
            dense
            label="Nome fantasia"
            v-model="form.nome_fantasia"
            class="col-xs-12 col-md-6 col-lg-4 q-pa-xs"
          />
          <q-input
            dense
            label="Endereço"
            v-model="form.endereco"
            class="col-xs-12 col-md-7 q-pa-xs"
          />
          <q-input
            dense
            label="Bairro"
            v-model="form.bairro"
            class="col-xs-12 col-md-5 q-pa-xs"
          />
          <q-input
            dense
            label="CEP"
            v-model="form.cep"
            class="col-xs-5 col-md-2 q-pa-xs"
          />
          <q-input
            dense
            label="Cidade"
            v-model="form.cidade"
            class="col-xs-7 col-md-4 q-pa-xs"
          />
          <q-input
            dense
            label="UF"
            v-model="form.uf"
            class="col-xs-2 col-md-1 q-pa-xs"
          />
          <q-input
            dense
            label="País"
            v-model="form.pais"
            class="col-xs-10 col-md-5 q-pa-xs"
          />
          <q-input
            dense
            label="Telefone"
            v-model="form.telefone"
            class="col-xs-12 col-md-4 q-pa-xs"
          />
          <q-input
            dense
            label="CNPJ"
            v-model="form.cnpj"
            class="col-xs-6 col-md-3 q-pa-xs"
          />
          <q-input
            dense
            label="Ins. Municipal"
            v-model="form.insc_municipal"
            class="col-xs-6 col-md-5 q-pa-xs"
          />
          <div class="row col-xs-12 bg-yellow-2">
            <div
              class="col-xs-12 col-md-6 row q-px-xs"
              style="text-align: center"
            >
              <div class="bg-grey-7 text-yellow-1 full-width">Financeiro</div>
              <q-input
                dense
                label="Contato"
                v-model="form.contato_financeiro"
                class="col-xs-12 col-md-6 col-md-3 q-pa-xs"
              />
              <q-input
                dense
                label="Telefone"
                v-model="form.telefone_financeiro"
                class="col-xs-12 col-md-6 col-md-3 q-pa-xs"
              />
              <q-input
                dense
                label="Email"
                v-model="form.email_financeiro"
                class="col-xs-12 col-md-12 q-pa-xs"
              />
            </div>
            <div class="col-xs-12 col-md-6 row q-px-xs">
              <div
                class="bg-grey-7 text-yellow-1 full-width"
                style="text-align: center"
              >
                Comercial
              </div>
              <q-input
                dense
                label="Contato"
                v-model="form.contato_comercial"
                class="col-xs-12 col-sm-6 col-md-6 q-pa-xs"
              />
              <q-input
                dense
                label="Telefone"
                v-model="form.telefone_comercial"
                class="col-xs-12 col-sm-6 col-md-6 q-pa-xs"
              />
              <q-input
                dense
                label="Email"
                v-model="form.email_comercial"
                class="col-xs-12 col-md-12 q-pa-xs"
              />
            </div>
          </div>
          <q-input
            dense
            label="Site"
            v-model="form.url"
            class="col-xs-12 col-md-6 q-pa-xs"
          />
          <q-input
            dense
            label="Login empresa"
            v-model="form.nome_login"
            class="col-xs-12 col-md-6 q-pa-xs"
            hint="Nome de login da empresa para er usado em conjunto com nome e senha do usuário."
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        cdgTipoConta: 1,
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
        nome_login: "",
        uf: "",
        pais: "",
        telefone: "",
      },
      optTipoConta: [
        {
          label: "Particular",
          value: 0,
        },
        {
          label: "Empresa",
          value: 1,
        },
      ],
      optTipoEmpresa: [
        {
          label: "Agência de Turismo",
          value: 0,
        },
      ],
    };
  },
  methods: {
    ...mapActions("empresa", ["actEmpresaSalva"]),
    salva_cadastro() {
      console.log("form", this.form);
      this.actEmpresaSalva(this.form);
    },
    inicializa_nova_empresa() {
      console.log("gtEmpresa", this.gtEmpresa);
      this.form.razao_social = this.gtEmpresa.nome;
      this.form.nome_fantasia = this.gtEmpresa.fantasia;
      this.form.endereco = this.gtEmpresa.logradouro;
      this.form.bairro = this.gtEmpresa.bairro;
      this.form.cep = this.gtEmpresa.cep;
      this.form.cidade = this.gtEmpresa.municipio;
      this.form.uf = this.gtEmpresa.uf;
      this.form.telefone = this.gtEmpresa.telefone;
      this.form.cnpj = this.gtEmpresa.cnpj;
      this.form.insc_municipal = "";
      this.form.agencia = "1";
    },
  },
  computed: {
    ...mapGetters("empresa", ["gtEmpresa", "gtNovaEmpresa"]),
  },
  mounted: function () {
    console.log("mounted", "BB" + this.gtNovaEmpresa + "AA");
    if (this.gtNovaEmpresa === 1) {
      this.inicializa_nova_empresa();
    }
  },
};
</script>
<style lang="sass">
.cor_texto
  color: #0000ff
  background-color: white
</style>
