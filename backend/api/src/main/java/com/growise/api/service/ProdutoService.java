package com.growise.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.growise.api.model.Produto;
import com.growise.api.repository.ProdutoRepository;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> findAllProduto() {
        return produtoRepository.findAll();

    }

    public Optional<Produto> findProdutoById(Integer id) {
        return produtoRepository.findById(id);
    }

    public Produto getProdutoById(Integer id) {
        return produtoRepository.getReferenceById(id);
        
    }

    public Produto saveProduto(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Produto updateProduto(Produto produto) {

        Produto prod = produtoRepository.getReferenceById(produto.getId());

        prod.setNome(produto.getNome());
        prod.setMarca(produto.getMarca());
        prod.setFornecedor(produto.getFornecedor());
        prod.setPrecoCompra(produto.getPrecoCompra());
        prod.setPrecoVenda(produto.getPrecoVenda());
        prod.setQuantidade(produto.getQuantidade());
        prod.setDescricao(produto.getDescricao());

        return produtoRepository.save(prod);
    }

    public void deleteProduto(Integer id) {
        produtoRepository.deleteById(id);
    }

}