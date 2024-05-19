import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Atividade } from 'src/app/models/atividade';
import { Pessoa } from 'src/app/models/pessoa';
import { AtividadeService } from 'src/app/services/atividade.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';


(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-cadastro-atividadedetails',
  templateUrl: './cadastro-atividadedetails.component.html',
  styleUrls: ['./cadastro-atividadedetails.component.scss']
})
export class CadastroAtividadedetailsComponent {
  @Input() atividade: Atividade = new Atividade();
  @Output() retorno = new EventEmitter<Atividade>();

  modalRef!: NgbModalRef;
  modalService = inject(NgbModal);

  pessoas: Pessoa[] = [];

  // atividade1: Atividade = new Atividade();


  objetoSelecionadoParaEdicao: Atividade = new Atividade();
  indiceSelecionadoParaEdicao!: number;
  atividadeService = inject(AtividadeService);
  pessoaService = inject(PessoaService);

  atividadeForm!: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, public dialog: MatDialog) { }



  // onDataSelecionada(event: any): void {
  //   this.atividade.dataAtividade = event.value; // Atribui a data selecionada à atividade
  // }

  // onDataSelecionada(event: MatDatepickerInputEvent<Date>): void {
  //   this.atividade.dataAtividade = event.value;
  // }


  ngOnInit(): void {

    this.atividadeForm = this.fb.group({
      nomeAtividade: ['', Validators.required],
      descricao: [''],
      dataAtividade: ['', Validators.required],
      horarioAtividade: ['', Validators.required]
    });

    const atividade: Atividade = this.route.snapshot.data['atividade'];

    this.atividade.nomeAtividade = atividade.nomeAtividade;
    this.atividade.dataAtividade = atividade.dataAtividade;
    this.atividade.horarioAtividade = atividade.horarioAtividade;
    this.atividade.pessoas = atividade.pessoas;
    this.atividade.descricao = atividade.descricao;
    this.atividade.id = atividade.id;

  }


  salvar() {
    // const horario = new Date();
    // const [horas, minutos] = this.atividade.horarioAtividade.split(':'); // Divide o horário em horas e minutos

    // horario.setHours(Number(horas), Number(minutos), 0, 0); // Configura as horas e minutos no objeto Date

    // this.atividade.horarioAtividade = horario.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // this.atividadeService.save(this.atividadeForm.value).subscribe({
    //   next: atividade => {
    //     console.log(this.atividade)
    //     console.log(this.atividade.dataAtividade)
    //     this.retorno.emit(atividade);

    //   },
    //   error: erro => {
    //     alert('ERRO CABULOSO, VEJA O CONSOLE');
    //     console.log(this.atividadeForm.value)
    //     console.log(this.atividade.pessoas);
    //     this.atividade.pessoas = this.pessoas;
    //     console.error(erro);
    //   }
    // });


    if (this.atividade.id > 0) {
      this.atividadeService.update(this.atividade).subscribe({
        next: atividade => {
          alert('Editado com sucesso')
          this.retorno.emit(atividade);
        },
        error: erro => {
          alert('ERRO CABULOSO')
          console.log(erro);
        }
      });
    } else {

      this.atividadeService.save(this.atividade).subscribe({
        next: atividade => {
          console.log(this.atividade);
          console.log(this.atividade.dataAtividade);
          this.retorno.emit(atividade);
        },
        error: erro => {
          alert('Cadastrado com sucesso');
          console.log(this.atividade);
          console.error(erro);
        }
      });
    }


    // this.atividade.pessoas = this.pessoas;
    // console.log(this.atividade.pessoas)
    // console.log(this.atividadeForm.value);
  }



  // this.atividade.pessoas = this.pessoas;
  // console.log(this.atividade.pessoas)
  // console.log(this.atividadeForm.value);

  retornoPessoasList(pessoa: Pessoa) {
    if (this.atividade.pessoas == null)
      this.atividade.pessoas = [];
  
    this.pessoas.push(pessoa);
    this.atividade.pessoas = this.pessoas;
  
    // Verifique se modalRef está definido antes de chamar dismiss
    if (this.modalRef) {
      this.modalRef.dismiss();
    }
  }


  // retornoPessoasList(pessoa: Pessoa) {

  //   if (this.atividade.pessoas == null)
  //     this.atividade.pessoas = [];

  //   this.pessoas.push(pessoa);
  //   this.atividade.pessoas = this.pessoas;
  //   this.modalRef.dismiss();
  // }

  lancar(modal: any) {
    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  adicionar(modal: any) {
    this.objetoSelecionadoParaEdicao = new Atividade();
    this.indiceSelecionadoParaEdicao = -1;

    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  // ngOnInit(): void {


  //   const atividade: Atividade = this.route.snapshot.data['atividade'];

  //   this.atividade.nomeAtividade = atividade.nomeAtividade;
  //   this.atividade.descricao = atividade.descricao;
  //   atividade.horarioAtividade = atividade.horarioAtividade;
  //   alert(atividade.horarioAtividade);
  //   alert(atividade.dataAtividade);
  //   this.atividade.pessoas = atividade.pessoas;
  // }

  excluir(pessoa: Pessoa, indice: number) {
    this.atividade.pessoas.splice(indice, 1);
  }


  generatePDF() {
    const documentDefinition: TDocumentDefinitions = {
      content: [
        { text: 'Pessoas cadastradas em: ' + this.atividade.nomeAtividade, style: 'header' },
        { ul: this.getNamesList(), style: 'list' }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        list: {
          margin: [0, 0, 0, 10]
        }
      }
    };

    pdfMake.createPdf(documentDefinition).download('lista_pessoas.pdf');
  }

  getNamesList() {
    return this.atividade.pessoas.map(pesssoa => pesssoa.nome)
  }

}
