import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable(/* {
  providedIn: 'root'
} 3° forma*/)
export class EventoService {
  baseURL = 'http://localhost:5000/api/eventos';

  constructor(private http: HttpClient) { }

  getEventos() {
    return this.http.get(this.baseURL)
  }
}
