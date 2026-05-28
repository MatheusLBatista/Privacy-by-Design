# Sistema de Demandas Públicas — Prefeitura

API REST desenvolvida em Node.js + Express para uma oficina prática sobre **LGPD** e **Privacy by Design**.

O código funciona corretamente, mas contém **6 vulnerabilidades intencionais** marcadas com `// TODO: corrigir`. O objetivo da oficina é identificar e corrigir cada uma delas.

---

## Tecnologias

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [JSON Web Token (JWT)](https://github.com/auth0/node-jsonwebtoken)
- [Multer](https://github.com/expressjs/multer)
- Banco de dados em memória (arrays)

---

## Estrutura do projeto

```
├── server.js               → entry point
├── src/
│   ├── app.js              → configuração do Express
│   ├── db/
│   │   └── banco.js        → banco em memória
│   ├── middlewares/
│   │   ├── autenticar.js   → validação do JWT
│   │   └── upload.js       → configuração do Multer
│   ├── controllers/
│   │   ├── usuariosController.js
│   │   └── demandasController.js
│   └── routes/
│       ├── usuarios.js
│       └── demandas.js
└── uploads/                → imagens enviadas
```

---

## Pré-requisitos

- Node.js **v18+** instalado → [nodejs.org](https://nodejs.org)
- npm (já vem com o Node.js)

---

## Instalação e execução

**1. Clone o repositório**

```bash
git clone <url-do-repositorio>
cd privacy-by-design
```

**2. Instale as dependências**

```bash
npm install
```

**3. Inicie o servidor**

```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`.

---

## Endpoints

### Autenticação

| Método | Rota | Auth | Descrição |
|--------|------|:----:|-----------|
| `POST` | `/cadastro` | — | Cadastra um novo usuário |
| `POST` | `/login` | — | Autentica e retorna o token JWT |

### Usuários

| Método | Rota | Auth | Descrição |
|--------|------|:----:|-----------|
| `GET` | `/usuarios` | ✅ | Lista todos os usuários |

### Demandas

| Método | Rota | Auth | Descrição |
|--------|------|:----:|-----------|
| `POST` | `/demandas` | ✅ | Cria uma nova demanda (aceita upload de imagem) |
| `GET` | `/demandas` | ✅ | Lista todas as demandas |

> Endpoints com **✅** exigem o header `Authorization: Bearer <token>`.

---

## Exemplos de uso

### Cadastrar usuário

```bash
curl -X POST http://localhost:3000/cadastro \
  -H "Content-Type: application/json" \
  -d '{"nome": "Ana Silva", "email": "ana@prefeitura.gov", "senha": "123456"}'
```

```json
{ "mensagem": "Usuário cadastrado com sucesso", "id": 1 }
```

### Fazer login

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email": "ana@prefeitura.gov", "senha": "123456"}'
```

```json
{ "token": "eyJhbGci..." }
```

### Criar demanda

```bash
curl -X POST http://localhost:3000/demandas \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Buraco na Rua das Flores", "descricao": "Grande buraco próximo ao número 42"}'
```

```json
{ "mensagem": "Demanda registrada com sucesso", "id": 1 }
```

### Criar demanda com imagem

```bash
curl -X POST http://localhost:3000/demandas \
  -H "Authorization: Bearer <token>" \
  -F "titulo=Buraco na rua" \
  -F "descricao=Próximo ao número 42" \
  -F "imagem=@/caminho/para/foto.jpg"
```

### Listar demandas

```bash
curl http://localhost:3000/demandas \
  -H "Authorization: Bearer <token>"
```

---

## Vulnerabilidades para corrigir na oficina

Procure por `// TODO: corrigir` no código. Há **6 problemas** distribuídos nos seguintes arquivos:

| # | Arquivo | Problema |
|---|---------|----------|
| 1 | `src/controllers/usuariosController.js` | Senha salva em texto puro no banco |
| 2 | `src/controllers/usuariosController.js` | `GET /usuarios` expõe o campo `senha` na resposta |
| 3 | `src/controllers/demandasController.js` | `GET /demandas` retorna demandas de **todos** os usuários |
| 4 | `src/middlewares/upload.js` | Upload aceita qualquer tipo de arquivo sem validação |
| 5 | `src/middlewares/autenticar.js` | Segredo do JWT está hardcoded no código |
| 6 | `src/controllers/usuariosController.js` | Nenhuma validação de formato de email, tamanho de senha ou campos vazios |

---
