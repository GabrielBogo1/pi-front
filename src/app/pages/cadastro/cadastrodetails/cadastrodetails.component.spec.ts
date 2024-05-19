import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { CadastrodetailsComponent } from './cadastrodetails.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Sexo } from 'src/app/models/sexo';
import { Escolaridade } from 'src/app/models/escolaridade';
import { Pessoa } from 'src/app/models/pessoa';

describe('CadastrodetailsComponent', () => {
  let component: CadastrodetailsComponent;
  let fixture: ComponentFixture<CadastrodetailsComponent>;
  let mockPessoaService: jasmine.SpyObj<PessoaService>; // Defina o tipo explicitamente
  beforeEach(() => {
    mockPessoaService = jasmine.createSpyObj(['save', 'update']);

    TestBed.configureTestingModule({
      declarations: [CadastrodetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
              data: {
                pessoa: {} 
              }
            }
          }
        },
        { provide: PessoaService, useValue: mockPessoaService }
      ]
    });
    fixture = TestBed.createComponent(CadastrodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  
  it('chamada do método update', fakeAsync(() => {
    spyOn(window, 'alert');
    const mockEndereco = { id: 1, logradouro: 'Rua Teste', localidade: 'Cidade Teste', municipio: 'Municipio Teste', numCasa: 1, cep: 'CEP teste', uf: 'tstUf' };
    const mockDataCadastro = new Date(''); 
    const pessoa: Pessoa = { id: 1, nome: 'Teste', cpf: '12345678901', telefone: '123456789', endereco: mockEndereco, dataNascimento: 2000, rg: 'tstRG', naturalidade: 'tstNaturalidade', nacionalidade: 'tstNacionalidade', sexo: Sexo.MASCULINO, escolaridade: Escolaridade.CURSANDO, totalAtivos: 0, dataCadastro: mockDataCadastro };
    component.pessoa = pessoa;

    mockPessoaService.update.and.returnValue(of(pessoa));

    component.save();
    tick();

    expect(mockPessoaService.update).toHaveBeenCalledWith(pessoa);
    expect(window.alert).toHaveBeenCalledWith('Atualizado com sucesso');
  }));


  it('chamada do evento OnEdit', () => {

    const mockEndereco = { id: 1, logradouro: 'Rua Teste', localidade: 'Cidade Teste', municipio: 'Municipio Teste', numCasa: 1, cep: 'CEP teste', uf: 'tstUf' };
    const mockDataCadastro = new Date(''); 
    const pessoa: Pessoa = { id: 1, nome: 'Teste', cpf: '12345678901', telefone: '123456789', endereco: mockEndereco, dataNascimento: 2000, rg: 'tstRG', naturalidade: 'tstNaturalidade', nacionalidade: 'tstNacionalidade', sexo: Sexo.MASCULINO, escolaridade: Escolaridade.CURSANDO, totalAtivos: 0, dataCadastro: mockDataCadastro };
    spyOn(component.edit, 'emit');

    component.onEdit(pessoa);

    expect(component.edit.emit).toHaveBeenCalledWith(pessoa);
  });



  
});
