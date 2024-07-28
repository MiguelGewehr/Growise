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

import com.growise.api.model.Venda;
import com.growise.api.model.DTO.VendaDTO;
import com.growise.api.service.VendaService;

@RestController
@RequestMapping("/venda")
public class VendaController {

    @Autowired
    private VendaService vendaService;

    @GetMapping
    public List<Venda> findAllVenda() {
        return vendaService.findAllVenda();

    }

    @PostMapping
    public ResponseEntity<Venda> saveVenda(@RequestBody VendaDTO vendaDTO) {
        Venda newVenda = vendaService.saveVenda(vendaDTO);
        return new ResponseEntity<>(newVenda, HttpStatus.CREATED);
    }

   /*  @PutMapping
    public Venda updateVenda(@RequestBody Venda Venda) {

        
        return VendaService.updateVenda(Venda);
    }

    @DeleteMapping("/{id}")
    public void deleteVenda(@PathVariable("id") Integer id) {
        VendaService.deleteVenda(id);
    }
*/
}
