package projetointegradorcciar.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import projetointegradorcciar.dto.AtividadeDTO;
import projetointegradorcciar.entity.Atividade;
import projetointegradorcciar.repository.AtividadeRepository;
import java.util.List;
import java.util.Optional;


@Service
public class AtividadeService {
    @Autowired
    private AtividadeRepository atividadeRepository;

  

    @Transactional(rollbackFor = Exception.class)
    public AtividadeDTO validaAtividade (AtividadeDTO atividadeDTO){

        var atividade = new Atividade();
        BeanUtils.copyProperties(atividadeDTO, atividade);

        atividade.setAtivo(true);

        Atividade atividadeSalva = this.atividadeRepository.save(atividade);
        AtividadeDTO atividadeDTO2 = new AtividadeDTO();
        BeanUtils.copyProperties(atividadeSalva,atividadeDTO2);
        return atividadeDTO2;
    }

    @Transactional (rollbackFor = Exception.class)
    public void editarAtividade (final Long id, final AtividadeDTO atividadeDTO) {

        final Atividade atividadeBanco = this.atividadeRepository.findById(id).orElse(null);

        if (atividadeBanco == null || !atividadeBanco.getId().equals(id)) {
            throw new RegistroNaoEncontradoException("Não foi possível identificar o registro informado");
        }

        BeanUtils.copyProperties(atividadeDTO, atividadeBanco);
        atividadeBanco.setAtivo(true);

        this.atividadeRepository.save(atividadeBanco);
    }

    public Atividade findById(Long id) {
        Optional<Atividade> atividadeOptional = atividadeRepository.findById(id);

        if (atividadeOptional.isPresent()) {
            return atividadeOptional.get();
        } else {
            return null;
        }
    }

    public Atividade save(Atividade atividade) {
        return atividadeRepository.save(atividade);
    }
    public List<Atividade> pesquisarPorNome(String nome) {

        return atividadeRepository.findByNomeAtividade(nome);
    }


    @Transactional (rollbackFor = Exception.class)
    public void deletarAtividade (final Long id){
        final Atividade atividadeBanco = this.atividadeRepository.findById(id).orElse(null);

        if (atividadeBanco == null || !atividadeBanco.getId().equals(id)){
            throw new RegistroNaoEncontradoException("Não foi possível identificar o registro informado");
        }

        this.atividadeRepository.delete(atividadeBanco);
    }


    public static class RegistroNaoEncontradoException extends RuntimeException {
        public RegistroNaoEncontradoException(String message) {
            super(message);
        }
    }
}
