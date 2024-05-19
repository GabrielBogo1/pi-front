import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Pessoa } from '../models/pessoa';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  http = inject(HttpClient);
  API = "http://localhost:8080/api/pessoa";

  constructor() { }

  save(pessoa: Pessoa): Observable<Pessoa> {
    if (pessoa.id !== undefined && pessoa.id > 0) {
      return this.update(pessoa);
    }
    return this.http.post<Pessoa>(this.API, pessoa);
  }

  update(pessoa: Partial<Pessoa>) {
    return this.http.put<Pessoa>(`${this.API}/${pessoa.id}`, pessoa);
  }

  delete(id: number): Observable<any> {
    let params = new HttpParams()
      .set('id', id.toString())
    return this.http.delete<any>(this.API, { params: params });
  }

  listAll(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.API);
  }

  loadById(id: number) {
    return this.http.get<Pessoa>(`${this.API}/${id}`);
  }

  listPorOrdemAlfabetica(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.API}/ordenar`);
  }

  listPorDataCadastro(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.API}/ordenar-data`);
  }

  getTotalAtivos(): Observable<number> {
    return this.http.get<number>(`${this.API}/total-ativos`);
  }


}
