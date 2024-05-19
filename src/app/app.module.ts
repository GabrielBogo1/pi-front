import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './sistema/login/login.component';
import { IndexComponent } from './layout/index/index.component';
import { HeaderComponent } from './layout/header/header.component';

import { CadastrodetailsComponent } from './pages/cadastro/cadastrodetails/cadastrodetails.component';
import { CadastrolistComponent } from './pages/cadastro/cadastrolist/cadastrolist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { CadastroAtividadedetailsComponent } from './pages/atividades/cadastro-atividadedetails/cadastro-atividadedetails.component';
import { CadastroAtividadelistComponent } from './pages/atividades/cadastro-atividadelist/cadastro-atividadelist.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { AtividadeListDialogComponent } from './dialogs/atividade-list-dialog/atividade-list-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { DialogCancelarComponent } from './dialogs/atividade-list-dialog/dialog-cancelar/dialog-cancelar.component';
import { CpfMaskDirective } from './directives/cpf-mask.directive';
import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { RgMaskDirective } from './directives/rg-mask.directive';
import { DialogConcluirComponent } from './dialogs/atividade-list-dialog/dialog-concluir/dialog-concluir.component';
import { PessoasListDialogComponent } from './dialogs/pessoas-list-dialog/pessoas-list-dialog.component';


import { KeycloakService } from './keycloak-config/keycloak.service';
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';




export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    HeaderComponent,
    CadastrodetailsComponent,
    CadastrolistComponent,
    CadastroAtividadedetailsComponent,
    CadastroAtividadelistComponent,
    AtividadeListDialogComponent,
    DialogCancelarComponent,
    CpfMaskDirective,
    PhoneMaskDirective,
    RgMaskDirective,
    DialogConcluirComponent,
    PessoasListDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'DD/MM/YYYY',
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },

    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    },
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
  ],




  bootstrap: [AppComponent],


})
export class AppModule { }
