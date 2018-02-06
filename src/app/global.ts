const API_URL = 'http://localhost:3030/api/v1';

export const GLOBAL = {
  urlBase : `${API_URL}`,
  //protocolos
  protocolos : `${API_URL}/protocolos`,
  protocolo:  `${API_URL}/protocolo/`,
  //usuarios
  crearEditarProtocolo : `${API_URL}/protocolo`,
  crearUsuario : `${API_URL}/usuario/crear`,
  login : `${API_URL}/login`,
  resetPass : `${API_URL}/usuario/reset-pass`,
  changePass : `${API_URL}/usuario/change-pass`,
  changePassToken : `${API_URL}/usuario/token-change-pass`,
  usuarios : `${API_URL}/usuarios`,
  usuario : `${API_URL}/usuario/`,
  crearEditarUsuario : `${API_URL}/usuario`,
  //informes
  informe: `${API_URL}/informe/`,
  informes: `${API_URL}/informes`,
  usuarioInformes: `${API_URL}/informes/usuario/`,
  crearEditarInforme : `${API_URL}/informe`,
  //report
  report : 'http://localhost:5488/api/report',
  //Images
  upload : `${API_URL}/upload/`,
  getImage: `${API_URL}/img/`

}
