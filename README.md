# 🏆 Champions League Manager API

[![Node.js](https://img.shields.io/badge/Node.js-22+-green?logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![API Version](https://img.shields.io/badge/API-v1-brightgreen)](routes.ts)

## 📝 Descrição

API RESTful para gerenciar **jogadores e clubes da Champions League**, com operações completas de **CRUD (Create, Read, Update, Delete)**.

Desenvolvida com **TypeScript e Express**, a aplicação permite:
- Cadastrar, listar, atualizar e remover clubes e jogadores
- Buscar por nome
- Relacionar jogadores a clubes
- Manter estatísticas detalhadas de desempenho

> 💡 Este projeto **não usa frameworks como Fastify ou NestJS**, mas sim **Express com arquitetura limpa e tratamento de erros robusto**, demonstrando boas práticas de desenvolvimento backend.

---

## 📦 Tecnologias

| Tecnologia | Descrição |
|----------|-----------|
| **Node.js** | Runtime para execução do servidor |
| **TypeScript** | Tipagem estática para maior segurança e manutenibilidade |
| **Express** | Framework web leve para roteamento e middleware |
| **ES Modules** | Sistema moderno de módulos nativo do Node.js |
| **tsup** | Compilador rápido baseado em `esbuild` |
| **tsx** | Executa TypeScript diretamente, sem compilação prévia |

---

## 🧱 Domínio do Sistema

### 🎮 Jogador (`Player`)
```ts
interface Player {
  name: string;
  nationality: string;
  position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
  statistics: {
    overall?: number;
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
  };
  clubId?: number;
}
```

> O campo `overall` é calculado automaticamente com base nas estatísticas.

---

### 🏟️ Clube (`Club`)
```ts
interface Club {
  name: string;
  location: string; // ex: "Madrid, Spain"
}
```

---

## 🔄 Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/players` | Lista todos os jogadores |
| `GET` | `/players/:id` | Busca jogador por ID |
| `GET` | `/players/search?name=...` | Busca por nome (parcial ou exato) |
| `POST` | `/players` | Cria um novo jogador |
| `PUT` | `/players/:id` | Atualiza todos os campos do jogador |
| `DELETE` | `/players/:id` | Remove um jogador |
| `GET` | `/clubs` | Lista todos os clubes |
| `GET` | `/clubs/:id` | Busca clube por ID |
| `GET` | `/clubs/search?name=...` | Busca clube por nome |
| `POST` | `/clubs` | Cria um novo clube |
| `DELETE` | `/clubs/:id` | Remove um clube |

---

### 📥 Exemplo: Criar um jogador

**`POST /players`**
```json
{
  "name": "Kylian Mbappé",
  "nationality": "French",
  "position": "Forward",
  "statistics": {
    "pace": 97,
    "shooting": 89,
    "passing": 78,
    "dribbling": 95,
    "defending": 40,
    "physical": 75
  },
  "clubId": 1
}
```

**Resposta (201):**
```json
{
  "id": 1,
  "name": "Kylian Mbappé",
  "nationality": "French",
  "position": "Forward",
  "statistics": {
    "overall": 79,
    "pace": 97,
    "shooting": 89,
    "passing": 78,
    "dribbling": 95,
    "defending": 40,
    "physical": 75
  },
  "clubId": 1
}
```

---

### 🔍 Exemplo: Buscar por nome

**`GET /players/search?name=mbappe`**

Retorna todos os jogadores cujo nome contém "mbappe".

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/JulioCesar-A/champions-league-api.git
cd champions-league-api
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar a porta

Crie um arquivo `.env` na raiz:

```env
PORT=3333
```

> Porta padrão: `3333`

---

### 4. Iniciar o servidor

```bash
# Modo desenvolvimento
npm run dev

# Modo observador
npm run watch

# Build de produção
npm run dist
npm run exec:dist
```

> Servidor disponível em: [localhost:3333](localhost:3333)

---

## 🛠️ Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor com `tsx` |
| `npm run watch` | Reinicia automaticamente ao salvar |
| `npm run dist` | Gera a build com `tsup` |
| `npm run exec:dist` | Executa a versão compilada |

---

## 📁 Estrutura do Projeto

```
data/
├── players.json                # Arquivo de persistência dos jogadores
└── clubs.json                  # Arquivo de persistência dos clubes

src/
├── models/                     
│   ├── player/                 
│   │   ├── player-models.ts        # Interface principal do jogador
│   │   └── player-transfer-models.ts # Modelos de transferência (entrada/saída)
│   └── club/                   
│       ├── club-models.ts          # Interface principal do clube
│       └── club-transfer-models.ts # Modelos de transferência (entrada/saída)
├── repositories/               
│   ├── player-repository.ts    # Leitura e escrita de players.json
│   └── club-repository.ts      # Leitura e escrita de clubs.json
├── services/                   
│   ├── player-service.ts       # Lógica de negócio para jogadores
│   └── club-service.ts         # Lógica de negócio para clubes
├── controllers/                
│   ├── player-controller.ts    # Camada de controle: conecta rotas e serviços
│   └── club-controller.ts      # Camada de controle: conecta rotas e serviços
├── routes/                     
│   ├── player-routes.ts        # Rotas específicas de jogadores
│   ├── club-routes.ts          # Rotas específicas de clubes
│   └── routes.ts               # Enum com rotas compartilhadas (ex: Routes.Root, Routes.Id)
├── utils/                      
│   ├── status-code.ts          # Constantes de status HTTP (ex: 200, 404)
│   └── content-type.ts         # Constantes de tipo de conteúdo (ex: application/json)
├── app.ts                      # Configuração do Express (middlewares, headers)
└── server.ts                   # Inicialização do servidor HTTP                   # Inicialização do servidor
```

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.  
Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🧪 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs via **Issues**
- Propor novas funcionalidades
- Enviar **Pull Requests**

### Como contribuir:
1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'feat: adiciona nova rota'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

## 📚 Recursos Utilizados

- **[Node.js](https://nodejs.org/)** – Ambiente de execução JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** – Tipagem estática
- **[tsup](https://tsup.egoist.dev/)** – Compilação rápida com `esbuild`
