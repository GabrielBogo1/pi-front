import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PessoaService } from './pessoa.service';
import { Pessoa } from '../models/pessoa';
import { Endereco } from '../models/endereco';
import { Escolaridade } from '../models/escolaridade';
import { Sexo } from '../models/sexo';

describe('PessoaService', () => {
  let service: PessoaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(PessoaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('teste metodo update', () => {
    const mockPessoa: Pessoa = {
      id: 1,
      nome: 'Test Pessoa',
      cpf: '12345678901',
      endereco: new Endereco(),
      dataNascimento: 946684800000,
      rg: 'testRG',
      telefone: 'testTel',
      naturalidade: 'testNaturalidade',
      nacionalidade: 'testNacionalidade',
      sexo: Sexo.MASCULINO,
      escolaridade: Escolaridade.CURSANDO,
      totalAtivos: 0,
      dataCadastro: null,
    };

    service.update(mockPessoa).subscribe((response) => {
      expect(response).toEqual(mockPessoa);
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/api/pessoa/${mockPessoa.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockPessoa);
  });

  it('teste delete', () => {
    const mockPessoaId = 1;

    service.delete(mockPessoaId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/api/pessoa?id=${mockPessoaId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });

  it('teste list all', () => {
    const mockPessoas: Pessoa[] = [
      { id: 1,
        nome: 'Test Pessoa',
        cpf: '12345678901',
        endereco: new Endereco(),
        dataNascimento: 946684800000, 
        rg: 'testRG',
        telefone: 'testTel',
        naturalidade: 'testNaturalidade',
        nacionalidade: 'testNacionalidade',
        sexo: Sexo.MASCULINO,
        escolaridade: Escolaridade.CURSANDO,
        totalAtivos: 0,
        dataCadastro: null, },
      { id: 1,
        nome: 'Test Pessoa2',
        cpf: '12345678901',
        endereco: new Endereco(),
        dataNascimento: 946684800000,
        rg: 'testRG',
        telefone: 'testTel',
        naturalidade: 'testNaturalidade',
        nacionalidade: 'testNacionalidade',
        sexo: Sexo.MASCULINO,
        escolaridade: Escolaridade.CURSANDO,
        totalAtivos: 0,
        dataCadastro: null, },
    ];

    service.listAll().subscribe((response) => {
      expect(response).toEqual(mockPessoas);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/pessoa');
    expect(req.request.method).toEqual('GET');
    req.flush(mockPessoas);
  });

  it('teste load by id', () => {
    const mockPessoaId = 1;
    const mockPessoa: Pessoa = { id: 1,
      nome: 'Test Pessoa',
      cpf: '12345678901',
      endereco: new Endereco(),
      dataNascimento: 946684800000, 
      rg: 'testRG',
      telefone: 'testTel',
      naturalidade: 'testNaturalidade',
      nacionalidade: 'testNacionalidade',
      sexo: Sexo.MASCULINO,
      escolaridade: Escolaridade.CURSANDO,
      totalAtivos: 0,
      dataCadastro: null,};

    service.loadById(mockPessoaId).subscribe((response) => {
      expect(response).toEqual(mockPessoa);
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/api/pessoa/${mockPessoaId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockPessoa);
  });

  it('teste ordem alfabetica', () => {
    const mockPessoas: Pessoa[] = [
      { id: 1,
        nome: 'Test Pessoa',
        cpf: '12345678901',
        endereco: new Endereco(),
        dataNascimento: 946684800000,
        rg: 'testRG',
        telefone: 'testTel',
        naturalidade: 'testNaturalidade',
        nacionalidade: 'testNacionalidade',
        sexo: Sexo.MASCULINO,
        escolaridade: Escolaridade.CURSANDO,
        totalAtivos: 0,
        dataCadastro: null, },
      { id: 1,
        nome: 'Best Pessoa',
        cpf: '12345678901',
        endereco: new Endereco(),
        dataNascimento: 946684800000,
        rg: 'testRG',
        telefone: 'testTel',
        naturalidade: 'testNaturalidade',
        nacionalidade: 'testNacionalidade',
        sexo: Sexo.MASCULINO,
        escolaridade: Escolaridade.CURSANDO,
        totalAtivos: 0,
        dataCadastro: null, },
    ];

    service.listPorOrdemAlfabetica().subscribe((response) => {
      expect(response).toEqual(mockPessoas);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/pessoa/ordenar');
    expect(req.request.method).toEqual('GET');
    req.flush(mockPessoas);
  });

  it('teste ordenar data cadastro', () => {
    const mockPessoas: Pessoa[] = [
      { id: 1,
        nome: 'Test Pessoa',
        cpf: '12345678901',
        endereco: new Endereco(),
        dataNascimento: 946684800000,
        rg: 'testRG',
        telefone: 'testTel',
        naturalidade: 'testNaturalidade',
        nacionalidade: 'testNacionalidade',
        sexo: Sexo.MASCULINO,
        escolaridade: Escolaridade.CURSANDO,
        totalAtivos: 0,
        dataCadastro: null,},
      { id: 1,
        nome: 'Test Pessoa',
        cpf: '12345678901',
        endereco: new Endereco(),
        dataNascimento: 946684800000,
        rg: 'testRG',
        telefone: 'testTel',
        naturalidade: 'testNaturalidade',
        nacionalidade: 'testNacionalidade',
        sexo: Sexo.MASCULINO,
        escolaridade: Escolaridade.CURSANDO,
        totalAtivos: 0,
        dataCadastro: null,},
    ];

    service.listPorDataCadastro().subscribe((response) => {
      expect(response).toEqual(mockPessoas);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/pessoa/ordenar-data');
    expect(req.request.method).toEqual('GET');
    req.flush(mockPessoas);
  });

  it('metodo allativos', () => {
    const mockTotalAtivos = 10;

    service.getTotalAtivos().subscribe((response) => {
      expect(response).toEqual(mockTotalAtivos);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/pessoa/total-ativos');
    expect(req.request.method).toEqual('GET');
    req.flush(mockTotalAtivos);
  });
});
