package com.growise.api.services;

import com.growise.api.model.DTO.VendaDTO;
import com.growise.api.model.DTO.OrdemDTO;
import com.growise.api.model.Venda;
import com.growise.api.repository.VendaRepository;
import com.growise.api.service.OrdemService;
import com.growise.api.service.VendaService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class VendaServiceTest {

    @Mock
    private VendaRepository vendaRepository;

    @Mock
    private OrdemService ordemService;

    @InjectMocks
    private VendaService vendaService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveVendaSuccess() {
        // Arrange
        VendaDTO vendaDTO = new VendaDTO(LocalDate.now(), 100.0,
                Collections.singletonList(new OrdemDTO(10, new Float(20.50), 1)));
        Venda venda = new Venda();
        venda.setData(vendaDTO.data());
        venda.setValorTotal(vendaDTO.valorTotal());

        when(vendaRepository.save(any(Venda.class))).thenReturn(venda);

        // Act
        Venda savedVenda = vendaService.saveVenda(vendaDTO);

        // Assert
        assertThat(savedVenda).isNotNull();
        verify(vendaRepository, times(1)).save(any(Venda.class));
        verify(ordemService, times(1)).saveOrdem(any(OrdemDTO.class), any(Integer.class));
    }

}