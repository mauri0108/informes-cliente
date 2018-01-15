import { Informe } from './informe';
import { Usuario } from './usuario';

export interface InformeResponse {
  informe?: Informe;
  informes?: Informe[];
  message?: string;
  error?: string;
}

export interface UsuarioResponse {
  usuario?: Usuario;
  usuarios?: Usuario[];
  message?: string;
  error?: string;
}
