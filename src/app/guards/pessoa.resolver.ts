import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pessoa } from '../models/pessoa';
import { PessoaService } from '../services/pessoa.service';
import { Injectable } from '@angular/core';
import { Sexo } from '../models/sexo';
import { Escolaridade } from '../models/escolaridade';

@Injectable({
  providedIn: 'root'
})
export class PessoaResolver implements Resolve<Pessoa> {

  pessoa: Pessoa = new Pessoa();

  constructor(private service: PessoaService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pessoa> {
    if (route.params && route.params['id']) {

      return this.service.loadById(route.params['id'])
    }
    const pessoaSemEndereco: Pessoa = {
      id: 0,
      nome: '',
      cpf: '',
      endereco: {
        id: 0,
        cep: '',
        logradouro: '',
        localidade: '',
        numCasa: 0,
        uf: '',
        municipio: ''
      },
      dataNascimento: 0,
      rg: '',
      telefone: '',
      naturalidade: '',
      nacionalidade: '',
      sexo: Sexo.NULL,
      escolaridade: Escolaridade.NULL,
      totalAtivos: 0,
      dataCadastro: null
    };
    return of(pessoaSemEndereco);
  }
}
