package com.growise.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.growise.api.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto,Integer>{
    
}
