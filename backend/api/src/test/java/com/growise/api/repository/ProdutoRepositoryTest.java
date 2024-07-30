package com.growise.api.repository;

import static org.junit.jupiter.api.Assertions.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Profile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import com.growise.api.model.Produto;

@DataJpaTest
@Transactional
@ActiveProfiles("test")
public class ProdutoRepositoryTest {

    @Autowired
    private ProdutoRepository produtoRepository;

    private Produto produto;

    @Test
    void teste() {

    }

    @BeforeEach
    public void setUp() {
        produto = new Produto();
        produto.setNome("Produto Teste");
        produto.setMarca("marca");
        produto.setPrecoCompra(new Float(10));
        produto.setPrecoVenda(new Float(50));
        produto.setFornecedor("fornecedor");
        produto.setDescricao("descricao");
        produto.setQuantidade(20);

    }

    @Test
    public void testSave() {
        Produto savedProduto = produtoRepository.save(produto);
        assertNotNull(savedProduto.getId());
        assertEquals(produto.getNome(), savedProduto.getNome());
    }

    @Test
    public void testUpdate() {
        Produto savedProduto = produtoRepository.save(produto);
        savedProduto.setNome("Produto Atualizado");
        Produto updatedProduto = produtoRepository.save(savedProduto);
        assertEquals("Produto Atualizado", updatedProduto.getNome());
    }

    @Test
    public void testDelete() {
        Produto savedProduto = produtoRepository.save(produto);
        produtoRepository.delete(savedProduto);
        Optional<Produto> deletedProduto = produtoRepository.findById(savedProduto.getId());
        // assertThat(deletedProduto.isPresent()).isFalse();
        assertFalse(deletedProduto.isPresent());
    }

    @Test
    public void testGetReferenceById() {
        Produto savedProduto = produtoRepository.save(produto);
        Produto reference = produtoRepository.getReferenceById(savedProduto.getId());
        assertEquals(savedProduto.getId(), reference.getId());
    }

    @Test
    public void testFindById() {
        Produto savedProduto = produtoRepository.save(produto);
        Optional<Produto> foundProduto = produtoRepository.findById(savedProduto.getId());
        assertTrue(foundProduto.isPresent());
        assertEquals(savedProduto.getNome(), foundProduto.get().getNome());
    }

    @Test
    public void testFindAll() {
        produtoRepository.save(produto);
        List<Produto> produtos = produtoRepository.findAll();
        assertFalse(produtos.isEmpty());
    }

}
