package com.growise.api.service;

import com.growise.api.model.Ordem;
import com.growise.api.model.Produto;
import com.growise.api.model.Venda;
import com.growise.api.model.DTO.OrdemDTO;
import com.growise.api.repository.OrdemRepository;
import com.growise.api.repository.VendaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

@SpringBootTest
@ActiveProfiles("test")
class OrdemServiceTest {

    @InjectMocks
    private OrdemService ordemService;

    @Mock
    private OrdemRepository ordemRepository;

    @Mock
    private VendaRepository vendaRepository;

    @Mock
    private ProdutoService produtoService;

    private Ordem ordem;
    private OrdemDTO ordemDTO;
    private Venda venda;
    private Produto produto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Setup a sample Ordem, OrdemDTO, Venda and Produto
        ordem = new Ordem();
        ordem.setId(1);
        ordem.setQuantidade(10);
        ordem.setValorTotal(50.0f);

        produto = new Produto();
        produto.setId(1);
        produto.setNome("Produto Teste");
        produto.setMarca("Marca Teste");
        produto.setFornecedor("Fornecedor Teste");
        produto.setPrecoCompra(10.0f);
        produto.setPrecoVenda(15.0f);
        produto.setQuantidade(100);
        produto.setDescricao("Descrição Teste");

        venda = new Venda();
        venda.setId(1);

        ordemDTO = new OrdemDTO(10, 50.0f, 1);
    }

    @Test
    void testFindAllOrdem() {
        when(ordemRepository.findAll()).thenReturn(Arrays.asList(ordem));

        List<Ordem> ordens = ordemService.findAllOrdem();

        assertThat(ordens).isNotEmpty();
        assertThat(ordens.size()).isEqualTo(1);
        assertThat(ordens.get(0).getId()).isEqualTo(ordem.getId());
    }

    @Test
    void testFindOrdemById() {
        when(ordemRepository.findById(anyInt())).thenReturn(Optional.of(ordem));

        Optional<Ordem> foundOrdem = ordemService.findOrdemById(ordem.getId());

        assertThat(foundOrdem).isPresent();
        assertThat(foundOrdem.get().getId()).isEqualTo(ordem.getId());
    }

    @Test
    void testSaveOrdem() {
        when(vendaRepository.getReferenceById(anyInt())).thenReturn(venda);
        when(produtoService.getProdutoById(anyInt())).thenReturn(produto);
        when(ordemRepository.save(any(Ordem.class))).thenAnswer(invocation -> {
            Ordem savedOrdem = invocation.getArgument(0);
            savedOrdem.setId(1); // Simulate ID assignment after save
            return savedOrdem;
        });

        Ordem savedOrdem = ordemService.saveOrdem(ordemDTO, venda.getId());

        assertThat(savedOrdem).isNotNull();
        assertThat(savedOrdem.getId()).isEqualTo(1);
        assertThat(savedOrdem.getProduto()).isEqualTo(produto);
        assertThat(savedOrdem.getVenda()).isEqualTo(venda);

        verify(ordemRepository, times(1)).save(any(Ordem.class));
        verify(vendaRepository, times(1)).getReferenceById(anyInt());
        verify(produtoService, times(1)).getProdutoById(anyInt());
    }

    @Test
    void testGetOrdemById() {
        when(ordemRepository.getReferenceById(anyInt())).thenReturn(ordem);

        Ordem foundOrdem = ordemService.getOrdemById(ordem.getId());

        assertThat(foundOrdem).isNotNull();
        assertThat(foundOrdem.getId()).isEqualTo(ordem.getId());
    }
}
