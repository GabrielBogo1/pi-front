import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Pessoa } from '../models/pessoa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  http = inject(HttpClient);
  // API = 'https://34.226.156.225/api/atividade';
  API = 'https://44.207.63.220:8443/api/pessoa';

  constructor() { }

  getToken() {
    return localStorage.getItem('token');
  }

  getAuthHeaders() {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  save(pessoa: Pessoa): Observable<Pessoa> {
    if (pessoa.id !== undefined && pessoa.id > 0) {
      return this.update(pessoa);
    }
    const headers = this.getAuthHeaders();
    return this.http.post<Pessoa>(this.API, pessoa, { headers });
  }

  update(pessoa: Partial<Pessoa>) {
    const headers = this.getAuthHeaders();
    return this.http.put<Pessoa>(`${this.API}/${pessoa.id}`, pessoa, { headers });
  }

  delete(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    let params = new HttpParams().set('id', id.toString());
    return this.http.delete<any>(this.API, { params: params, headers });
  }

  listAll(): Observable<Pessoa[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Pessoa[]>(this.API, { headers });
  }

  loadById(id: number): Observable<Pessoa> {
    const headers = this.getAuthHeaders();
    return this.http.get<Pessoa>(`${this.API}/${id}`, { headers });
  }

  listPorOrdemAlfabetica(): Observable<Pessoa[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Pessoa[]>(`${this.API}/ordenar`, { headers });
  }

  listPorDataCadastro(): Observable<Pessoa[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Pessoa[]>(`${this.API}/ordenar-data`, { headers });
  }

  getTotalAtivos(): Observable<number> {
    const headers = this.getAuthHeaders();
    return this.http.get<number>(`${this.API}/total-ativos`, { headers });
  }
}
