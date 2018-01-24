import { Protocolo } from './protocolo-informe';
import { Informe } from './protocolo-informe';
import { Usuario } from './usuario';

export interface ProtocoloResponse {
  protocolo?: Protocolo;
  protocolos?: Protocolo[];
  message?: string;
  error?: string;
}

export interface UsuarioResponse {
  usuario?: Usuario;
  usuarios?: Usuario[];
  message?: string;
  error?: string;
}

export interface InformeResponse {
  informe?: Informe;
  informes?: Informe[];
  message?: string;
  error?: string;
}
