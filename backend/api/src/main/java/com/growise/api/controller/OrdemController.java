package com.growise.api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.growise.api.model.Ordem;
import com.growise.api.model.DTO.OrdemDTO;
import com.growise.api.service.OrdemService;

@RestController
@RequestMapping("/ordem")
public class OrdemController {

    @Autowired
    private OrdemService ordemService;

    @GetMapping
    public List<Ordem> findAllOrdem() {
        return ordemService.findAllOrdem();

    }

   /*  @PostMapping
    public ResponseEntity<?> saveOrdem(@RequestBody OrdemDTO ordem) {

        Ordem ord = ordemService.saveOrdem(ordem, ordem.id_venda());

        return new ResponseEntity<>(ord, HttpStatus.CREATED);

    }
        */

    /*
     * @PutMapping
     * public Ordem updateordem(@RequestBody Ordem ordem) {
     * 
     * 
     * return ordemService.updateOrdem(ordem);
     * }
     * 
     * @DeleteMapping("/{id}")
     * public void deleteordem(@PathVariable("id") Integer id) {
     * ordemService.deleteordem(id);
     * }
     */
}
