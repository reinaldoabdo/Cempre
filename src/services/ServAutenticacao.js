import { ref } from "vue";
import apiBase from "src/composables/ApiBase";

const chave = ref(null);
const { apiEnviar } = apiBase();

export default function servAutenticacao() {
  //
  const autenticacaoLogin = async ({ empresa, login, senha }) => {
    try {
      const servico = "";
      const dados = {};
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
