## Description

Desafio proposto pela empresa [Suflex](https://www.suflex.com.br/) como parte do processo de seleção para vaga de desenvolvedor backend.

## Desafios

- [x] Produtos em ordem alfabética
```ts
...
  return this.prisma.products.findMany({
    orderBy: [
      {
        name: 'asc',
      },
    ],
    select: {
      name: true,
      dias_para_vencimento: true,
    },
  });
...
```

- [x] Produtos que vencem hoje (dias_para_vencimento = 0)

```ts
...
  return this.prisma.products.findMany({
    where: {
      dias_para_vencimento: 0,
    },
    orderBy: [
      {
        name: 'asc',
      },
    ],
    select: {
      name: true,
      dias_para_vencimento: true,
    },
  });
...
```
- [x] Produtos que vencem amanhã (dias_para_vencimento = 1)

```ts
...
  return this.prisma.products.findMany({
    where: {
      dias_para_vencimento: 1,
    },
    orderBy: [
      {
        name: 'asc',
      },
    ],
    select: {
      name: true,
      dias_para_vencimento: true,
    },
  });
...
```

## Técnologias

- [NestJs](https://nestjs.com/)
- [Prisma](https://www.prisma.io/docs)
- [PostgreSQL](https://www.postgresql.org/)
- [Papa Parse](https://www.papaparse.com/docs)

## Rotas

 | Method | URN | Entrada | Descrição |
 | :---:   | :---: | :---: | :---: |
 | POST | ````/upload```` | multipart/form-data<br>Type: file<br>Name: file | Faça o upload do arquivo .CSV com a lista de produtos.<br> Os dados serão importados no BD. |
 | GET | ````/all```` | - | Retorna em JSON e lista de produtos em ordem alfabética |
 | GET | ````/expire-today```` | - | Retorna em JSON e lista de produtos em ordem alfabética<br>com dias_para_vencimento igual a 0 |
 | GET | ````/expire-tomorrow```` | - | Retorna em JSON e lista de produtos em ordem alfabética<br>com dias_para_vencimento igual a 1 |

## [Rotas no Insomnia - Insomnia_2023-02-26.json](./Insomnia_2023-02-26.json)
---
## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

```