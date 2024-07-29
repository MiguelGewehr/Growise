package com.growise.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.growise.api.model.Venda;
import com.growise.api.model.DTO.OrdemDTO;
import com.growise.api.model.DTO.VendaDTO;
import com.growise.api.repository.VendaRepository;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private OrdemService ordemService;

    public List<Venda> findAllVenda() {
        return vendaRepository.findAll();
    }

    public Optional<Venda> findVendaById(Integer id) {
        return vendaRepository.findById(id);
    }

    public Venda saveVenda(VendaDTO vendaDTO) {

        Venda venda = new Venda();

        venda.setData(vendaDTO.data());
        venda.setValorTotal(vendaDTO.valorTotal());

        Venda saved = vendaRepository.save(venda);

        if (saved != null) {
            for (OrdemDTO ordem : vendaDTO.ordens()) {
                ordemService.saveOrdem(ordem, saved.getId());
            }

        }
        return saved;
    }
    
    public Venda getVendaById(Integer id) {
        return vendaRepository.getReferenceById(id);
    }

}