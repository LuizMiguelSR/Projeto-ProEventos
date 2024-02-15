import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  baseURL = 'http://localhost:5000/api/eventos';

  constructor(private http: HttpClient) { }
  
  getEvento() {
    return this.http.get(this.baseURL)
  }
}
