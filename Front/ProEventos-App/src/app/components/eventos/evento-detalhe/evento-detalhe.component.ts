import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrl: './evento-detalhe.component.scss'
})
export class EventoDetalheComponent {

  form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.validadtion();
  }

  public validadtion(): void {
    this.form = new FormGroup({
      local: new FormControl(),
      dataEvento: new FormControl(),
      tema: new FormControl(),
      qtdePessoas: new FormControl(),
      lote: new FormControl(),
      imagemURL: new FormControl(),
      telefone: new FormControl(),
      email: new FormControl(),
    });
  }

}
