import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CadastroAtividadedetailsComponent } from './cadastro-atividadedetails.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AtividadeService } from 'src/app/services/atividade.service';
import { Pessoa } from 'src/app/models/pessoa';
import { of } from 'rxjs';
import { Escolaridade } from 'src/app/models/escolaridade';
import { Sexo } from 'src/app/models/sexo';
import { Atividade } from 'src/app/models/atividade';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CadastroAtividadedetailsComponent', () => {
  let component: CadastroAtividadedetailsComponent;
  let fixture: ComponentFixture<CadastroAtividadedetailsComponent>;

  let atividadeService: AtividadeService;
  let modalService: NgbModal;
  let formBuilder: FormBuilder;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroAtividadedetailsComponent],
      imports: [FormsModule, ReactiveFormsModule, MatDialogModule, HttpClientTestingModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, BrowserAnimationsModule, NoopAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { atividade: {} }
            }
          }
        },
        FormBuilder,
        MatDialog,
        {
          provide: NgbModal,
          useValue: {
            open: () => ({ componentInstance: {}, result: Promise.resolve('result') } as NgbModalRef),
          }
        },
        AtividadeService,
      ]
    });

    fixture = TestBed.createComponent(CadastroAtividadedetailsComponent);
    component = fixture.componentInstance;
    atividadeService = TestBed.inject(AtividadeService);
    modalService = TestBed.inject(NgbModal);
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    atividadeService = TestBed.inject(AtividadeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('teste metodo save', fakeAsync(() => {
    spyOn(modalService, 'open').and.returnValue({ componentInstance: {}, result: Promise.resolve('result') } as NgbModalRef);
    spyOn(atividadeService, 'save').and.returnValue(of({} as Atividade));

    component.salvar();

    tick();
    fixture.detectChanges();

    expect(atividadeService.save).toHaveBeenCalled();
  }));

  it('teste metodo update', fakeAsync(() => {
    component.atividade.id = 1;
    spyOn(atividadeService, 'update').and.returnValue(of({} as Atividade));

    component.salvar();

    tick();
    fixture.detectChanges();

    expect(atividadeService.update).toHaveBeenCalled();
  }));

  it('teste pra abrir modal pra adicionar pessoas', () => {
    spyOn(modalService, 'open').and.returnValue({ componentInstance: {}, result: Promise.resolve('result') } as NgbModalRef);

    component.adicionar('modal');

    expect(modalService.open).toHaveBeenCalled();
  });

  it('teste para adicionar pessoa em atividade no metodo retorno pessoa list', () => {

    const mockEndereco = { id: 1, logradouro: 'Rua Teste', localidade: 'Cidade Teste', municipio: 'Municipio Teste', numCasa: 1, cep: 'CEP teste', uf: 'tstUf' };

    const mockDataCadastro = new Date('2023-12-05');

    const pessoa: Pessoa = { id: 1, nome: 'Teste', cpf: '12345678901', telefone: '123456789', endereco: mockEndereco, dataNascimento: 2000, rg: 'tstRG', naturalidade: 'tstNaturalidade', nacionalidade: 'tstNacionalidade', sexo: Sexo.MASCULINO, escolaridade: Escolaridade.CURSANDO, totalAtivos: 0, dataCadastro: mockDataCadastro };

    component.atividade.pessoas = [];
    component.retornoPessoasList(pessoa);

    expect(component.atividade.pessoas).toEqual([pessoa]);
  });
});
