package com.growise.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.growise.api.model.Ordem;

@Repository
public interface OrdemRepository extends JpaRepository<Ordem,Integer>{
    
}
