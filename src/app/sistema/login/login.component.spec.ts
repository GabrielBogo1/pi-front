// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LoginComponent } from './login.component';
// import { Admin } from 'src/app/models/admin';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { LoginService } from 'src/app/services/login.service';
// import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
// import { FormsModule } from '@angular/forms';
// import { of } from 'rxjs';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let httpTestingController: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, FormsModule],
//       declarations: [LoginComponent],
//       providers: [LoginService],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
//     });

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     httpTestingController = TestBed.inject(HttpTestingController);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
 

//   it('should send a POST request to logar and return an Observable<Admin>', () => {
//     const mockLogin = { username: 'test@example.com', password: 'password' };
//     const mockAdmin: Admin = { id: 1, nomeAdm: 'tstAdm', username: 'tstUser', token: 'tstToken', telefone: 'tstTel', role: 'ADMIN' };

//     component.loginService.logar(mockLogin).subscribe(response => {
//       expect(response).toEqual(mockAdmin);
//     });

//     const req = httpTestingController.expectOne('http://localhost:8080/login');
//     expect(req.request.method).toEqual('POST');
//     req.flush(mockAdmin);
//   });

//   afterEach(() => {
//     httpTestingController.verify();
//   });
// });
