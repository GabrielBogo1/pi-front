import { Pessoa } from "./pessoa";

export class Atividade {
    id!: number;
    nomeAtividade!: string;
    descricao!: string;
    pessoas: Pessoa[] = [];
    dataAtividade!: Date | null;
    concluida!: boolean;
    horarioAtividade!: string;
    ativo!: boolean;
    cancelada!: boolean;
}
