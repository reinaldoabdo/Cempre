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
      const campos = ["cnpj", "chave", "cdg_empresa", "cdg_utilizador"];
      const opcionais = [];

      console.log("empresa_existePorCnpj", dados);

      for (var i in campos) {
        const campo = campos[i];
        if ((dados[campo] != 0 && !dados[campo]) || dados[campo].length < 1) {
          throw new Error(nomeServ + ": Faltando o campo " + campo);
        }
      }

      let res_padrao = {
        cdg_tipo_conta: 1,
        cdg_tipo_empresa: 0,
        existe: 0,
        bairro: "",
        cdgbtms: "",
        cep: "",
        cidade: "",
        cnpj: "",
        complemento: "",
        contato_comercial: "",
        contato_financeiro: "",
        email_comercial: "",
        email_financeiro: "",
        endereco: "",
        insc_municipal: "",
        login_empresa: "",
        razao_social: "",
        nome_fantasia: "",
        telefone_comercial: "",
        telefone_financeiro: "",
        telefone: "",
        uf: "",
        url: "",
        agencia: "0",
        atrativo: "0",
        transporte: "0",
        usuario: "",
        senha: "",
        repetir_senha: "",
      };

      const chave = dados.chave;
      const servicoA = "empresa_existePorCnpj";
      const retA = await apiEnviar(chave, servicoA, dados);

      // A empresa já existe
      if (retA.info[0].registros > 0) {
        const resA = retA.dados[0];

        console.log("***resA: ", resA);

        res_padrao = {
          cdg_tipo_conta: 1,
          cdg_tipo_empresa: 0,
          existe: 1,
          bairro: resA.bairro,
          cdgbtms: resA.cdgbtms,
          cep: resA.cep,
          cidade: resA.cidade,
          cnpj: resA.cnpj,
          complemento: resA.complemento,
          contato_comercial: resA.contato_comercial,
          contato_financeiro: resA.contato_financeiro,
          email_comercial: resA.email_comercial,
          email_financeiro: resA.email_financeiro,
          endereco: resA.endereco,
          insc_municipal: resA.insc_municipal,
          login_empresa: resA.nome_login,
          razao_social: resA.razao_social,
          nome_fantasia: resA.nome,
          telefone_comercial: resA.telefone_comercial,
          telefone_financeiro: resA.telefone_financeiro,
          telefone:
            resA.telefone_comercial.length > 3
              ? resA.telefone_comercial
              : resA.telefone_financeiro,
          uf: resA.uf,
          url: resA.url,
          agencia: resA.agencia,
          atrativo: resA.atrativo,
          transporte: resA.transporte,
          usuario: "",
          senha: "",
          repetir_senha: "",
        };

        return res_padrao;
      }

      const servico = "consultaCnpj";
      const ret = await apiEnviar(chave, servico, dados);
      const res = Object.assign({}, ret.dados[0]);

      console.log("res--", res);

      if (!res.error) {
        res_padrao = {
          bairro: res["BAIRRO"],
          cep: res["CEP"],
          cidade: res["MUNICIPIO"],
          cnpj: res["CNPJ"],
          email_comercial: res["EMAIL"],
          email_financeiro: res["EMAIL"],
          endereco:
            res["TIPO LOGRADOURO"] +
            " " +
            res["LOGRADOURO"] +
            " " +
            res["NUMERO"] +
            " " +
            res["COMPLEMENTO"],
          razao_social: res["RAZAO SOCIAL"],
          nome_fantasia: res["NOME FANTASIA"],
          telefone_comercial: "(" + res["DDD"] + ")" + res["TELEFONE"],
          telefone_financeiro: "(" + res["DDD"] + ")" + res["TELEFONE"],
          telefone: "(" + res["DDD"] + ")" + res["TELEFONE"],
          uf: res["UF"],
        };
      }

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
    console.log("cadastrarEmpresa: ", dados);

    try {
      const campos = [
        "chave",
        "cdg_utilizador",
        "cdg_empresa",
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
        "senha_confirma",
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

        if (typeof dados[campo] === "undefined") {
          dados[campo] = "";
        }

        if (opcionais.indexOf(campo) > -1) {
          continue;
        }

        if ((!dados[campo] && dados[campo] != 0) || dados[campo].length < 1) {
          throw new Error(nomeServ + ": Faltando o campo " + campo);
        }
      }

      // O servidor espera os campos a seguir:
      // 'cdg_empresa', 'cdg_utilizador', 'razao_social', 'nome', 'nome_login',
      // 'endereco', 'complemento', 'bairro', 'cep', 'cidade', 'uf', 'telefone_comercial',
      // 'telefone_financeiro', 'email_financeiro', 'email_comercial', 'fax','url', 'cnpj', '
      // insc_municipal', 'insc_estadual', 'reg_embratur', 'usuario', 'senha', 'senha_confirma'

      dados.nome = dados.razao_social;
      dados.nome_login = dados.login_empresa;
      if (dados.telefone_comercial.length < 8) {
        dados.telefone_comercial = dados.telefone;
      }
      if (dados.telefone_financeiro.length < 8) {
        dados.telefone_financeiro = dados.telefone;
      }

      switch (dados.cdg_tipo_empresa) {
        case 0:
          dados.agencia = 1;
          break;

        case 1:
          dados.atrativo = 1;
          break;

        case 2:
          dados.transporte = 1;
          break;

        default:
          dados.agencia = 1;
      }

      dados.fax = "";
      dados.complemento = "";
      dados.insc_estadual = "";
      dados.reg_embratur = "";

      const sess = JSON.parse(sessionStorage.getItem("sessionx"));

      console.log("***log: sess", sess);

      if (!sess || sess == null || sess.chave == undefined) {
        dados.cod_empresa = "0";
      } else {
        dados.cod_empresa = sess.cdg_empresa;
        dados.cdg_empresa = sess.cdg_empresa;
      }

      console.log("***log: dados", dados);

      const chave = dados.chave;
      const servico = "empresa_salva";
      const ret = await apiEnviar(chave, servico, dados);

      if (parseInt(ret.info[0].cdg_erro) > 0) {
        throw new Error(nomeServ + " * " + ret.info[0].msg + " * " + campo);
      }

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
