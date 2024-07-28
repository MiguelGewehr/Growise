package com.growise.api.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import jakarta.persistence.Id;

@Entity
public class Produto implements Serializable{

      @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    private String nome;
    private Integer quantidade;
    private String marca;
    private String fornecedor;
    private Float precoCompra;
    private Float precoVenda;
    private String descricao;
    public Produto() {
    }
    public Integer getId() {
      return id;
    }
    public void setId(Integer id) {
      this.id = id;
    }
    public String getNome() {
      return nome;
    }
    public void setNome(String nome) {
      this.nome = nome;
    }
    public Integer getQuantidade() {
      return quantidade;
    }
    public void setQuantidade(Integer quantidade) {
      this.quantidade = quantidade;
    }
    public String getMarca() {
      return marca;
    }
    public void setMarca(String marca) {
      this.marca = marca;
    }
    public String getFornecedor() {
      return fornecedor;
    }
    public void setFornecedor(String fornecedor) {
      this.fornecedor = fornecedor;
    }
    public Float getPrecoCompra() {
      return precoCompra;
    }
    public void setPrecoCompra(Float precoCompra) {
      this.precoCompra = precoCompra;
    }
    public Float getPrecoVenda() {
      return precoVenda;
    }
    public void setPrecoVenda(Float precoVenda) {
      this.precoVenda = precoVenda;
    }
    public String getDescricao() {
      return descricao;
    }
    public void setDescricao(String descricao) {
      this.descricao = descricao;
    }

    
}
