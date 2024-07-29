package com.growise.api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.growise.api.model.Produto;
import com.growise.api.service.ProdutoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @Operation(description = "Retorna uma lista com todos os registros de produtos")
    @ApiResponses(value ={
        @ApiResponse(responseCode = "200",description = "ok"),
        @ApiResponse(responseCode = "401",description = "Usuário não autenticado"),
        @ApiResponse(responseCode = "403",description = "Usuário autenticado e sem permissão para essa requisição")
        
    })
    @GetMapping
    public List<Produto> findAllProduto() {
        return produtoService.findAllProduto();

    }
    @Operation(description = "Cadastra um novo registro de produto")
    @ApiResponses(value ={
        @ApiResponse(responseCode = "201",description = "Registro de produto criado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Não foi possível processar o cadastro devido a um erro na requisição recebida"),
        @ApiResponse(responseCode = "401",description = "Usuário não autenticado"),
        @ApiResponse(responseCode = "403",description = "Usuário autenticado e sem permissão para essa requisição")
        
    })
    @PostMapping
    public ResponseEntity<Produto> saveProduto(@RequestBody Produto produto) {
        Produto prod = produtoService.saveProduto(produto);
        return new ResponseEntity<>(prod, HttpStatus.CREATED);
    }

    @Operation(description = "Altera o registro de um produto existente")
    @ApiResponses(value ={
        @ApiResponse(responseCode = "200",description = "ok"),
        @ApiResponse(responseCode = "400", description = "Não foi possível processar a alteração devido a um erro na requisição"),
        @ApiResponse(responseCode = "401",description = "Usuário não autenticado"),
        @ApiResponse(responseCode = "403",description = "Usuário autenticado e sem permissão para essa requisição")
        
    })
    @PutMapping
    public Produto updateProduto(@RequestBody Produto produto) {

        
        return produtoService.updateProduto(produto);
    }

    @Operation(description = "Retorna uma lista com todos os registros de produtos")
    @ApiResponses(value ={
        @ApiResponse(responseCode = "200",description = "ok"),
        @ApiResponse(responseCode = "401",description = "Usuário não autenticado"),
        @ApiResponse(responseCode = "403",description = "Usuário autenticado e sem permissão para essa requisição")
        
    })
    @DeleteMapping("/{id}")
    public void deleteProduto(@PathVariable("id") Integer id) {
        produtoService.deleteProduto(id);
    }

}
