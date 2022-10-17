import { ref } from "vue";
import apiBase from "src/composables/ApiBase";

const { apiEnviar } = apiBase();
const nomeServ = "ServEmpresa";

export default function servEmpresa() {
  //

  /**
   * CONSULTAR CNPJ NA API
   * @param {object} dados
   * @returns
   */
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
      const servico = "consultaCnpj";
      const ret = await apiEnviar(chave, servico, dados);

      const res = Object.assign({}, ret.dados[0]);

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

      console.log("res_padrao", res_padrao);

      return res_padrao;
    } catch (e) {
      throw new Error(e);
    }
  };

  /**
   * CADASTRO DA EMPRESA
   * @param {object} dados
   * @returns
   */
  const cadastrarEmpresa = async (dados) => {
    try {
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

        if (!dados[campo] || dados[campo].length < 1) {
          throw new Error(nomeServ + ": Faltando o campo " + campo);
        }
      }

      alert("passou");

      return;
      const chave = "";
      const servico = "cadastrarEmpresa";
      const ret = await apiEnviar(chave, servico, dados);

      console.log("ret", ret);

      return ret;
    } catch (e) {
      throw new Error(e);
    }
  };

  return {
    consultaCnpj,
    cadastrarEmpresa,
  };
}
