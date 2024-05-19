import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';
import { FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PessoasListDialogComponent } from 'src/app/dialogs/pessoas-list-dialog/pessoas-list-dialog.component';


@Component({
  selector: 'app-cadastrolist',
  templateUrl: './cadastrolist.component.html',
  styleUrls: ['./cadastrolist.component.scss']
})
export class CadastrolistComponent {
  lista: Pessoa[] = [];
  totalAtivos!: number;

  pessoaSelecionadaParaEdicao: Pessoa = new Pessoa();
  indiceSelecionadoParaEdicao!: number;

  @Input() modoLancamento: boolean = false;
  @Output() retorno = new EventEmitter<Pessoa>();
  @Output() edit = new EventEmitter();

  queryField = new FormControl;
  value: string = '';

  filteredList: Pessoa [] = [];

  pessoaService = inject(PessoaService);


  constructor(private router: Router, private route: ActivatedRoute, public dialog:MatDialog) {
    this.listAll();
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(PessoasListDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deletar(id);
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  onSearch(){
    this.value = this.queryField.value;
    this.value = this.value.toLowerCase();
    if(this.value && (this.value = this.value.trim()) != ''){
      this.filteredList = [];
      for(let i = 0; i < this.lista.length; i++){
        let nomeMinusculo = this.lista[i].nome.toLowerCase();
          if(nomeMinusculo.includes(this.value)){
            this.filteredList.push(this.lista[i])
          }
      }
    }else{
      this.filteredList = this.lista;
    }

  }


  listAll() {
    this.pessoaService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('ERRO CABULOSO, VEJA O CONSOLE');
        console.error(erro);
      }
    });
  }

  adicionar() {
    this.router.navigateByUrl('home/novocadastro')
  }


  addOuEditarUsuario(pessoa: Pessoa) {
    this.listAll();
  }

  lancamento(pessoa: Pessoa) {
    this.retorno.emit(pessoa);
  }


  onEdit(pessoa: Pessoa) {
    this.router.navigate(['edit', pessoa.id], { relativeTo: this.route })
  }


  deletar(id: number) {
    this.pessoaService.delete(id).subscribe({
      next: retorno => {
        this.listAll();
      },
      error: erro => {
        alert('EERRO CABULOSO');
        console.error(erro);
      }
    });
  }

  listPorOrdemAlfabetica() {
    this.pessoaService.listPorOrdemAlfabetica().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('ERRO CABULOSO');
        console.error(erro);
      }
    });
  }

  listPorDataCadastro(){
    this.pessoaService.listPorDataCadastro().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('ERRO CABULOSO');
        console.error(erro);
      }
    });
  }

  ngOnInit(): void {
    this.pessoaService.getTotalAtivos().subscribe((total: number) => {
      this.totalAtivos = total;
    });
  }

 
}
