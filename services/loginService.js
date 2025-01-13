/*export const usuarioService = {
    async obtenerUsuarioPorEmail(email) {
      if (!email) {
        throw new Error('El email es obligatorio');
      }
      const usuario = await usuarioModel.getUsuarioByEmail(email);
      if (!usuario) {
        throw new Error(`Usuario con email ${email} no encontrado`);
      }
      return usuario;
    },
  };
  */