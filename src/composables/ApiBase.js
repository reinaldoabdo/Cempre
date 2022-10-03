import { apiCempre } from "src/boot/axios";

export default function apiBase() {
  //
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
      .then((response) => {
        //
        console.log("<<<Resposta<<< (" + servico + "): ", response);

        if (response.data && response.data.info) {
          const info = response.data.info[0];
          if (info.cdg_erro > 0) {
            throw new Error(info.msg);
          }
        }

        return response.data;
      })
      .catch(function (e) {
        console.error(">>>Err (" + servico + "): ", e);
        return e;
      });

    return { retorno };
  };

  return {
    apiEnviar,
  };
}
