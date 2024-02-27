import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.validadtion();
  }

  private validadtion(): void {
    this.form = this.fb.group({
      primeiroNome: ['',Validators.required],
      ultimoNome: ['',Validators.required],
      email: ['',
        [Validators.required, Validators.email]
      ],
      userName: ['', Validators.required],
      senha: ['',
        [Validators.required, Validators.minLength(6)]
      ],
      confirmeSenha: ['',
        [Validators.required, Validators.minLength(6)]
      ],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

}
