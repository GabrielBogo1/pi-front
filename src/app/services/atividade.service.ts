import { Injectable, inject } from '@angular/core';
import { Atividade } from '../models/atividade';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  http = inject(HttpClient);
  // API = 'https://34.226.156.225/api/atividade';
  API = 'https://44.207.63.220:8443/api/atividade';

  constructor() { }

  getToken() {
    return localStorage.getItem('token');
  }

  getAuthHeaders() {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  listAll(): Observable<Atividade[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Atividade[]>(this.API, { headers });
  }

  listAllConcluidas(): Observable<Atividade[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Atividade[]>(`${this.API}/concluidas`, { headers });
  }

  listAllCanceladas(): Observable<Atividade[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Atividade[]>(`${this.API}/canceladas`, { headers });
  }

  pesquisarPorNome(nome: string): Observable<Atividade[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Atividade[]>(`${this.API}/atividades/por-nome?nome=${nome}`, { headers });
  }

  save(atividade: Atividade): Observable<Atividade> {
    const headers = this.getAuthHeaders();
    return this.http.post<Atividade>(this.API, atividade, { headers });
  }

  update(atividade: Partial<Atividade>): Observable<Atividade> {
    const headers = this.getAuthHeaders();
    return this.http.put<Atividade>(`${this.API}/${atividade.id}`, atividade, { headers });
  }

  loadById(id: number): Observable<Atividade> {
    const headers = this.getAuthHeaders();
    return this.http.get<Atividade>(`${this.API}/${id}`, { headers });
  }

  delete(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    let params = new HttpParams().set('id', id.toString());
    return this.http.delete<any>(this.API, { params: params, headers });
  }

  concluirAtividade(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.API}/atualizarAtividade/${id}`, {}, { headers });
  }

  cancelarAtividade(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.API}/cancelarAtividade/${id}`, {}, { headers });
  }
}
