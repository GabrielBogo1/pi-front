import { Injectable, inject } from '@angular/core';
import { Atividade } from '../models/atividade';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  constructor() { }


  API = 'http://localhost:8080/api/atividade';
  http = inject(HttpClient);

  listAll(): Observable<Atividade[]> {
    return this.http.get<Atividade[]>(this.API);
  }
  
  listAllConcluidas(): Observable<Atividade[]> {
    return this.http.get<Atividade[]>(`${this.API}/concluidas`);
  }

  listAllCanceladas(): Observable<Atividade[]> {
    return this.http.get<Atividade[]>(`${this.API}/canceladas`);
  }

  pesquisarPorNome(nome: string): Observable<Atividade[]> {
    return this.http.get<Atividade[]>(`${this.API}/atividades/por-nome?nome=${nome}`);
  }

  save(atividade: Atividade): Observable<Atividade> {
    return this.http.post<Atividade>(this.API, atividade);
  }

  update(atividade: Partial<Atividade>) {
    return this.http.put<Atividade>(`${this.API}/${atividade.id}`, atividade);
  }

  loadById(id: number) {
    return this.http.get<Atividade>(`${this.API}/${id}`);
  }

  delete(id: number): Observable<any> {
    let params = new HttpParams()
      .set('id', id.toString())
    return this.http.delete<any>(this.API, { params: params });
  }

  
  concluirAtividade(id: number) {
    return this.http.post(`${this.API}/atualizarAtividade/${id}`, {});
  }

  cancelarAtividade(id: number) {
    return this.http.post(`${this.API}/cancelarAtividade/${id}`, {});
  }
}
