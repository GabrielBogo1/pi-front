import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";

export class Viacep {
    
    http = inject(HttpClient)

    getCepData(cep: string) {
        return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
    }
}
