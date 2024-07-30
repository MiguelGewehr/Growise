package com.growise.api.service;

import com.growise.api.model.Ordem;
import com.growise.api.model.Produto;
import com.growise.api.model.Venda;
import com.growise.api.model.DTO.OrdemDTO;
import com.growise.api.model.DTO.VendaDTO;
import com.growise.api.repository.VendaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

@SpringBootTest
@ActiveProfiles("test")
class VendaServiceTest {

    @InjectMocks
    private VendaService vendaService;

    @Mock
    private VendaRepository vendaRepository;

    @Mock
    private OrdemService ordemService;

    private Venda venda;
    private VendaDTO vendaDTO;
    private OrdemDTO ordemDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Setup a sample Venda and VendaDTO
        venda = new Venda();
        venda.setId(1);
        venda.setData(LocalDate.now());
        venda.setValorTotal(100.0f);

        ordemDTO = new OrdemDTO(10, 50.0f, 1);
        List<OrdemDTO> ordensDTO = Arrays.asList(ordemDTO);
        vendaDTO = new VendaDTO(LocalDate.now(), 100.0f, ordensDTO);
    }

    @Test
    void testFindAllVenda() {
        when(vendaRepository.findAll()).thenReturn(Arrays.asList(venda));

        List<Venda> vendas = vendaService.findAllVenda();

        assertThat(vendas).isNotEmpty();
        assertThat(vendas.size()).isEqualTo(1);
        assertThat(vendas.get(0).getId()).isEqualTo(venda.getId());
    }

    @Test
    void testFindVendaById() {
        when(vendaRepository.findById(anyInt())).thenReturn(Optional.of(venda));

        Optional<Venda> foundVenda = vendaService.findVendaById(venda.getId());

        assertThat(foundVenda).isPresent();
        assertThat(foundVenda.get().getId()).isEqualTo(venda.getId());
    }

    @Test
    void testSaveVenda() {
        when(vendaRepository.save(any(Venda.class))).thenReturn(venda);
        // Simulate the behavior of OrdemService's saveOrdem method
        when(ordemService.saveOrdem(any(OrdemDTO.class), anyInt())).thenReturn(new Ordem());

        Venda savedVenda = vendaService.saveVenda(vendaDTO);

        assertThat(savedVenda).isNotNull();
        assertThat(savedVenda.getId()).isEqualTo(venda.getId());
        verify(vendaRepository, times(1)).save(any(Venda.class));
        verify(ordemService, times(1)).saveOrdem(any(OrdemDTO.class), eq(venda.getId()));
    }

    @Test
    void testGetVendaById() {
        when(vendaRepository.getReferenceById(anyInt())).thenReturn(venda);

        Venda foundVenda = vendaService.getVendaById(venda.getId());

        assertThat(foundVenda).isNotNull();
        assertThat(foundVenda.getId()).isEqualTo(venda.getId());
    }
}
