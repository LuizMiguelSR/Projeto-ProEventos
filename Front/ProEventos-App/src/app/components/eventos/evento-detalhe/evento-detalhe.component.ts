import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Evento } from '@app/models/Evento';
import { Lote } from '@app/models/Lote';

import { EventoService } from '@app/services/evento.service';
import { LoteService } from '@app/services/lote.service';
import { readSync } from 'fs';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrl: './evento-detalhe.component.scss'
})
export class EventoDetalheComponent implements OnInit {

  modalRef: BsModalRef;
  eventoId: number;
  evento = {} as Evento;
  form!: FormGroup;
  estadoSalvar = 'post';
  loteAtual = {id: 0, nome: '', indice: 0};
  imagemURL = 'assets/upload.png';
  file: File;

  get modoEditar(): boolean {
    return this.estadoSalvar === 'put';
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY HH:MM:SS',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
  }

  get bsConfigLote(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
  }

  constructor(private fb: FormBuilder,
              private localeService: BsLocaleService,
              private activatedRouter: ActivatedRoute,
              private eventoService: EventoService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private modalService: BsModalService,
              private router: Router,
              private loteService: LoteService)
  {
    this.localeService.use('pt-br');
  }

  public carregarEvento(): void {
    const id = this.activatedRouter.snapshot.paramMap.get('id');

    if (id) {
      this.eventoId = +id;
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService
        .getEventoById(+this.eventoId)
        .subscribe(
        (evento: Evento) => {
          this.evento = {...evento};
          this.form.patchValue(this.evento);
          if (this.evento.imagemURL !== '') {
            this.imagemURL = 'http://localhost:5000/' + 'resources/images/' + this.evento.imagemURL;
          }
          if (this.evento && this.evento.lotes) {
            this.evento.lotes.forEach(lote => {
              this.lotes.push(this.criarLote(lote));
            });
          }
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar o evento', 'Erro!');
          console.log(error);
        },
        () => {
          this.spinner.hide()
        },
      );
    }
  }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: ['',
        [Validators.required, Validators.minLength(4), Validators.maxLength(50)]
      ],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdePessoas: ['',
        [Validators.required, Validators.max(120000)]
      ],
      telefone: ['', Validators.required],
      email: ['',
        [Validators.required, Validators.email]
      ],
      imagemURL: [''],
      lotes: this.fb.array([])
    });
  }

  adicionarLote(): void {
    this.lotes.push(this.criarLote({id: 0} as Lote));
  }

  criarLote(lote: Lote): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim],
    })
  }

  public mudarValorData(value: Date, indice: number, campo: string): void {
    this.lotes.value[indice][campo] = value;
  }

  public retornaTituloLote(nome: string): string {
      return nome === null || nome === '' ? 'Nome do Lote' : nome;
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public salvarEvento(): void {
    this.spinner.show();
    if (this.form.valid) {
      this.evento =
        this.estadoSalvar === 'post'
          ? { ...this.form.value }
          : { id: this.evento.id, ...this.form.value };

      this.eventoService[this.estadoSalvar](this.evento).subscribe(
        (eventoRetorno: Evento) => {
          this.toastr.success('Evento salvo com Sucesso!', 'Sucesso');
          this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`]);
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Error ao salvar evento', 'Erro');
        },
        () => this.spinner.hide()
      );
    }
  }

  public salvarLotes(): void {
    if (this.form.get('lotes')?.valid) {
      this.spinner.show();
      this.loteService.saveLote(this.eventoId, this.form.value.lotes)
        .subscribe(
          () => {
            this.toastr.success('Lotes salvos com Sucesso!', 'Sucesso');
          },
          (error: any) => {
            this.toastr.error('Error ao salvar lotes', 'Erro');
            console.error(error);
          }
        ).add(() => this.spinner.hide());
    }
  }

  public removerLote( template: TemplateRef<any>,
                      indice: number): void {

    this.loteAtual.id = this.lotes.get(indice + '.id').value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome').value;
    this.loteAtual.indice = indice;

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirmDeleteLote(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.loteService.deleteLote(this.eventoId, this.loteAtual.id)
      .subscribe(
        () => {
          this.toastr.success('Lote deletado com sucesso', 'Sucesso');
          this.lotes.removeAt(this.loteAtual.indice);
        },
        (error: any) => {
          this.toastr.error(`Error ao tentar deletar o lote ${this.loteAtual.id}`, 'Erro');
          console.error(error);
        }
      ).add(() => this.spinner.hide());
  }

  public declineDeleteLote(): void {
    this.modalRef.hide();
  }

  public onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => this.imagemURL = event.target.result;

    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0]);

    this.uploadImagem();
  }

  public uploadImagem(): void {
    this.spinner.show();
    this.eventoService.postUpload(this.eventoId, this.file).subscribe(
      () => {
        this.carregarEvento();
        this.toastr.success('Imagem atualizada com sucesso', 'Sucesso');
      },
      (error: any) => {
        this.toastr.error('Error ao fazer upload da imagem', 'Erro');
        console.error(error);
      }
    ).add(() => this.spinner.hide());
  }
}
