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

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    public List<Produto> findAllProduto() {
        return produtoService.findAllProduto();

    }

    @PostMapping
    public ResponseEntity<Produto> saveProduto(@RequestBody Produto produto) {
        Produto prod = produtoService.saveProduto(produto);
        return new ResponseEntity<>(prod, HttpStatus.CREATED);
    }

    @PutMapping
    public Produto updateProduto(@RequestBody Produto produto) {

        
        return produtoService.updateProduto(produto);
    }

    @DeleteMapping("/{id}")
    public void deleteProduto(@PathVariable("id") Integer id) {
        produtoService.deleteProduto(id);
    }

}
