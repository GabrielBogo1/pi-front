import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AtividadeService } from '../services/atividade.service';
import { Atividade } from '../models/atividade';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtividadeResolver implements Resolve<Atividade> {

  atividade: Atividade = new Atividade();

  constructor(private service: AtividadeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Atividade> {
    if (route.params && route.params['id']) {

      return this.service.loadById(route.params['id'])
    }
    const atividadeNula: Atividade = {
      id: 0,
      nomeAtividade: '',
      descricao: '',
      dataAtividade: null,
      concluida: false,
      horarioAtividade: '',
      ativo: false,
      pessoas: [],
      cancelada: false
    };
    return of(atividadeNula);
  }
}
