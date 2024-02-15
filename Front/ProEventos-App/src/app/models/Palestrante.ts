export interface Palestrante {
  Id: number;
  Nome: string;
  MiniCurrilo: string;
  ImagemURL: string;
  Telefone: string;
  Email: string;
  RedesSociais: RedeSocial[];
  PalestrantesEventos: PalestranteEvento[];
}
