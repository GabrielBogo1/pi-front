import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CadastrolistComponent } from './cadastrolist.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Pessoa } from 'src/app/models/pessoa';
import { Sexo } from 'src/app/models/sexo';
import { Escolaridade } from 'src/app/models/escolaridade';

describe('CadastrolistComponent', () => {
  let component: CadastrolistComponent;
  let fixture: ComponentFixture<CadastrolistComponent>;

  let pessoaService: PessoaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrolistComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatIconModule, MatMenuModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'someId'
              }
            }
          }
        }
      ]
    });
    fixture = TestBed.createComponent(CadastrolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    pessoaService = TestBed.inject(PessoaService);
    httpTestingController = TestBed.inject (HttpTestingController);
  });

  it('teste list all pessoas', fakeAsync(() => {
    const mockEndereco = { id: 1, logradouro: 'Rua Teste', localidade: 'Cidade Teste', municipio: 'Municipio Teste', numCasa: 1, cep: 'CEP teste', uf: 'tstUf' };
  
    const mockDataCadastro = new Date('2023-12-05');
  
    const mockPessoa: Pessoa[] = [
      { id: 1, nome: 'Teste', cpf: '12345678901', telefone: '123456789', endereco: mockEndereco, dataNascimento: 2000, rg: 'tstRG', naturalidade: 'tstNaturalidade', nacionalidade: 'tstNacionalidade', sexo: Sexo.MASCULINO, escolaridade: Escolaridade.CURSANDO, totalAtivos: 0, dataCadastro: mockDataCadastro },
    ];
  
    spyOn(pessoaService, 'listAll').and.returnValue(of(mockPessoa));
  
    component.listAll();
    tick();
    fixture.detectChanges();
  
    expect(component.lista).toEqual(mockPessoa);
  }));
  
});
