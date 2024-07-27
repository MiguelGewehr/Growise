<div align="center">
  <img title="logo" src="frontend/assets/img/logo-sm.png"/>
  <h1 align="center">GROWISE</h1>
</div>

O Growise é uma aplicação web projetada para atender às necessidades de gestão de lojas. 

Seu propósito principal é fornecer uma plataforma para o cadastro de produtos, gerenciamento de vendas e controle de dados essenciais das lojas, como receita, lucro e estoque. 

O sistema visa centralizar informações e facilitar o controle de vendas, permitindo acesso rápido a dados relevantes para uma gestão eficaz.

## Exemplo de uso

O sistema permite que qualquer tipo de loja cadastre seus produtos e funcionários, para que possam ser feitas as vendas.
![608ec175-8a37-4a0f-ade2-7640faa94aad](https://github.com/user-attachments/assets/da02d8f0-fd71-4927-941a-e05161531354)

A integração faz com que as informações das vendas sejam salvas automaticamente, possibilitando que o gerente tenha acesso à diferentes métricas da loja.
![a81e7c29-a067-4fbc-9bc7-a57d71935eb1](https://github.com/user-attachments/assets/cbce0436-4d09-49b4-87b5-dd29c3843fa5)

## Instalação

```sh
sudo apt install nodejs
sudo apt install npm
npm init -y
npm install jest-environment-jsdom --save-dev
npm install --save-dev jsdoc
```

## Configuração para Desenvolvimento

### Rodar testes
```sh
npm test
```

### Documentação JavaScript com JSDoc
```sh
npm run doc
```

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
