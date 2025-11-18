# SkillUpPlus2030+


![Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-8E75B2?style=flat&logo=google-bard&logoColor=white)

---

## Sobre o Projeto

A ideia do SkillUpPlus2030+ é ser uma ferramenta inteligente que proporciona minicursos técnicos personalizados e quizzes que auxiliam na requalificação profissional de maneira objetiva, prática e efetiva. Tudo na palma da sua mão!

---

## Funcionalidades Principais

* **Autenticação Segura:** Login e cadastro de usuários gerenciados via Firebase Authentication.
* **Recomendações personalizadas (IA):** Um questionário interativo onde suas respostas são analisadas por IA, sugerindo os melhores cursos.
* **Acompanhamento em tempo real:** Visualize seus progressos e performance nos minicursos.
* **Minicursos:** Conteúdo técnico focado em habilidades práticas.
* **Quizzes de Validação:** Testes ao final dos módulos para garantir a absorção do conhecimento.
* **Interface Moderna:** Design fluido e responsivo desenvolvido com React Native e Expo Router.

---

## Tecnologias Utilizadas

* **Frontend:** React Native (Expo Framework).
* **Roteamento:** Expo Router (File-based routing).
* **Backend/Auth/Firestore:** Firebase.
* **Inteligência Artificial:** Google Gemini API.
* **Linguagem:** TypeScript.

---

## Pré-requisitos e Configuração

Antes de começar, você vai precisar ter instalado em sua máquina:
* [Node.js](https://nodejs.org/en/)
* [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/vvctort1/SkillUpPlus2030.git
    cd seu-projeto
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configuração de Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto e preencha com as chaves da API do Gemini e as configurações do seu projeto Firebase (Console do Firebase > Project Settings):

    ```env

    # Firebase Config
    EXPO_PUBLIC_FIREBASE_API_KEY=sua_api_key
    EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
    EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
    EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
    EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
    EXPO_PUBLIC_FIREBASE_APP_ID=seu_app_id

    # Google Gemini AI
    EXPO_PUBLIC_GEMINI_API_KEY=sua_chave_gemini_aqui
    ```

4.  **Execute o projeto:**
    ```bash
    npx expo start
    ```

---

## Integrantes do Grupo

| Nome Completo | RM |
| :--- | :---: |
| Gabriel Genaro Dalaqua | 551986 |
| Paloma Mirela dos Santos Rodrigues | 551321 |
| Victor Kenzo Toma | 551649 |

---
