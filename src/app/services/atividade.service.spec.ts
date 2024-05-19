import { TestBed } from '@angular/core/testing';
import { AtividadeService } from './atividade.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Atividade } from '../models/atividade';

describe('AtividadeService', () => {
  let service: AtividadeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(AtividadeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list all atividades', () => {
    const mockAtividades: Atividade[] = [
      {
        id: 1,
        nomeAtividade: 'Atividade 1',
        descricao: 'Descrição 1',
        pessoas: [],
        dataAtividade: new Date(),
        concluida: false,
        horarioAtividade: '10:00 AM',
        ativo: true,
        cancelada: false,
      },
      {
        id: 2,
        nomeAtividade: 'Atividade 2',
        descricao: 'Descrição 2',
        pessoas: [],
        dataAtividade: new Date(),
        concluida: true,
        horarioAtividade: '02:00 PM',
        ativo: true,
        cancelada: false,
      },
    ];

    service.listAll().subscribe((response) => {
      expect(response).toEqual(mockAtividades);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/atividade');
    expect(req.request.method).toEqual('GET');
    req.flush(mockAtividades);
  });

  it('should list all concluídas atividades', () => {
    const mockAtividades: Atividade[] = [
      {
        id: 1,
        nomeAtividade: 'Atividade 1',
        descricao: 'Descrição 1',
        pessoas: [],
        dataAtividade: new Date(),
        concluida: true,
        horarioAtividade: '10:00 AM',
        ativo: true,
        cancelada: false,
      },
      {
        id: 2,
        nomeAtividade: 'Atividade 2',
        descricao: 'Descrição 2',
        pessoas: [],
        dataAtividade: new Date(),
        concluida: true,
        horarioAtividade: '02:00 PM',
        ativo: true,
        cancelada: false,
      },
    ];

    service.listAllConcluidas().subscribe((response) => {
      expect(response).toEqual(mockAtividades);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/atividade/concluidas');
    expect(req.request.method).toEqual('GET');
    req.flush(mockAtividades);
  });

  it('should list all canceladas atividades', () => {
    const mockAtividades: Atividade[] = [
      {
        id: 1,
        nomeAtividade: 'Atividade 1',
        descricao: 'Descrição 1',
        pessoas: [],
        dataAtividade: new Date(),
        concluida: false,
        horarioAtividade: '10:00 AM',
        ativo: true,
        cancelada: true,
      },
      {
        id: 2,
        nomeAtividade: 'Atividade 2',
        descricao: 'Descrição 2',
        pessoas: [],
        dataAtividade: new Date(),
        concluida: false,
        horarioAtividade: '02:00 PM',
        ativo: true,
        cancelada: true,
      },
    ];

    service.listAllCanceladas().subscribe((response) => {
      expect(response).toEqual(mockAtividades);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/atividade/canceladas');
    expect(req.request.method).toEqual('GET');
    req.flush(mockAtividades);
  });

  it('should search atividades by name', () => {
    const nome = 'Atividade';
    const mockAtividades: Atividade[] = [
      {
        id: 1,
        nomeAtividade: 'Atividade 1',
        descricao: 'Descrição 1',
        pessoas: [],
        dataAtividade: new Date(),
        concluida: false,
        horarioAtividade: '10:00 AM',
        ativo: true,
        cancelada: false,
      },
      {
        id: 2,
        nomeAtividade: 'Atividade 2',
        descricao: 'Descrição 2',
        pessoas: [],
        dataAtividade: new Date(),
        concluida: false,
        horarioAtividade: '02:00 PM',
        ativo: true,
        cancelada: false,
      },
    ];

    service.pesquisarPorNome(nome).subscribe((response) => {
      expect(response).toEqual(mockAtividades);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:8080/api/atividade/atividades/por-nome?nome=${nome}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockAtividades);
  });

  it('should save a new atividade', () => {
    const mockAtividade: Atividade = {
      id: 1,
      nomeAtividade: 'Nova Atividade',
      descricao: 'Descrição Nova Atividade',
      pessoas: [],
      dataAtividade: new Date(),
      concluida: false,
      horarioAtividade: '09:00 AM',
      ativo: true,
      cancelada: false,
    };

    service.save(mockAtividade).subscribe((response) => {
      expect(response).toEqual(mockAtividade);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/atividade');
    expect(req.request.method).toEqual('POST');
    req.flush(mockAtividade);
  });

  it('should update an existing atividade', () => {
    const mockAtividade: Atividade = {
      id: 1,
      nomeAtividade: 'Atividade Atualizada',
      descricao: 'Descrição Atividade Atualizada',
      pessoas: [],
      dataAtividade: new Date(),
      concluida: false,
      horarioAtividade: '10:00 AM',
      ativo: true,
      cancelada: false,
    };
  
    service.update(mockAtividade).subscribe((response) => {
      expect(response).toEqual(mockAtividade);
    });
  
    const req = httpTestingController.expectOne(`http://localhost:8080/api/atividade/${mockAtividade.id}`);
    expect(req.request.method).toEqual('PUT');
    
    req.flush(mockAtividade);
  
    httpTestingController.verify();
  });
  
})