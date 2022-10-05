import { ref } from "vue";
import apiBase from "src/composables/ApiBase";

const chave = ref(null);
const { apiEnviar } = apiBase();
const nomeServ = "ServAutenticacao";

export default function servAutenticacao() {
  //

  const autenticacaoLogin = async (dados) => {
    try {
      const campos = ["empresa", "login", "senha"];
      const opcionais = [];

      for (var i in campos) {
        const campo = campos[i];
        if (!dados[campo] || dados[campo].length < 3) {
          throw new Error(nomeServ + ": Faltando o campo " + campo);
        }
      }

      const chave = "";
      const servico = "login";
      const res = await apiEnviar(chave, servico, dados);

      return res;
    } catch (e) {
      throw new Error(e);
    }
  };
  //
  const autenticacaoLogout = async () => {
    if (error) throw error;
    return user;
  };
  //
  const autenticacaoEstaLogado = () => {
    return !!user.value;
  };

  const autenticacaoRecuperarSenha = async () => {
    if (error) throw error;
    return user;
  };

  return {
    autenticacaoLogin,
    autenticacaoLogout,
    autenticacaoEstaLogado,
    autenticacaoRecuperarSenha,
  };
}
