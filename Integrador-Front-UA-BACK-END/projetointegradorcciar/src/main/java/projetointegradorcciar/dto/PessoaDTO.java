package projetointegradorcciar.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;
import org.springframework.validation.annotation.Validated;
import projetointegradorcciar.entity.Endereco;
import projetointegradorcciar.entity.Escolaridade;
import projetointegradorcciar.entity.Sexo;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Validated
public class PessoaDTO {

    private Long id;
    @NotNull(message = "Nome não pode ser nulo")
    @NotBlank(message = "Nome não estar ser em branco")
    @Size(max = 50, message = "Nome excede limite de caracteres")
    @Pattern(regexp = "^[a-zA-ZÀ-ÿ\\s]*$", message = "Nome não pode conter caracteres especiais")
    private String nome;
    @NotNull (message = "CPF não pode ser nulo")
    @NotBlank (message = "CPF não pode estar em branco")
    @Size (max = 14, message = "CPF excede limite de caracteres")
    @CPF(message = "CPF inválido")
    private String cpf;
    private Endereco endereco;
    @NotNull (message = "Data de nascimento não pode ser nula")
    private int dataNascimento;
    @NotNull (message = "RG não pode ser nulo")
    @NotBlank (message = "RG não pode estar em branco")
    private String rg;
    @NotNull (message = "Telefone não pode ser nulo")
    @NotBlank (message = "Telefone não pode estar em branco")
    private String telefone;

    @NotNull (message = "Nacionalidade não pode ser nula")
    @NotBlank (message = "Nacionalidade não pode estar em branco")
    @Size (max = 50, message = "Nacionalidade excede limite de caracteres")
    private String nacionalidade;

    private Escolaridade escolaridade;

    private Sexo sexo;

    private Date dataCadastro;

    private LocalDateTime edicaoCadastro;

    private boolean ativo;

    private Long totalAtivos;

}
