import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(public fb: FormBuilder) { }

    ngOnInit(): void {
      this.validadtion();
    }

    private validadtion(): void {

      const formOptions: AbstractControlOptions = {
        validators: ValidatorField.MustMatch('senha', 'confirmeSenha')
      };

      this.form = this.fb.group({
        titulo: ['', Validators.required],
        primeiroNome: ['', Validators.required],
        ultimoNome: ['', Validators.required],
        email: ['',
          [Validators.required, Validators.email]
        ],
        telefone: ['', Validators.required],
        funcao: ['', Validators.required],
        descricao: ['',
          [Validators.required, Validators.maxLength(400)]
        ],
        senha: ['',
          [Validators.required, Validators.minLength(6)]
        ],
        confirmeSenha: ['',
          [Validators.required, Validators.minLength(6)]
        ],
      }, formOptions);
    }

    onSubmit(): void {

      // Vai parar aqui se o form estiver inválido
      if (this.form.invalid) {
        return;
      }
    }

    public resetForm(event: any): void {
      event.preventDefault();
      this.form.reset();
    }

}
