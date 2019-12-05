
> ## Teste com Jest

Estudo de Test, baseado nas aulas do GoStack da @Rocketseat.

> ## Oque esta sendo utilizado

#### Jest
Framework desenvolvido pela galera do facabook para testes

#### @sucrase/jest-plugin
Utilizado para adicionar algumas funcionalidades do sucrase no jest, após a instalação deve ser inserido no jest.config.js
```javascript
  transform: {
    ".(js|jsx|ts|tsx)": "@sucrase/jest-plugin"
  },
```

#### @types/jest
Utilizado para aplicar algumas InteliSenses do jest

#### supertest
Utilizado para realizar requisicoes em rotas em ambiente de teste

#### faker and factory-girl
Permite a geração de massa de dados para ser utilizado em testes, sem a necessidade de ficar escrevendo cada email, nome ou senha em testes de criação de usuário.
