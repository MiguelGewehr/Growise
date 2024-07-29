package com.growise.api.repository;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.ActiveProfiles;

import com.growise.api.model.Produto;
import com.growise.api.model.user.User;
import com.growise.api.model.user.UserRole;
import com.growise.api.service.ProdutoService;

import jakarta.persistence.EntityManager;

@DataJpaTest
@ActiveProfiles("test")
public class ProdutoRepositoryTest {

    @Autowired
    EntityManager entityManager;
    @Autowired
    ProdutoService produtoService;

    @Test
    void findAllProduto() {

        Produto produto = createProduto();
        List<Produto> allProd = this.produtoService.findAllProduto();

        


    }

    @SuppressWarnings("removal")
    Produto createProduto() {

        Produto prod = new Produto("camiseta", 50, "hering", "exemplo", new Float(25.50), new Float(100.50),
                "camiseta branca de linho com botões de madeira");
        this.entityManager.persist(prod);
        return prod;

    }

}
