package projetointegradorcciar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import projetointegradorcciar.dto.AtividadeDTO;
import projetointegradorcciar.entity.Atividade;
import projetointegradorcciar.repository.AtividadeRepository;
import projetointegradorcciar.service.AtividadeService;

import java.util.List;

@Controller
@RequestMapping(value = "/api/atividade")
@CrossOrigin
public class AtividadeController {
    @Autowired
    private AtividadeRepository atividadeRepository;

    @Autowired
    private AtividadeService atividadeService;

    @GetMapping("/{id}")
    public ResponseEntity<Atividade> findByIDPath(@PathVariable("id") final Long id) {
        final Atividade atividade = this.atividadeRepository.findById(id).orElse(null);
        return ResponseEntity.ok(atividade);
    }

    @GetMapping
    public ResponseEntity<List<Atividade>> listaCompleta() {
        return ResponseEntity.ok(this.atividadeRepository.getAllAtividadePorData());
    }

    @GetMapping ("/concluidas")
    public ResponseEntity<List<Atividade>> getConcluidas() {
        return ResponseEntity.ok(this.atividadeRepository.getAllAtividadeByConcluida());
    }

    @GetMapping ("/canceladas")
    public ResponseEntity<List<Atividade>> getCanceladas() {
        return ResponseEntity.ok(this.atividadeRepository.getAllAtividadeByCancelada());
    }

    @GetMapping("/atividades/por-nome")
    public List<Atividade> pesquisarPorNome(@RequestParam String nome) {
        return atividadeService.pesquisarPorNome(nome);
    }

    @PostMapping
    public AtividadeDTO cadastrarAtividade (@Validated @RequestBody final AtividadeDTO atividadeDTO) {
        try {
            return this.atividadeService.validaAtividade(atividadeDTO);
        } catch (DataIntegrityViolationException e) {
            // String errorMessage = getErrorMessage(e);
            return null;
        }
    }

    @PostMapping("/atualizarAtividade/{id}")
    public ResponseEntity<HttpStatus> concluirAtividade(@PathVariable Long id) {
        Atividade atividade = atividadeService.findById(id);
        if (atividade != null) {
            atividade.setConcluida(true);
            atividade.setAtivo(false);
            atividade.setCancelada(false);
            atividadeService.save(atividade);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/cancelarAtividade/{id}")
    public ResponseEntity<HttpStatus> cancelarAtividade(@PathVariable Long id) {
        Atividade atividade = atividadeService.findById(id);
        if (atividade != null) {
            atividade.setConcluida(false);
            atividade.setAtivo(false);
            atividade.setCancelada(true);
            atividadeService.save(atividade);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping ("/{id}")
    public ResponseEntity<HttpStatus> editar(@PathVariable("id") final Long id, @Validated @RequestBody final AtividadeDTO atividadeDTO) {
        try {
            atividadeService.editarAtividade(id,atividadeDTO);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<> (null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> deletaAtividade (@RequestParam  ("id") final Long id){
        try {
            this.atividadeService.deletarAtividade(id);
            return ResponseEntity.ok(HttpStatus.CREATED);          }
        catch (Exception e){
            return new ResponseEntity<> (null, HttpStatus.BAD_REQUEST);
        }
    }

    // public String getErrorMessage(Exception e) {
    //     return "Error: " + e.getMessage();
    // }
}
