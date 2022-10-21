import { apiCempre } from "src/boot/axios";

export default function apiBase() {
  // API ENVIAR
  const apiEnviar = async (chave, servico, dados) => {
    if (!servico || !dados) {
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
        data: dados,
      },
    };
    const jtext = JSON.stringify(json);

    console.log(">>>Envio>>> (" + servico + "): ", jtext);

    const retorno = await apiCempre
      .post(apiCempre.defaults.baseURL, jtext)
      .then((resposta) => {
        //
        console.log("<<<Resposta<<< (" + servico + "): ", resposta);

        var ret = {};

        if (resposta.data && resposta.data.info) {
          const info = resposta.data.info[0];
          if (info.cdg_erro > 0) {
            throw new Error(info.msg);
          }
          ret = resposta.data;
        } else if (resposta.dados && resposta.info) {
          const info = resposta.info[0];
          if (info.cdg_erro > 0) {
            throw new Error(info.msg);
          }
          ret = resposta;
        }
        return ret;
      })
      .catch(function (e) {
        console.log(">>>Err (" + servico + "): ", e);
        // Esquema padrão
        const resposta = {
          info: [
            {
              cdg_msg: "9999",
              msg: "ApiBase: " + e,
              registros: 0,
            },
          ],
          dados: [],
        };
        return resposta;
      });

    console.log("<==|Retorno", retorno);

    return retorno;
  };

  return {
    apiEnviar,
  };
}
