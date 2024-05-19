import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Atividade } from 'src/app/models/atividade';
import { AtividadeService } from 'src/app/services/atividade.service';
import { switchMap } from 'rxjs';
import { AtividadeListDialogComponent } from 'src/app/dialogs/atividade-list-dialog/atividade-list-dialog.component';
import { DialogCancelarComponent } from 'src/app/dialogs/atividade-list-dialog/dialog-cancelar/dialog-cancelar.component';
import { DialogConcluirComponent } from 'src/app/dialogs/atividade-list-dialog/dialog-concluir/dialog-concluir.component';


@Component({
  selector: 'app-cadastro-atividadelist',
  templateUrl: './cadastro-atividadelist.component.html',
  styleUrls: ['./cadastro-atividadelist.component.scss']
})
export class CadastroAtividadelistComponent {
  listaAtividade: Atividade[] = [];
  atividadeSelecionadaParaEdicao: Atividade = new Atividade();

  atividade: Atividade = new Atividade;

  atividadeService = inject(AtividadeService);
  modalService = inject(NgbModal);

  queryField = new FormControl;
  value: string = '';

  filteredList: Atividade[] = [];

  public atividadeForm!: FormGroup;

  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private fb: FormBuilder,) {

    this.listAll();
  }


  openDialog(id: number) {
    const dialogRef = this.dialog.open(AtividadeListDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deletar(id);
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogCancel(id: number) {
    const dialogRef = this.dialog.open(DialogCancelarComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.cancelaAtividade(id);
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogConcluir(id: number) {
    const dialogRef = this.dialog.open(DialogConcluirComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.concluirAtividade(id);
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  onSearch() {
    this.value = this.queryField.value;
    this.value = this.value.toLowerCase();
    if (this.value && (this.value = this.value.trim()) != '') {
      this.filteredList = [];
      for (let i = 0; i < this.listaAtividade.length; i++) {
        let nomeMinusculo = this.listaAtividade[i].nomeAtividade.toLowerCase();
        if (nomeMinusculo.includes(this.value)) {
          this.filteredList.push(this.listaAtividade[i])
        }
      }
    } else {
      this.filteredList = this.listaAtividade;
    }
  }


  listAll() {

    this.atividadeService.listAll().subscribe({
      next: lista => {
        this.listaAtividade = lista;
      },
      error: erro => {
        alert('ERRO CABULOSO');
        console.error(erro);
      }
    });

  }

  listAllConcluidas() {
    this.atividadeService.listAllConcluidas().subscribe({
      next: lista => {
        this.listaAtividade = lista;
      },
      error: erro => {
        alert('ERRO CABULOSO');
        console.error(erro);
      }
    });

  }

  listAllCanceladas() {
    this.atividadeService.listAllCanceladas().subscribe({
      next: lista => {
        this.listaAtividade = lista;
      },
      error: erro => {
        alert('ERRO CABULOSO');
        console.error(erro);
      }
    });

  }

  pesquisarAtividadePorNome(nome: string) {
    this.atividadeService.pesquisarPorNome(nome).subscribe({
      next: lista => {
        this.listaAtividade = lista;
      },
      error: erro => {
        alert('ERRO CABULOSO');
        console.error(erro);
      }
    });
  }

  concluirAtividade(id: number) {
    this.atividadeService.concluirAtividade(id).subscribe({
      next: atividade => {
        this.listAll();
        alert('Atividade concluída')
      },
      error: erro => {
        alert('ERRO CABULOSO')
        console.log(erro);
      }
    });
  }

  cancelaAtividade(id: number) {
    this.atividadeService.cancelarAtividade(id).pipe(
      switchMap(() => this.atividadeService.listAll())
    ).subscribe({
      next: atividade => {
        alert('Atividade cancelada')
      },
      error: erro => {
        alert('ERRO CABULOSO')
        console.log(erro);
      }
    });
  }

  deletar(id: number) {
    this.atividadeService.delete(id).subscribe({
      next: retorno => {
        this.listAll();
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }


  // adicionar(modal: any) {
  //   this.atividadeSelecionadaParaEdicao = new Atividade();
  //   this.modalService.open(modal, { size: 'sm' });
  // }


  addOuEditarAtividade(atividade: Atividade) {
    this.listAll();
    this.modalService.dismissAll();
  }

  testeAlert() {
    alert('teste')
  }

  adicionar() {
    this.router.navigateByUrl('home/cadastroAtividade')
  }

  onEdit(atividade: Atividade) {
    this.router.navigate(['edit', atividade.id], { relativeTo: this.route })
  }
}
