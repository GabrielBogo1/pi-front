package projetointegradorcciar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import projetointegradorcciar.dto.PessoaDTO;
import projetointegradorcciar.entity.Pessoa;
import projetointegradorcciar.repository.PessoaRepository;
import projetointegradorcciar.service.PessoaService;

import java.util.List;

@Controller
@RequestMapping(value = "/api/pessoa")
@CrossOrigin
public class PessoaController {
    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private PessoaService pessoaService;

    @GetMapping("/{id}")
    public ResponseEntity<Pessoa> findByIDPath (@PathVariable("id") final Long id){
        final Pessoa pessoa = this.pessoaRepository.findById(id).orElse(null);
        return ResponseEntity.ok(pessoa);
    }

    @GetMapping
    public ResponseEntity<List<Pessoa>> listaCompleta() {
        System.out.println(pessoaRepository.totalAtivos());
        return ResponseEntity.ok(this.pessoaRepository.findAll());
    }

    @GetMapping("/api/pessoa/nome")
    public List<Pessoa> pesquisarPorNome(@RequestParam String nome) {
        return pessoaRepository.findByNome(nome);
    }


    @GetMapping ("/ordenar")
    public ResponseEntity<List<Pessoa>> orderByName() {
        return ResponseEntity.ok(this.pessoaRepository.orderByName());
    }

    @GetMapping ("/ordenar-data")
    public ResponseEntity<List<Pessoa>> orderByDataCadastro() {
        return ResponseEntity.ok(this.pessoaRepository.orderByDataCadastro());
    }

    @GetMapping("total-ativos")
    public ResponseEntity<Long> totalAtivos() {
        Long total = pessoaRepository.totalAtivos();
        return ResponseEntity.ok(total);
    }
    @PostMapping
    public ResponseEntity<HttpStatus> cadastrar (@Validated @RequestBody final PessoaDTO pessoaDTO) {
        try {
            pessoaService.validaPessoa(pessoaDTO);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<> (null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<HttpStatus> editar(@PathVariable("id") final Long id, @Validated @RequestBody final PessoaDTO pessoaDTO) {
        try {
            pessoaService.editarPessoa(id, pessoaDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity<> (null, HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping
    public ResponseEntity<HttpStatus> deletaPessoa (@RequestParam ("id") final Long id){
        try {
            this.pessoaService.deletarPessoa(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            // String errorMessage = getErrorMessage(e);
            return new ResponseEntity<> (null, HttpStatus.BAD_REQUEST);
        }
    }

    // public String getErrorMessage(Exception e) {
    //     return "Error: " + e.getMessage();
    // }
}
