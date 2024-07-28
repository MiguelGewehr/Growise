package com.growise.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.growise.api.model.Ordem;
import com.growise.api.model.Produto;
import com.growise.api.model.Venda;
import com.growise.api.model.DTO.OrdemDTO;
import com.growise.api.repository.OrdemRepository;
import com.growise.api.repository.VendaRepository;

@Service
public class OrdemService {

    @Autowired
    private OrdemRepository ordemRepository;

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private ProdutoService produtoService;

    public List<Ordem> findAllOrdem() {
        return ordemRepository.findAll();

    }

    public Optional<Ordem> findOrdemById(Integer id) {
        return ordemRepository.findById(id);
    }

    public Ordem saveOrdem(OrdemDTO ordemDTO, Integer id_venda) {

        Ordem ordem = new Ordem();
        ordem.setQuantidade(ordemDTO.quantidade());
        ordem.setValorTotal(ordemDTO.valorTotal());

        // System.out.println("VENDA==== " + id_venda);
        Venda venda = vendaRepository.getReferenceById(id_venda);
        Produto prod = produtoService.getProdutoById(ordemDTO.id_produto());

        ordem.setProduto(prod);

        ordem.setVenda(venda);

        return ordemRepository.save(ordem);
    }

    /*
     * public Ordem updateOrdem(Ordem ordem){
     * 
     * }
     * 
     * public void deleteOrdem(Integer id){
     * 
     * }
     */

    public Ordem getOrdemById(Integer id) {
        return ordemRepository.getReferenceById(id);
    }

}