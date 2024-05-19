import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Endereco } from 'src/app/models/endereco';
import { Pessoa } from 'src/app/models/pessoa';
import { Viacep } from 'src/app/models/viacep';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-cadastrodetails',
  templateUrl: './cadastrodetails.component.html',
  styleUrls: ['./cadastrodetails.component.scss']
})
export class CadastrodetailsComponent {
  pessoa: Pessoa = new Pessoa();
  viaCep: Viacep = new Viacep();
  pessoaParaEditar!: Pessoa;

  @Output() edit = new EventEmitter();
  registrarPessoaService = inject(PessoaService);

  constructor(private route: ActivatedRoute) {
    this.pessoa.endereco = new Endereco();
   }

  buscarCep() {
    this.viaCep.getCepData(this.pessoa.endereco.cep).subscribe((data: any) => {
      console.log(data)
      this.pessoa.endereco.logradouro = data.bairro;
      this.pessoa.endereco.localidade = data.logradouro;
      this.pessoa.endereco.cep = data.cep;
      this.pessoa.endereco.municipio = data.localidade;
      this.pessoa.endereco.uf = data.uf
      this.pessoa.endereco.id;
    });
  }


  save() {

    if (!this.pessoa.nome) {
      alert('Nome não pode ser nulo')
      return
    } else if (!this.pessoa.cpf || this.pessoa.cpf.length > 14 || this.pessoa.cpf.length < 11) {
      alert('CPF inválido')
      return;
    } else if (!this.pessoa.telefone) {
      alert('Telefone inválido')
    }
    else if (!this.pessoa.rg) {
      alert('RG inválido')
    }
    else if (!this.pessoa.nacionalidade) {
      alert('Nacionalidade não pode ser nula')
    }

    if (this.pessoa.id > 0) {
      this.registrarPessoaService.update(this.pessoa).subscribe({
        next: retorno => {
          console.log(retorno);
          alert("Atualizado com sucesso");
        },
        error: erro => {
          console.log(erro);
          alert('ERRO CABULOSO, VEJA O CONSOLE');
        }
      });
    } else {
      this.registrarPessoaService.save(this.pessoa).subscribe({
        next: retorno => {
          console.log(retorno);
          alert("Registrado com sucesso");
        },
        error: erro => {
          console.log(erro);
        }
      });
    }
  }

  onEdit(pessoa: Pessoa) {
    this.edit.emit(pessoa);
  }

  // ngOnInit(): void {
  //   const pessoa: Pessoa = this.route.snapshot.data['pessoa'];

  //   this.pessoa.id = pessoa.id;
  //   this.pessoa.nome = pessoa.nome;
  //   this.pessoa.cpf = pessoa.cpf
  //   this.pessoa.telefone = pessoa.telefone
  //   this.pessoa.dataNascimento = pessoa.dataNascimento;
  //   this.pessoa.escolaridade = pessoa.escolaridade;
  //   this.pessoa.sexo = pessoa.sexo;
  //   this.pessoa.nacionalidade = pessoa.nacionalidade;
  //   this.pessoa.naturalidade = pessoa.naturalidade;
  //   this.pessoa.rg = pessoa.rg;

  //   this.pessoa.endereco.cep = pessoa.endereco.cep;
  //   this.pessoa.endereco.localidade = pessoa.endereco.localidade;
  //   this.pessoa.endereco.logradouro = pessoa.endereco.logradouro;
  //   this.pessoa.endereco.numCasa = pessoa.endereco.numCasa;
  //   this.pessoa.endereco.municipio = pessoa.endereco.municipio;
  //   this.pessoa.endereco.uf = pessoa.endereco.uf
  //   console.log(pessoa);
  // }

  ngOnInit(): void {
    const pessoa: Pessoa = this.route.snapshot.data['pessoa'];
  
    this.pessoa.id = pessoa.id;
    this.pessoa.nome = pessoa.nome;
    this.pessoa.cpf = pessoa.cpf;
    this.pessoa.telefone = pessoa.telefone;
    this.pessoa.dataNascimento = pessoa.dataNascimento;
    this.pessoa.escolaridade = pessoa.escolaridade;
    this.pessoa.sexo = pessoa.sexo;
    this.pessoa.nacionalidade = pessoa.nacionalidade;
    this.pessoa.naturalidade = pessoa.naturalidade;
    this.pessoa.rg = pessoa.rg;
  
    // Certifique-se de que this.pessoa.endereco é inicializado
    this.pessoa.endereco = this.pessoa.endereco || {};
  
    // Garanta que as propriedades de this.pessoa.endereco sejam inicializadas
    this.pessoa.endereco.cep = this.pessoa.endereco.cep || '';
    this.pessoa.endereco.localidade = this.pessoa.endereco.localidade || '';
    this.pessoa.endereco.logradouro = this.pessoa.endereco.logradouro || '';
    this.pessoa.endereco.municipio = this.pessoa.endereco.municipio || '';
    this.pessoa.endereco.uf = this.pessoa.endereco.uf || '';
  
    console.log(pessoa);
  }
  


}
