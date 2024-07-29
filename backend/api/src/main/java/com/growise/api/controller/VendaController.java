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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/venda")
public class VendaController {

    @Autowired
    private VendaService vendaService;

    @Operation(description = "Retorna uma lista com todas as vendas regsitradas.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "401", description = "Usuário não autenticado"),
            @ApiResponse(responseCode = "403", description = "Usuário autenticado e sem permissão para essa requisição")

    })
    @GetMapping
    public List<Venda> findAllVenda() {
        return vendaService.findAllVenda();

    }

    @Operation(description = "Retorna uma lista com todos os registros de produtos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Registro de venda criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Não foi possível processar o cadastro devido a um erro na requisição recebida"),
            @ApiResponse(responseCode = "401", description = "Usuário não autenticado"),
            @ApiResponse(responseCode = "403", description = "Usuário autenticado e sem permissão para essa requisição")

    })
    @PostMapping
    public ResponseEntity<Venda> saveVenda(@RequestBody VendaDTO vendaDTO) {
        Venda newVenda = vendaService.saveVenda(vendaDTO);
        return new ResponseEntity<>(newVenda, HttpStatus.CREATED);
    }

}
