<template>
  <div class="row">
    <q-card class="q-ma-sm col-xs col-lg-8 shadow-5">
      <q-card-actions class="q-pa-none">
        <q-banner inline-actions class="q-ma-none fit">
          <div class="text-h6">Convites</div>

          <template v-slot:action>
            <div class="fixed z-top q-gutter-sm">
              <q-btn
                class="shadow-5"
                round
                color="green"
                icon="mdi-refresh"
                @click="listar_empresas_convites"
              >
                <q-tooltip>Atualizar</q-tooltip>
              </q-btn>
            </div>
          </template>
        </q-banner>
      </q-card-actions>
      <q-card-section class="q-ma-xs q-pa-none bg-grey-8">
        <div class="q-pa-xs">
          <q-table
            style="height: 600px"
            dense
            :rows="rows"
            :columns="columns"
            row-key="cdg_empresa"
            virtual-scroll
            v-model:pagination="pagination"
            :rows-per-page-options="[0]"
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
import servConvites from "src/services/ServConvites.js";

export default defineComponent({
  name: "CmpConvites",
  props: ["query"],
  setup() {
    const session = JSON.parse(sessionStorage.getItem("sessionx"));
    const $q = useQuasar();
    const servC = servConvites();
    const route = useRoute();
    //
    $q.notify.setDefaults({
      position: "top",
      timeout: 2500,
      textColor: "black",
      type: "warning",
    });
    //

    const columns = [
      {
        name: "Nome",
        label: "Nome",
        field: "nome",
        sortable: true,
        align: "left",
      },
      { name: "Região", label: "Região", field: "regiao", sortable: true },
      { name: "Status", label: "Status", field: "status", align: "center" },
    ];

    const rows = ref();

    return {
      session,
      servC,
      route,
      columns,
      rows,
    };
  },
  methods: {
    /**
     * LISTAR EMPRESAS E CONVITES
     */
    async listar_empresas_convites() {
      const dados = {
        chave: this.session.chave,
        cdg_empresa: this.session.cdg_empresa,
        cdg_utilizador: this.session.cdg_utilizador,
      };

      this.$q.loading.show();
      const ret = await this.servC.listaEmpresasConvites(dados);
      this.$q.loading.hide();

      const retorno = ret.dados;

      for (let r in retorno) {
        const dd = retorno[r];

        if (dd.status == null) {
          retorno[r].status = "Não enviado";
        }
      }

      console.log("***log: LISTA ", retorno);

      this.rows = retorno;
    },
  },
  async mounted() {
    //
    if (this.session.chave == undefined) {
      router.push("/login");
    }

    //
    this.listar_empresas_convites();
  },
});
</script>
