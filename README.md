# Sistema de Gestão de Clientes

Este projeto é uma aplicação Node.js que se integra com o Firestore (Firebase) para gerenciar informações de clientes. A aplicação permite criar e obter dados de clientes com base no CNPJ.

## Funcionalidades

## Funcionalidades

### 1. **Criar Cliente**
- **Endpoint**: `/create-customer`
- **Método HTTP**: `POST`
- **Descrição**: Permite criar um novo cliente no banco de dados.
- **Campos exigidos**:
  - `cnpj` (único, string)
  - `name` (string)
  - `phone` (string)
  - `socialReason` (string)
  
**Exemplo de Requisição**:

```json
{
  "cnpj": "12345678000195",
  "name": "Empresa XYZ",
  "socialReason": "Social Reason",
  "telefone": "123456789",
}
```

### 2. **Consultar Cliente por CNPJ**
- **Endpoint**: `/get-customer/{cnpj}`
- **Método HTTP**: `GET`
- **Descrição**: Permite buscar um cliente pelo seu CNPJ.
- **Parâmetros**:
  - `cnpj` (string)
  
**Exemplo de Requisição**:

```bash
GET /get-customer/12345678000195
```

**Resposta Exemplo**:

```json
{
  "cnpj": "12345678000195",
  "name": "Empresa XYZ",
  "socialReason": "Social Reason",
  "telefone": "123456789",
}
```

## Arquitetura e Decisão de Utilizar Service

### **Por que utilizar um Service Layer?**

A escolha de usar um *service layer* (camada de serviço) em vez de implementar diretamente as funções no controlador ou em outros pontos da aplicação tem várias vantagens, principalmente quando se trata de escalabilidade, manutenção e organização do código.

#### **Vantagens de usar um Service Layer:**

1. **Separação de responsabilidades**:
   - O service layer encapsula toda a lógica de negócios e acesso ao banco de dados. Isso permite que o controlador ou outras camadas da aplicação se concentrem apenas na lógica de interação com o usuário, sem se preocupar com detalhes de como os dados são armazenados ou recuperados.

2. **Facilidade de Manutenção**:
   - A lógica de negócios centralizada facilita a manutenção do código. Se houver a necessidade de alterar a forma como a aplicação interage com o Firestore ou adicionar mais funcionalidades (exemplo: validações adicionais), você pode fazer isso no service layer sem impactar outras partes do sistema.

3. **Reusabilidade**:
   - Como as funções do service layer podem ser chamadas de diferentes pontos da aplicação, há maior reusabilidade do código. Em um projeto maior, isso evita duplicação de lógica e torna o código mais modular.

4. **Testabilidade**:
   - Testes unitários podem ser facilmente criados para a camada de serviço, uma vez que ela contém a lógica de negócios. Isso torna mais simples validar que a aplicação está funcionando como esperado e que os dados estão sendo manipulados corretamente, sem precisar interagir diretamente com o controlador ou outros componentes da aplicação.

5. **Escalabilidade**:
   - Se a aplicação crescer e precisar ser expandida com mais recursos, a arquitetura baseada em serviços facilita a adição de novas funcionalidades sem precisar alterar a estrutura de controle existente. Por exemplo, você pode facilmente adicionar novos métodos para realizar outras operações de CRUD no Firestore, sem impactar os controladores ou outras camadas.

#### **Como funciona a estrutura do código?**

- **Controller**: Responsável por gerenciar as requisições HTTP, realizar a validação das entradas e chamar os métodos da camada de serviço para acessar ou modificar os dados.
- **Service**: Contém a lógica de negócios e interação com o Firestore. Os serviços são chamados pelo controller para realizar operações como a criação de um cliente, busca por CNPJ, entre outras.
  
Esta estrutura modularizada é uma boa prática, especialmente em projetos maiores ou em equipes, pois mantém o código mais organizado, fácil de testar e de escalar conforme a aplicação cresce.

## Como Rodar a Aplicação

### 1. Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio


### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar o Firebase
- Crie um projeto no [Firebase](https://console.firebase.google.com/).
- No console do Firebase, acesse a seção "Configurações do Projeto" e baixe o arquivo de credenciais JSON do Firebase (chave do serviço).
- Substitua o caminho no código onde o arquivo de credenciais é carregado com a chave que você baixou e o coloque no path config.

### 4. Rodar a Aplicação
```bash
npm start
```

## Testes

- Para testar as funcionalidades localmente, utilize ferramentas como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/).
- Você pode criar requisições HTTP para os endpoints da API que interagem com o serviço.
- Basta importar o arquivo docs-postman que está na raiz do projeto

## Estrutura de Diretórios

```bash
/
├── src/
│   ├── services/
│   │   └── CustomerService.ts   
│   ├── controllers/
│   │   └── CustomerController.ts  
│   ├── models/
│   │   └── CustomerModel.ts    
│   └── config/
│         firebase/
│           └── firebaseConfig.json  
├── package.json               
└── README.md                  
```