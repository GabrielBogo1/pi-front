package projetointegradorcciar.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;
import projetointegradorcciar.entity.Pessoa;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Validated
@NoArgsConstructor
@AllArgsConstructor
public class AtividadeDTO {

    private Long id;
    private boolean ativo;

    @NotNull(message = "Nome da atividade não pode ser nula")
    @NotBlank(message = "Nome da atividade não pode estar em branco")
    @Size(max = 200, message = "Nome da atividade excede limite de caracteres")
    private String nomeAtividade;

    @Size(max = 200, message = "Descrição da atividade excede limite de caracteres")
    private String descricao;

    private LocalTime horarioCadastro;

    private List<Pessoa> pessoas;

    private boolean concluida;

    private boolean cancelada;

    private Date dataAtividade;

    private String horarioAtividade;


}
