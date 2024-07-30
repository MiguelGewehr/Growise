package com.growise.api.repository;

import com.growise.api.model.Ordem;
import com.growise.api.model.Produto;
import com.growise.api.model.Venda;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Transactional
@ActiveProfiles("test")
class OrdemRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private OrdemRepository ordemRepository;

    private Ordem ordem;
    private Produto produto;
    private Venda venda;

    @BeforeEach
    void setUp() {
        // Cria e persiste uma Venda
        venda = new Venda();
        venda.setData(LocalDate.now());
        venda.setValorTotal(100.0f);
        venda = entityManager.persist(venda);

        // Cria e persiste um Produto
        produto = new Produto();
        produto.setNome("Produto Teste");
        produto.setMarca("marca");
        produto.setPrecoCompra(10.0f);
        produto.setPrecoVenda(50.0f);
        produto.setFornecedor("fornecedor");
        produto.setDescricao("descricao");
        produto.setQuantidade(20);
        produto = entityManager.persist(produto);

        // Cria e configura uma Ordem
        ordem = new Ordem();
        ordem.setQuantidade(2);
        ordem.setValorTotal(100.0f);
        ordem.setVenda(venda);
        ordem.setProduto(produto);
    }

    @Test
    void testSaveOrdem() {
        Ordem savedOrdem = ordemRepository.save(ordem);
        assertThat(savedOrdem.getId()).isNotNull();
    }

    @Test
    void testFindById() {
        Ordem savedOrdem = entityManager.persist(ordem);
        Optional<Ordem> foundOrdem = ordemRepository.findById(savedOrdem.getId());
        assertThat(foundOrdem.isPresent()).isTrue();
        assertThat(foundOrdem.get().getQuantidade()).isEqualTo(savedOrdem.getQuantidade());
    }

    @Test
    void testFindAll() {
        Ordem ordem1 = new Ordem();
        ordem1.setQuantidade(1);
        ordem1.setValorTotal(50.0f);
        ordem1.setVenda(venda);
        ordem1.setProduto(produto);
        entityManager.persist(ordem1);

        entityManager.persist(ordem);

        List<Ordem> ordens = ordemRepository.findAll();
        assertThat(ordens.size()).isGreaterThanOrEqualTo(2);
    }

    @Test
    void testUpdateOrdem() {
        Ordem savedOrdem = entityManager.persist(ordem);
        savedOrdem.setQuantidade(3);
        Ordem updatedOrdem = ordemRepository.save(savedOrdem);
        assertThat(updatedOrdem.getQuantidade()).isEqualTo(3);
    }

    @Test
    void testDeleteOrdem() {
        Ordem savedOrdem = entityManager.persist(ordem);
        ordemRepository.delete(savedOrdem);
        Optional<Ordem> deletedOrdem = ordemRepository.findById(savedOrdem.getId());
        assertThat(deletedOrdem.isEmpty()).isTrue();
    }
}
