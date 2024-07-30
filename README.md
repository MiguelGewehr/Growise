<div align="center">
  <img title="logo" src="frontend/assets/img/logo-sm.png"/>
  <h1 align="center">GROWISE</h1>
</div>
O GROWISE foi desenvolvido para auxiliar na gestão de uma loja, projetado para ser intuitivo e de fácil utilização, garantindo que os usuários possam executar suas tarefas de maneira eficiente e sem complicações. 

O sistema oferece funcionalidades específicas para 2 tipos de usuários (gerente e vendedor), para que, com elas, a loja alcançe uma gestão mais eficaz, aumentando a produtividade e melhorando a experiência tanto para os funcionários quanto para os clientes.

## Propósito do Sistema

O propósito principal deste sistema é otimizar e simplificar as operações diárias da loja, proporcionando um ambiente organizado e eficiente para a gestão de produtos, vendas e funcionários. As principais funcionalidades incluem:

1. **Gestão de Vendas:**
   - **Usuário: Vendedor**
   - **Descrição:** Os vendedores podem acessar a página de vendas, onde podem selecionar produtos e quantidades para processar pedidos de clientes de maneira rápida e eficiente.
      ![608ec175-8a37-4a0f-ade2-7640faa94aad](https://github.com/user-attachments/assets/da02d8f0-fd71-4927-941a-e05161531354)

2. **Cadastro de Produtos:**
   - **Usuário: Gerente**
   - **Descrição:** O gerente tem acesso à página de cadastro de produtos, permitindo a adição de novos produtos que serão disponibilizados para venda. Esta funcionalidade garante que o inventário esteja sempre atualizado.

3. **Cadastro de Funcionários:**
   - **Usuário: Gerente**
   - **Descrição:** O gerente pode cadastrar novos funcionários, atribuindo-lhes as funções necessárias para o bom funcionamento da loja. Esta funcionalidade facilita a gestão e a organização da equipe.

4. **Dashboard de Métricas:**
   - **Usuário: Gerente**
   - **Descrição:** A página de dashboard fornece ao gerente uma visão abrangente das métricas da loja, como lucro mensal, quantidade de produtos vendidos, e os dias da semana com mais vendas. Esta funcionalidade é essencial para a tomada de decisões estratégicas, baseadas em dados reais e atualizados.
     ![a81e7c29-a067-4fbc-9bc7-a57d71935eb1](https://github.com/user-attachments/assets/cbce0436-4d09-49b4-87b5-dd29c3843fa5)

## Configuração para Desenvolvimento

### Rodar testes

```sh
make install
npm test
```

### Documentação JavaScript com JSDoc

```sh
npm i -D jsdoc
npm run doc
```
Após rodar esses comandos acesse a documentação do JavaScript presente no diretório na pasta frontend/assets/docs

### Documentacao da API com Swagger: 
acessar enquanto a API estiver rodando: http://localhost:8080/swagger-ui

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE][license] para mais informações.

## Contribuição

1. Faça o _fork_ do projeto (<https://github.com/MiguelGewehr/Growise/fork>)
2. Crie uma _branch_ para sua modificação (`git checkout -b feature/fooBar`)
3. Faça o _commit_ (`git commit -am 'Add some fooBar'`)
4. _Push_ (`git push origin feature/fooBar`)
5. Crie um novo _Pull Request_

[wiki]: https://github.com/MiguelGewehr/Growise/wiki
[license]: https://github.com/MiguelGewehr/Growise/blob/main/LICENSE
