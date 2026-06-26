# 📱 Emoji: O Filme: O Jogo

Este projeto é uma aplicação de **Virtual Pet** desenvolvida como parte dos requisitos acadêmicos de avaliação. O jogo desafia o conceito tradicional de pets fofos, trazendo-o no formato de um **Emoji**. O pet não aceita mensagens de texto, mas faz questão de inundar o chat com notificações reclamando do seu estado de saúde, fome e da sua incompetência como dono.

---

## 🎯 Objetivos Acadêmicos

A aplicação foi estruturada especificamente para validar e demonstrar os seguintes conceitos de engenharia de software:

- **Arquitetura Cliente-Servidor Estrita:** Isolamento total entre as regras de negócio/persistência no servidor (Backend) e a experiência de interface do utilizador (Frontend Mobile).
- **Consumo de API RESTful:** Implementação completa de operações de leitura (`GET`) e atualização (`PUT`) de estados via requisições assíncronas utilizando HTTP JSON.
- **Autenticação Baseada em Token:** Controle de acesso seguro e proteção de rotas utilizando tokens **JWT (JSON Web Tokens)**.
- **Princípios SOLID e Clean Code:** Componentização desacoplada, uso de **Estado Derivado** para eliminar redundâncias e isolamento de regras em funções puras.

---

## 📁 Estrutura do Projeto (Arquitetura)

O ecossistema é dividido em dois projetos completamente independentes localizados em diretórios irmãos na raiz do repositório:

```text
📂 emoji/
 ├── 📂 frontend/                 <-- Aplicação Mobile em React Native (Expo)
 │    ├── 📂 app/                 <-- Sistema de Roteamento Plano (Expo Router)
 │    ├── 📂 src/components/      <-- Componentes Visuais desacoplados
 │    ├── 📂 src/hooks/           <-- Hooks de controle e efeitos colaterais
 │    └── 📂 src/context/         <-- Contexto global de autenticação e tokens
 │
 └── 📂 backend/                  <-- Servidor RESTful em Spring Boot (Java 17+)
      ├── 📂 src/main/java/       <-- Código-fonte estruturado em Camadas
      │    ├── 📂 config/         <-- Filtros e Beans do Spring Security + JWT
      │    ├── 📂 controller/     <-- Endpoints e Controladores REST
      │    ├── 📂 domain/         <-- Entidades JPA de mapeamento de tabelas
      │    ├── 📂 dto/            <-- Records imutáveis para transferência de dados
      │    ├── 📂 repository/     <-- Interfaces JpaRepository (Banco H2)
      │    └── 📂 service/        <-- Camada isolada com as Regras de Negócio
      └── pom.xml                 <-- Gerenciador de Dependências Maven
```

---

## 🕹️ Funcionalidades Principais

### 1. Interface Estilo Chat & Estado Derivado

- **Header Dinâmico:** Apresenta a foto de perfil do pet, nome do usuário e o status de digitação.

- **Árvore de Decisão Visual (Humores):** O emoji exibido pelo pet não fica salvo no banco de dados. O Frontend roda uma função utilitária pura que calcula dinamicamente qual carinha exibir (ex: drooling-face para fome ou nauseated-face para sujeira) baseando-se estritamente na combinação matemática dos 4 status numéricos recebidos do servidor.

- **Histórico de Conversa (FlatList):** Área central performática onde as interações do usuário (dar comida, carinho) e as respostas automáticas do pet são registradas de forma cronológica.

### 2. Menu de Interações Rápidas e Gestão de Status

- **🍕 Alimentar:** Dispara um pedido HTTP que reduz o nível de fome (hunger) no banco de dados e ativa o emoji temporário de degustação.

- **🫱 Fazer Carinho:** Aumenta a barra de felicidade (happiness).

- **🚿 Limpeza Dinâmica:** O container de cocôs ocupa a tela inteira em modo invisível (pointerEvents="box-none"). Arrastar o chuveirinho sobre os cocôs dispara uma colisão geométrica absoluta que elimina o item e incrementa a higiene (cleanliness) em 10% via API.

