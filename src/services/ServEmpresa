//import { ref } from "vue";
import { wscempre } from "~/boot/axios";

export default function empresa() {
  //
  const actBuscaBtmsPorCnpj = async (payload) => {
    const json = {
      dados: {
        head: {
          servico: "aa_busca_btms_por_cnpj",
          chave: "",
        },
        data: {
          cnpj: payload.cnpj,
        },
      },
    };
    const jtext = JSON.stringify(json);
    const retorno = await wscempre
      .post(wscempre.defaults.baseURL, jtext)
      .then((response) => {
        if (response.data.info[0].registros > 0) {
          commit("mutNovaEmpresa", 1);
          commit("mutEmpresa", response.data.dados);
        } else {
        }
        // este return é necessário para preencher a variável 'retorno'
        return response.data;
      })
      .catch(function () {});
    return retorno;
  };

  return {
    login,
    logout,
    esta_logado,
    cadastro,
    update,
    recuperarSenha,
  };
}
