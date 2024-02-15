export interface Evento {
  Id: number;
  Local: string;
  DataEvento?: Date;
  Tema: string;
  QtdePessoas: number;
  Lote: string;
  ImagemURL: string;
  Telefone: number;
  Email: string;
  Lotes: Lote[];
  RedesSociais: RedeSocial[];
  PalestrantesEventos: Palestrante[];
}
