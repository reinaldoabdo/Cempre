<template>
  <div class="row">
    <q-card class="q-ma-sm col-xs col-lg-8 shadow-5">
      <q-card-actions class="q-pa-none">
        <q-banner inline-actions class="q-ma-xs fit">
          <div class="text-h6">Convites</div>

          <template v-slot:action>
            <div class="fixed z-top q-gutter-sm">
              <q-btn
                class="shadow-5"
                round
                color="green"
                icon="mdi-refresh"
                @click="listarEmpresas"
              >
                <q-tooltip>Atualizar</q-tooltip>
              </q-btn>
              <q-btn
                class="shadow-5"
                round
                color="blue"
                icon="mdi-send"
                @click="enviarConvites"
                ref="btn_enviar"
                :disabled="disable"
              >
                <q-tooltip>Enviar</q-tooltip>
              </q-btn>
            </div>
          </template>
        </q-banner>
      </q-card-actions>
      <q-card-section class="q-ma-xs q-pa-none bg-grey-8">
        <div class="q-pa-xs q-gutter-sm">
          <q-input outlined dense v-model="filtro" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-table
            style="height: 600px"
            dense
            :rows="rows"
            :columns="columns"
            :filter="filtro"
            row-key="cdg_empresa"
            :rows-per-page-options="[0]"
            selection="multiple"
            v-model:selected="selected"
            @selection="quandoMarcarDesmarcar()"
          >
          </q-table>
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
    const rows = ref();
    const filtro = ref();
    const selected = ref([]);
    const disable = ref(true);
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

    return {
      session,
      servC,
      route,
      columns,
      rows,
      filtro,
      selected,
      disable,
    };
  },
  methods: {
    /**
     * LISTAR EMPRESAS E CONVITES
     */
    async listarEmpresas() {
      const dados = {
        chave: this.session.chave,
        cdg_empresa: this.session.cdg_empresa,
        cdg_utilizador: this.session.cdg_utilizador,
        so_atrativos: 1,
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

        switch (dd.status) {
          case null:
            retorno[r].status = "Não enviado.";
            break;
          case "E":
            retorno[r].status = "Enviado, aguardando aceite.";
            break;
          case "A":
            retorno[r].status = "Aceito!";
            break;
        }
      }

      this.rows = retorno;
    },
    /**
     * ENVIAR CONVITES
     */
    async enviarConvites() {
      console.log("Selected", this.selected);

      const cdgs_empresas = this.selected.map((sel) => sel.cdg_empresa);

      if (cdgs_empresas.length < 1) {
        this.$q.notify("Selecione uma empresa.");
        return false;
      }

      const dados = {
        chave: this.session.chave,
        cdg_empresa: this.session.cdg_empresa,
        cdg_utilizador: this.session.cdg_utilizador,
        cdgs_empresas_convidadas: cdgs_empresas.join(","),
      };

      const ret = await this.servC.enviarConvites(dados);

      console.log("***log: RET ", ret);

      let msg = "Enviado com Sucesso!";
      let tipo = "";
      if (ret.info[0].registros > 0) {
        msg = "Enviado com Sucesso!";
        tipo = "positive";
      } else {
        msg = "Falha ao enviar!";
        tipo = "negative";
      }

      this.$q.notify({
        message: msg,
        type: tipo,
      });

      console.log("***log: RET", ret);

      this.listarEmpresas();
    },
    /**
     * QUANDO MARCAR OU DESMARCAR
     */
    async quandoMarcarDesmarcar() {
      //
      await this.$nextTick();

      if (this.selected.length < 1) {
        this.disable = true;
      } else {
        this.disable = false;
      }

      console.log("***log: asdf", this.selected);
    },
  },
  async mounted() {
    //
    if (this.session.chave == undefined) {
      router.push("/login");
    }

    //
    this.listarEmpresas();
  },
});
</script>
