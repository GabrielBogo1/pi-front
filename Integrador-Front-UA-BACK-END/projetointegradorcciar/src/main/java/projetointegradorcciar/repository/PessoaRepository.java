package projetointegradorcciar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import projetointegradorcciar.entity.Pessoa;

import java.util.List;

public interface PessoaRepository extends JpaRepository<Pessoa,Long> {
    Pessoa findByCpf(String cpf);
    Pessoa findByRg (String rg);
    List<Pessoa> findByNome (String nome);
    @Query (value = "SELECT * FROM Pessoas p ORDER BY p.nome asc", nativeQuery = true)
    List <Pessoa> orderByName();

    @Query (value = "SELECT * FROM Pessoas p ORDER BY p.cadastro_data desc", nativeQuery = true)
    List <Pessoa> orderByDataCadastro();

    @Query (value = "SELECT COUNT(p) FROM Pessoas p WHERE p.ativo = true", nativeQuery = true)
    Long totalAtivos();


}
