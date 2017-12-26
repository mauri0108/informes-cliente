import { Informe } from './informe';

export interface InformeResponse{
  informe? : Informe;
  informes? : Informe[];
  message? : string;
  error?: string;
}
