import { apiCempre } from "src/boot/axios";

export default function apiBase() {
  // Esquema padrão
  const resposta = {
    info: [
      {
        cdg_msg: 0,
        msg: "",
        registros: 0,
      },
    ],
  };

  // API ENVIAR
  const apiEnviar = async (chave, servico, dados) => {
    if (!chave || !servico || !dados) {
      console.error(
        "***Faltando dados: composables/apiBase/apiEnviar((string)chave, (string)servico, (json)dados)"
      );
    }
    const json = {
      dados: {
        head: {
          servico: servico,
          chave: chave,
        },
        data: {
          dados,
        },
      },
    };
    const jtext = JSON.stringify(json);

    console.log(">>>Envio>>> (" + servico + "): ", jtext);

    const retorno = await apiCempre
      .post(apiCempre.defaults.baseURL, jtext)
      .then((resposta) => {
        //
        console.log("<<<Resposta<<< (" + servico + "): ", resposta);

        if (resposta.data && resposta.data.info) {
          const info = resposta.data.info[0];
          if (info.cdg_erro > 0) {
            throw new Error(info.msg);
          }
        }

        return resposta.data;
      })
      .catch(function (e) {
        console.error(">>>Err (" + servico + "): ", e);
        return e;
      });

    console.log("Retorno", retorno.message);

    if (retorno.message.length > 0) {
      resposta.info[0].msg = retorno.message;
    }

    resposta.data = retorno.data;

    return resposta;
  };

  return {
    apiEnviar,
  };
}
