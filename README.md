# Sistema Integrado Mobile

Um aplicativo centralizador (Hub) que reúne quatro ferramentas distintas desenvolvidas em React Native, utilizando navegação em pilha (Stack Navigation) e persistência de dados local com arquitetura híbrida (Mobile/Web).

## 🚀 Aplicações Integradas

* **Calculadora de IMC:** Cálculo de Índice de Massa Corporal com gravação de histórico vinculada ao usuário logado.
* **Conversor de Moedas:** Ferramenta de conversão financeira com interface intuitiva.
* **Sistema Solar:** Interface exploratória com dados e curiosidades sobre planetas e galáxias.
* **DevFood (Pedidos):** Sistema de simulação de pedidos (SaaS) com carrinho dinâmico e histórico de compras salvo localmente.

## 🛠️ Tecnologias Utilizadas

* **Frontend:** React Native, Expo
* **Roteamento:** React Navigation (Native Stack)
* **Banco de Dados Nativo:** Expo SQLite (PRAGMA WAL)
* **Banco de Dados Web (Fallback):** Padrão Adaptador utilizando `localStorage`
* **Deploy e Hospedagem:** GitHub Pages com suporte a WebAssembly (`.wasm`)

## 🏗️ Arquitetura Híbrida de Persistência

Este projeto implementa uma solução inteligente para lidar com as limitações do SQLite em navegadores. Através do arquivo `bancoDados.js`, o sistema identifica a plataforma em execução:
* **No Celular (Expo Go):** Cria e gerencia o arquivo `.db` utilizando `expo-sqlite`, garantindo uma avaliação acadêmica rigorosa do CRUD.
* **No Navegador (Web):** Intercepta as chamadas do banco e redireciona os dados de cadastro, login e históricos para o `localStorage`, impedindo telas brancas e permitindo testes rápidos de UI/UX pelo desktop.

## 📦 Como rodar o projeto localmente

Pré-requisitos: Node.js instalado na máquina.

Abra o seu terminal e execute os comandos abaixo:

    # Clone este repositório
    git clone https://github.com/SEU-USUARIO/NOME-DO-REPO.git

    # Navegue até o diretório principal do aplicativo
    cd app-integrado

    # Instale todas as dependências do projeto
    npm install

    # Inicie o servidor de desenvolvimento do Expo (limpando o cache)
    npx expo start -c

Para visualizar no navegador, pressione `w` no terminal. Para testar no celular, instale o aplicativo Expo Go e escaneie o QR Code gerado no terminal.

## 🎨 UI/UX e Responsividade

A interface foi refatorada utilizando limitadores de largura máxima (`maxWidth: 500`) em contêineres centralizados. Isso garante que a aplicação ocupe 100% da tela em dispositivos móveis, mas se comporte como um painel flutuante elegante ao ser visualizada em monitores ultrawide via Web, não quebrando a estética dos componentes (como os cartões do DevFood).

## 👨‍💻 Autor

Projeto desenvolvido por Kauã Hiro Mizumoto como parte integrante do 3º semestre do curso de Desenvolvimento de Software Multiplataforma na Fatec.
