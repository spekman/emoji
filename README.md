# 📱 Emoji: O Filme: O Jogo

Este projeto é uma aplicação mobile de **Virtual Pet** desenvolvida como parte dos requisitos acadêmicos de avaliação. O jogo desafia o conceito tradicional de pets fofos, o trazendo em formato de **Emoji**. O pet não aceita mensagens de texto (ainda), mas faz questão de inundar o chat com notificações e balões de texto reclamando do seu estado de saúde, fome e da sua incompetência como dono.

---

## 🎯 Objetivos Acadêmicos

A aplicação foi estruturada especificamente para validar e demonstrar os seguintes conceitos de engenharia de software:

- **Arquitetura Cliente-Servidor:** Separação estrita entre regras de negócio/persistência (Backend) e interface/experiência do utilizador (Frontend).
- **Consumo de API & CRUD:** Implementação completa de operações de criação, leitura e atualização de estados via requisições HTTP RESTful.
- **Autenticação:** Controlo de acessos seguro utilizando tokens JWT (JSON Web Tokens).
- **UI/UX e Responsividade:** Interface familiar baseada em componentes nativos, garantindo fluidez e adaptabilidade a diferentes telas.

---

## 🕹️ Funcionalidades Principais

### 1. Interface Estilo Chat

- **Header Dinâmico:** Apresenta a "foto de perfil" (o emoji do pet), o nome escolhido pelo utilizador e o estado atual (ex: _"online"_ ou _"digitando..."_).
- **Histórico de Conversa (`FlatList`):** Área central onde as ações do utilizador (dar comida, carinho, ...) e as respostas reativas do pet são registadas como balões de chat cronológicos.

### 2. Menu de Interações Rápidas

Em vez de um teclado, o rodapé exibe botões de ação baseados em emojis para gerir alguns dos status do pet:

- **🫱 Fazer Carinho:** Aumenta ligeiramente a barra de felicidade.
- **🍕 Alimentar:** Reduz os níveis de fome.
- **🚿 Limpar:** Arraste o emoji do chuveiro sobre um emoji de cocô para limpar o pet. Cada cocô eliminado aumenta a limpeza em 10%.
- **💤 Dormir:** Arraste o emoji de `zzz` sobre o pet para fazê-lo dormir. Pet dormindo não reage a nenhuma interação. Clique no pet para acordá-lo (aumenta energia em 30%).

---

## 📋 Requisitos do Sistema

### Requisitos Funcionais (RF)

- **RF-001 [Autenticação]:** O utilizador deve conseguir criar uma conta e autenticar-se para carregar o progresso do seu pet de forma segura.
- **RF-002 [Criação do Pet]:** No primeiro acesso, o utilizador deve escolher o nome e o Emoji de perfil do pet.
- **RF-003 [Ciclo de Vida/Status]:** O sistema deve computar continuamente a degradação dos status de fome, energia, limpeza e felicidade do pet.
- **RF-004 [Mensagens de Alerta]:** O pet deve enviar mensagens automáticas no chat sempre que um dos seus status atingir níveis críticos.

### Requisitos Não-Funcionais (RNF)

- **RNF-001 [Arquitetura]:** O Frontend não deve calcular ou guardar o estado definitivo do pet; toda a lógica de negócio deve ser processada no Backend. (To-Do)
- **RNF-002 [Persistência]:** Os dados do utilizador, do pet e as configurações de customização devem ser guardados de forma persistente numa base de dados relacional ou não-relacional através do Backend. (To-Do)
- **RNF-003 [Segurança]:** As rotas da API que alteram o estado do pet devem exigir um cabeçalho de autorização com um token JWT válido. (To-Do)

---

## 🛠️ Stack

- **Frontend:** React Native (Expo) + TypeScript
- **Backend:** Spring Boot (Java)
- **Comunicação:** REST API (JSON)
- **Segurança:** Spring Security + JWT

---

## 📚 Documentação do Código

Esta seção descreve a organização do frontend e as decisões técnicas importantes.

- **Componentes principais**:
  - `Header` (src/components/Header): Componente visual; recebe `pet` por props
    e não contém lógica de negócio.
  - `MessageList` (src/components/MessageList): Usa `FlatList` para renderizar o histórico
    de mensagens.
  - `Footer` (src/components/Footer): Fonte de interações rápidas (carinho, comida, chuveiro, dormir).
    Inicia drags e mostra preview do item arrastado; delega a lógica de drop ao hook.
  - `PetEmoji` (src/components/PetEmoji): Renderiza o emoji do pet com animações.
    Usa `react-native-reanimated` para animações e `dropZoneRef` para medir a
    área de drop do pet. Permite clicar para acordar o pet quando dormindo.
  - `PooEmojiContainer` (src/components/PooEmojiContainer): Renderiza emojis de cocô na tela
    e detecta colisão com o chuveiro para limpeza automática.

- **Hooks importantes**:
  - `usePetState` (src/hooks/usePetState.ts): Encapsula estado do pet, mensagens, e sono.
    Funções principais:
    - `handleInteraction(type)`: Processa petting/feeding e gera mensagens
    - `pettingHover()`: Feedback visual leve sem mensagem
    - `handleCleanPoo()`: Aumenta limpeza em 10% ao eliminar cocô
    - `handleSleep()`: Faz o pet dormir (emoji = sleeping-face, bloqueia drag)
    - `handleWakeUp()`: Acorda o pet (restaura emoji anterior, +30 energia)
  - `useDragInteraction` (src/hooks/useDragInteraction.ts): Gerencia drag/drop,
    mede `dropZone` via `measureInWindow`, usa `PanResponder` e introduz um leve
    throttle no evento de hover para evitar chamadas excessivas.
    `isSleeping` bloqueia novos drags quando pet dorme.
  - `usePooEmojis` (src/hooks/usePooEmojis.ts): Gerencia spawn/remoção de cocôs.

## 🛠️ Desenvolvimento

1. Instalar dependências:

```bash
npm install
```

1. Rodar em modo de desenvolvimento (com Expo):

```bash
npm start
```

1. Notas de desenvolvimento:

- O frontend atualmente faz mocking do backend para permitir iteração rápida.
- Para migrar para um backend real, substituir as atualizações locais em
  `usePetState` por chamadas à API e manter o mesmo shape de dados.

## 🧭 Padrões e decisões

- Separação UI/negócio: componentes são preferencialmente sem estado; hooks
  encapsulam estado e lógica. Isso facilita testes unitários e extração futura.
- Performance: `FlatList` e `react-native-reanimated` foram escolhidos por
  minimizar trabalho no thread JS e melhorar fluidez em animações e listas.
- Estilo: `react-native-ico-noto-emojis` foi escolhido para manter a qualidade
  e consistência dos emojis independente da resolução da tela ou sistema
  operacional. (`https://ico.simpleness.org/pack/noto-emojis`)

---
