import apiBase from "src/composables/ApiBase";

const { apiEnviar } = apiBase();
const nomeServ = "ServConvites";

export default function servConvites() {
  //

  /**
   * CONSULTAR ATRATIVOS PARA ENVIO DE CONVITES
   * @param {object} dados
   * @returns
   */
  const listaEmpresasConvites = async (dados) => {
    try {
      const campos = ["chave", "cdg_empresa", "cdg_utilizador"];
      const opcionais = [];

      console.log("parceria_empresas_lista", dados);

      for (var i in campos) {
        const campo = campos[i];
        if ((dados[campo] != 0 && !dados[campo]) || dados[campo].length < 1) {
          throw new Error(nomeServ + ": Faltando o campo " + campo);
        }
      }

      const chave = dados.chave;
      const servicoA = "parceria_empresas_lista";
      const retA = await apiEnviar(chave, servicoA, dados);

      return retA;
    } catch (e) {
      throw new Error(e);
    }
  };

  return {
    listaEmpresasConvites,
  };
}
