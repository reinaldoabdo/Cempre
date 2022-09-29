import { ref } from "vue";
const user = ref(null);

export default function useAuth() {
  //
  const login = async ({ empresa, login, senha }) => {
    if (error) throw error;
    return user;
  };
  //
  const logout = async () => {
    if (error) throw error;
    return user;
  };
  //
  const esta_logado = () => {
    return !!user.value;
  };

  const cadastro = async ({
    empresa,
    razao,
    cnpj,
    end,
    bairro,
    cidade,
    estado,
    cep,
    telefone,
    email,
    senha,
  }) => {
    if (error) throw error;
    return user;
  };

  const update = async () => {
    if (error) throw error;
    return user;
  };

  const recuperarSenha = async () => {
    if (error) throw error;
    return user;
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
