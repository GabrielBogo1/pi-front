package projetointegradorcciar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import projetointegradorcciar.entity.Atividade;
import java.util.List;

public interface AtividadeRepository extends JpaRepository<Atividade,Long> {
    @Query (value = "SELECT * FROM atividades a WHERE a.ativo = true order by a.data_atividade desc", nativeQuery = true)
    List<Atividade> getAllAtividadePorData();

    @Query (value = "SELECT * FROM atividades a WHERE a.concluida = true order by a.data_atividade desc", nativeQuery = true)
    List<Atividade> getAllAtividadeByConcluida();

    @Query (value = "SELECT * FROM atividades a WHERE a.cancelada = true order by a.data_atividade desc", nativeQuery = true)
    List<Atividade> getAllAtividadeByCancelada();

    List<Atividade> findByNomeAtividade(String nome);


}
