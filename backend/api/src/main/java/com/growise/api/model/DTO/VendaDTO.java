package com.growise.api.model.DTO;

import java.time.LocalDate;
import java.util.List;

import com.growise.api.model.DTO.OrdemDTO;

public record VendaDTO(LocalDate data, Float valorTotal, List<OrdemDTO> ordens) {

    
}
