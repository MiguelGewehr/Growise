package com.growise.api.service;

import com.growise.api.model.Produto;
import com.growise.api.repository.ProdutoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
class ProdutoServiceTest {

    @InjectMocks
    private ProdutoService produtoService;

    @Mock
    private ProdutoRepository produtoRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAllProduto() {
        Produto produto1 = new Produto();
        produto1.setId(1);
        Produto produto2 = new Produto();
        produto2.setId(2);

        when(produtoRepository.findAll()).thenReturn(Arrays.asList(produto1, produto2));

        assertThat(produtoService.findAllProduto()).hasSize(2);
    }

    @Test
    void testFindProdutoById() {
        Produto produto = new Produto();
        produto.setId(1);

        when(produtoRepository.findById(1)).thenReturn(Optional.of(produto));

        Optional<Produto> foundProduto = produtoService.findProdutoById(1);
        assertThat(foundProduto).isPresent();
        assertThat(foundProduto.get().getId()).isEqualTo(1);
    }

    @Test
    void testGetProdutoById() {
        Produto produto = new Produto();
        produto.setId(1);

        when(produtoRepository.getReferenceById(1)).thenReturn(produto);

        Produto foundProduto = produtoService.getProdutoById(1);
        assertThat(foundProduto.getId()).isEqualTo(1);
    }

    @Test
    void testSaveProduto() {
        Produto produto = new Produto();
        produto.setId(1);

        when(produtoRepository.save(produto)).thenReturn(produto);

        Produto savedProduto = produtoService.saveProduto(produto);
        assertThat(savedProduto.getId()).isEqualTo(1);
    }

    @Test
    void testUpdateProduto() {
        Produto produto = new Produto();
        produto.setId(1);

        when(produtoRepository.getReferenceById(1)).thenReturn(produto);
        when(produtoRepository.save(produto)).thenReturn(produto);

        produto.setNome("Novo Nome");
        Produto updatedProduto = produtoService.updateProduto(produto);

        assertThat(updatedProduto.getNome()).isEqualTo("Novo Nome");
    }

    @Test
    void testDeleteProduto() {
        doNothing().when(produtoRepository).deleteById(1);

        produtoService.deleteProduto(1);

        verify(produtoRepository, times(1)).deleteById(1);
    }
}
