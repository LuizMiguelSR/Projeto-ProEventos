import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      tema: new FormControl('',
        [Validators.required, Validators.minLength(4), Validators.maxLength(50)]
      ),
      local: new FormControl('', Validators.required),
      dataEvento: new FormControl('', Validators.required),
      qtdePessoas: new FormControl('',
        [Validators.required, Validators.max(120000)]
      ),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('',
        [Validators.required, Validators.email]
      ),
      imagemURL: new FormControl('', Validators.required),
    });
  }

}
