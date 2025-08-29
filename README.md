Descrição: API com CRUD para gerenciar jogadores da champions league

Funcionalidades:

Listar
Selecionar
Deletar
Atualizar
Inserir

Porta: 3333

## Domínio

```ts
interface Club {
    name: string
}

enum Positions {
    GK = "Goalkeeper",
    DF = "Defender",
    MD = "Midfielder",
    FW = "Forward"
}

type Statistics = {
    overall: number,
    pace: number,
    shooting: number,
    passing: number,
    dribbling: number,
    defending: number,
    physical: number
};

// Jogadores
interface Player {
    name: string,
    club: string,
    nationality: string,
    position: string,    // Preenchido pelo 'enum Positions'
    statistics: Statistics
}
```

Estrutura do projeto

```
models/
|> Players

data/
|> 

controllers/ 
|> Players (GET, DELETE, PATCH/PUT, POST)
|> Clubs (GET)

repositories/
|> getPlayerById()
|> getPlayerByName()
|> getPlayersList()
|> deletePlayersById()
|> updatePlayersById()

|> getClubById()
|> getClubsList()

services/
server.ts
app.ts
.env


```