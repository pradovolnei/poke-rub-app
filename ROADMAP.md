# 📌 ROADMAP — PokeRubApp

Este arquivo descreve as **histórias de usuário implementadas**, **o que eu adicionaria** e **o que faria diferente**, caso tivesse mais tempo para aprimorar o projeto.

---

## ✅ Histórias atendidas

### 🧩 História 1: Visualizar todos os Pokémon por nome, com busca e detalhes

**Descrição:**  
Implementei uma tela inicial (`HomeScreen`) que consome a PokéAPI para listar todos os Pokémon com base em um `GET /pokemon?limit=1000`.  
Adicionei uma barra de busca por nome e navegação para a tela de detalhes (`PokemonDetailScreen`) ao clicar em um card.

**Como atendi:**  
- Criação de componente `PokemonCard.js` para exibição individual.
- Filtro em tempo real baseado no input do usuário.
- Navegação integrada com React Navigation.

---

### 🔁 História 2: Visualizar as evoluções possíveis de um Pokémon

**Descrição:**  
Na tela de detalhes, além dos dados básicos (nome, altura, peso, tipos e habilidades), exibo a linha de evolução utilizando `pokemon-species` e `evolution-chain` da API.

**Como atendi:**  
- Usei a URL da cadeia de evolução para construir a linha evolutiva.
- Mostro o nome das evoluções e, se houver uma próxima evolução, adiciono botão para navegar diretamente para ela.

---

### ⭐ História 3: Salvar Pokémon como favoritos e listar depois

**Descrição:**  
Implementei o recurso de favoritos usando `AsyncStorage` para persistência local. O usuário pode favoritar/desfavoritar um Pokémon e acessar uma tela de favoritos (`FavoritesScreen`), que lista os Pokémon salvos.

**Como atendi:**  
- Funções de adicionar/remover do AsyncStorage.
- Listagem de favoritos com navegação para detalhes.
- Confirmação visual ao favoritar e desfavoritar.

---

## 🕒 O que eu adicionaria se tivesse mais tempo

- 🎨 Melhorias visuais usando uma paleta de cores inspirada no mundo Pokémon.
- 🖼️ Exibição de **sprites (imagens)** dos Pokémon na listagem e nos detalhes.
- 🔢 Ordenação por número da Pokédex.
- 🔄 Paginação real com scroll infinito, em vez de carregar 1000 Pokémon de uma vez.
- 🧪 Testes unitários com Jest e integração básica.
- 🔧 Modal ou Snackbar para feedbacks visuais (favoritar, remover etc.).
- 📱 Layout adaptado para tablets e responsividade refinada.

---

## 🔁 O que eu faria diferente se tivesse mais tempo

- 📦 Refatoraria a camada de API, criando serviços reutilizáveis com tratamento de erros.
- 🧭 Utilizaria contexto (React Context ou Redux) para gerenciar favoritos e estado global.
- ⚙️ Separaria tipos e interfaces (com TypeScript, caso o projeto fosse em `.tsx`).
- 🔍 Melhoraria a lógica de busca para incluir acentuação, letras maiúsculas/minúsculas e sugestões automáticas.
- 📂 Modularizaria melhor as chamadas assíncronas e lógica de evolução, extraindo para hooks personalizados.

---

## ✨ Conclusão

Apesar de simples, o projeto atendeu aos principais requisitos funcionais propostos nas histórias de usuário, sendo um ponto de partida sólido para evolução futura com foco em performance, testes, design e escalabilidade.

