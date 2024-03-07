import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable(/* {
  providedIn: 'root'
} 3° forma*/)
export class EventoService {
  baseURL = 'http://localhost:5000/api/eventos';

  constructor(private http: HttpClient) { }

  public getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL);
  }

  public getEventosByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/${tema}/tema`);
  }

  public getEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/${id}`);
  }

  public postEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.baseURL, evento);
  }

  public putEvento(evento: number): Observable<Evento> {
    return this.http.put<Evento>(this.baseURL, evento);
  }

  public deleteEvento(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseURL}/${id}`);
  }
}