- **💤 Ciclo de Sono:** Arrastar o ícone de zzz faz o pet dormir, bloqueando novas interações. Um clique sobre o pet o acorda, gerando mensagens e recuperando 30% de energia.

### 3. Sistema de Customização (Loja de Acessórios)

- O aplicativo conta com uma Bottom Sheet nativa (`Modal`) que lista os acessórios disponíveis (Cartola, Óculos Escuros, etc.).

- Cada acessório possui um dicionário estático no Frontend contendo seu `sizeRatio` e offsets (`top`, `left`) para um encaixe geométrico milimétrico sobre o rosto do emoji base, salvando apenas o identificador textual do item no banco do servidor.

---

## 📋 Requisitos do Sistema

### Requisitos Funcionais (RF)

- **RF-001 [Autenticação]:** O utilizador deve conseguir cadastrar uma conta e autenticar-se via credenciais exclusivas para receber um Token JWT.

- **RF-002 [Persistência de Status]:** Os status de fome, felicidade, energia e higiene devem ser mantidos de forma persistente através do Backend.

- **RF-003 [Customização]:** O utilizador deve poder adquirir, equipar e remover acessórios cosméticos no pet, mantendo o estado salvo após fechar o app.

### Requisitos Não-Funcionais (RNF)

- **RNF-001 [Segurança da API]:** Todas as rotas sob o escopo `/api/pets/` devem ser bloqueadas pelo Spring Security, exigindo um token no formato Bearer `<TOKEN>`.

- **RNF-002 [Criptografia]:** O banco de dados nunca deve armazenar senhas em texto puro; o Backend deve aplicar hash irreversível via algoritmo BCrypt.

- **RNF-003 [Armazenamento Local]:** O Token JWT de sessão deve ser mantido no celular de forma criptografada usando o `Expo SecureStore` (Chaveiro Nativo do SO) substituindo o armazenamento frágil do `AsyncStorage`.

- **RNF-004 [Navegação Blindada]:** O app deve interceptar a inicialização. Caso o token no `SecureStore` seja inválido ou ausente, o usuário é redirecionado de forma condicional para a tela de Login, impedindo o acesso forçado ao chat do jogo.

---

## 🛠️ Stack Tecnológica

- **Frontend Mobile:** React Native (Expo SDK) + TypeScript + Expo Router

- **Animações e Ícones:** `react-native-reanimated` + `react-native-ico-noto-emojis`

- **Cliente HTTP:** Axios (com injeção automática de Headers via interceptor de Contexto)

- **Backend:** Spring Boot (Java 17) + Spring Security

- **Persistência Local:** Hibernate/JPA + Banco de Dados H2 (Em memória para desenvolvimento)

- **Emissão de Tokens:** Java JWT (JJWT - io.jsonwebtoken)

---

## 🧭 Executando o Projeto em Desenvolvimento

Para rodar a aplicação integrada localmente, você precisará iniciar o servidor e o emulador em terminais distintos.

### 1. Iniciando o Backend (Servidor)

Navegue até a pasta `backend` na sua IDE ou via terminal e execute:

```bash
 ./mvnw spring-boot:run
```

O servidor inicializará e ficará escutando na porta `8080`. O banco de dados H2 será criado automaticamente em memória.

### 2. Iniciando o Frontend (Mobile)

Abra um terminal separado na pasta frontend.

Nota de Rede importante: No arquivo `src/context/AuthContext.tsx`, certifique-se de que a `API_URL` está configurada como `http://10.0.2.2:8080` se estiver testando em emulador Android ou `http://localhost:8080` se estiver no iOS.

Instale as dependências e inicie o Metro Bundler:

```bash
  npm install
  npx expo start
```

Pressione `a` para abrir no emulador Android ou `i` para o emulador iOS.
