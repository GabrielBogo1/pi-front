import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { CadastroAtividadelistComponent } from './cadastro-atividadelist.component';
import { AtividadeService } from 'src/app/services/atividade.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Atividade } from 'src/app/models/atividade';
import { Pessoa } from 'src/app/models/pessoa';
import { Escolaridade } from 'src/app/models/escolaridade';
import { Sexo } from 'src/app/models/sexo';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('CadastroAtividadelistComponent', () => {
  let component: CadastroAtividadelistComponent;
  let fixture: ComponentFixture<CadastroAtividadelistComponent>;

  
  let atividadeService: AtividadeService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroAtividadelistComponent],
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatMenuModule,
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: NgbModal, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: {} },
    

        FormBuilder
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAtividadelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    atividadeService = TestBed.inject(AtividadeService);
    httpTestingController = TestBed.inject (HttpTestingController);
  });

  it('teste list all atividades', fakeAsync(() => {
    const mockEndereco = { id: 1, logradouro: 'Rua Teste', localidade: 'Cidade Teste', municipio: 'Municipio Teste', numCasa: 1, cep: 'CEP teste', uf: 'tstUf' };
    const mockDataCadastro = new Date('2023-12-05');
  
    const pessoas: Pessoa[] = [
      { id: 1, nome: 'Teste', cpf: '12345678901', telefone: '123456789', endereco: mockEndereco, dataNascimento: 2000, rg: 'tstRG', naturalidade: 'tstNaturalidade', nacionalidade: 'tstNacionalidade', sexo: Sexo.MASCULINO, escolaridade: Escolaridade.CURSANDO, totalAtivos: 0, dataCadastro: mockDataCadastro },
    ];
  
    const mockAtividade: Atividade[] = [
      { id: 1, nomeAtividade: 'Teste 1' , descricao: 'teste', pessoas: pessoas, dataAtividade: mockDataCadastro, concluida: true, horarioAtividade: '', ativo: true, cancelada: false },
      { id: 2, nomeAtividade: 'Teste 2' , descricao: 'teste', pessoas: pessoas, dataAtividade: mockDataCadastro, concluida: true, horarioAtividade: '', ativo: true, cancelada: false },
    ];
  
    spyOn(atividadeService, 'listAll').and.returnValue(of(mockAtividade));
  
    component.listAll();
    tick();
    fixture.detectChanges();
  
    expect(component.listaAtividade).toEqual(mockAtividade);
  }));
  
  
});
