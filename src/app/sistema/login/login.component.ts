import { Component, OnInit, inject } from '@angular/core';
import { KeycloakService } from 'src/app/keycloak-config/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
constructor(private keycloakService: KeycloakService) {}

  async ngOnInit(): Promise<void> {
    await this.keycloakService.init();
    await this.keycloakService.login();
  }
}
