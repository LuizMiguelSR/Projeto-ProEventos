import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  laguraImagem: number = 150;
  margemimagem: number = 2;
  exibirImagem: boolean = true;
  filtroLista: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  alterarImagem() {
    this.exibirImagem = !this.exibirImagem;
  }

  public getEventos(): void {
    this.http.get('http://localhost:5000/api/eventos').subscribe(
      response => this.eventos = response,
      error => console.log(error)
    );
  }
}
