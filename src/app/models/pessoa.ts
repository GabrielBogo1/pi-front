import { Endereco } from "./endereco";
import { Escolaridade } from "./escolaridade";
import { Sexo } from "./sexo";

export class Pessoa {
    id!: number;
    nome!: string;
    cpf!: string;
    endereco: Endereco = new Endereco;
    dataNascimento!: number;
    rg!: string;
    telefone!: string;
    naturalidade!: string;
    nacionalidade!: string;
    sexo!: Sexo;
    escolaridade!: Escolaridade;
    totalAtivos!: number;
    dataCadastro!: Date | null;
}
