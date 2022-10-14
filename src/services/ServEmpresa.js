import { ref } from "vue";
import apiBase from "src/composables/ApiBase";

const { apiEnviar } = apiBase();
const nomeServ = "ServEmpresa";

export default function servEmpresa() {
  //

  const consultaCnpj = async (dados) => {
    try {
      const campos = ["cnpj"];
      const opcionais = [];

      for (var i in campos) {
        const campo = campos[i];
        if (!dados[campo] || dados[campo].length < 3) {
          throw new Error(nomeServ + ": Faltando o campo " + campo);
        }
      }

      //console.log("sessionx", sessionStorage.getItem("sessionx"));

      const chave = "";
      const servico = "aa_busca_empresa_por_cnpj";
      //const res = await apiEnviar(chave, servico, dados);

      const res = {
        "NOME FANTASIA": "PEDRO SOFT",
        "RAZAO SOCIAL": "PEDRO FERREIRA DE OLIVEIRA",
        CNPJ: "24425732000191",
        STATUS: "ATIVA",
        "CNAE PRINCIPAL DESCRICAO":
          "Reprodução de software em qualquer suporte",
        "CNAE PRINCIPAL CODIGO": "1830003",
        CEP: "79290000",
        "DATA ABERTURA": "21/03/2016",
        DDD: "67",
        TELEFONE: "32551233",
        EMAIL: "",
        "TIPO LOGRADOURO": "RUA",
        LOGRADOURO: "SENADOR FILINTO MULLER",
        NUMERO: "1042",
        COMPLEMENTO: "",
        BAIRRO: "VILA AMERICA",
        MUNICIPIO: "Bonito",
        UF: "MS",
      };

      const res_padrao = {
        nome_fantasia: res["NOME FANTASIA"],
        razao_social: res["RAZAO SOCIAL"],
        cnpj: res["CNPJ"],
        situacao: res["STATUS"],
        cnae_descricao: res["CNAE PRINCIPAL DESCRICAO"],
        cnae_codigo: res["CNAE PRINCIPAL CODIGO"],
        cep: res["CEP"],
        data_abertura: res["DATA ABERTURA"],
        telefone: "(" + res["DDD"] + ")" + res["TELEFONE"],
        email: res["EMAIL"],
        endereco:
          res["TIPO LOGRADOURO"] +
          " " +
          res["LOGRADOURO"] +
          " " +
          res["NUMERO"] +
          " " +
          res["COMPLEMENTO"],
        bairro: res["BAIRRO"],
        cidade: res["MUNICIPIO"],
        uf: res["UF"],
      };

      return res;
    } catch (e) {
      throw new Error(e);
    }
  };

  return {
    consultaCnpj,
  };
}
