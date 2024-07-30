package com.growise.api.repository;

import com.growise.api.model.Venda;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Transactional
@ActiveProfiles("test")
class VendaRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private VendaRepository vendaRepository;

    private Venda venda;

    @BeforeEach
    public void setUp() {
        venda = new Venda();
        venda.setData(LocalDate.now());
        venda.setValorTotal(100.0f);
    }

    @Test
    public void testSaveVenda() {
        Venda savedVenda = vendaRepository.save(venda);
        assertThat(savedVenda.getId()).isNotNull();
    }

    @Test
    public void testFindById() {
        Venda savedVenda = entityManager.persist(venda);
        Optional<Venda> foundVenda = vendaRepository.findById(savedVenda.getId());
        assertThat(foundVenda.isPresent()).isTrue();
        assertThat(foundVenda.get().getData()).isEqualTo(savedVenda.getData());
    }

    @Test
    public void testFindAll() {
        Venda venda1 = new Venda();
        venda1.setData(LocalDate.now().minusDays(1));
        venda1.setValorTotal(200.0f);
        entityManager.persist(venda1);

        entityManager.persist(venda);

        List<Venda> vendas = vendaRepository.findAll();
        assertThat(vendas.size()).isGreaterThanOrEqualTo(2);
    }

    @Test
    public void testUpdateVenda() {
        Venda savedVenda = entityManager.persist(venda);
        savedVenda.setValorTotal(150.0f);
        Venda updatedVenda = vendaRepository.save(savedVenda);
        assertThat(updatedVenda.getValorTotal()).isEqualTo(150.0f);
    }

    @Test
    public void testDeleteVenda() {
        Venda savedVenda = entityManager.persist(venda);
        vendaRepository.delete(savedVenda);
        Optional<Venda> deletedVenda = vendaRepository.findById(savedVenda.getId());
        assertThat(deletedVenda.isEmpty()).isTrue();
    }
}
