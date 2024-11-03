# Omori Wiki - Projeto de TCM

Este é o projeto de Trabalho de Conclusão de Módulo (TCM) para a disciplina de Desenvolvimento Web da ETESP. O site é uma wiki interativa e informativa sobre o jogo "Omori".

## Link para o Site

Acesse o projeto em: [Omori Wiki](https://omori.netlify.app)

## Objetivo

Este projeto visa consolidar e exibir informações sobre o jogo "Omori" de maneira interativa, com foco em tecnologias de desenvolvimento web como WebSocket e AJAX. O conteúdo abrange diferentes aspectos do jogo, oferecendo uma experiência de navegação imersiva.

## Estrutura e Funcionalidades

O projeto consiste em **20 páginas**, incluindo algumas em inglês para atender aos requisitos do TCM. As páginas cobrem diversos tópicos sobre o jogo e seu universo, apresentados com interatividade e recursos visuais.

### Principais Funcionalidades

- **WebSocket para Sessão de Comentários**: Sessão de comentários em tempo real, onde os usuários podem trocar opiniões e interagir ao vivo.
- **Galeria com API AJAX**: Imagens do jogo carregadas dinamicamente utilizando AJAX para melhorar a performance e a experiência do usuário.
- **Mini Jogo Inspirado em Omori**: Para entretenimento dos usuários, o site contém um mini jogo inspirado em Omori, com segredos escondidos e easter eggs espalhados para tornar a experiência mais divertida e envolvente.
- **Design Responsivo**: Ajusta-se a diferentes tamanhos de tela para garantir acessibilidade e facilidade de navegação.
- **Wiki Interativa**: Organização intuitiva de conteúdo para facilitar a busca por informações sobre o jogo.

## Tecnologias Utilizadas

- **HTML5**: Estruturação e marcação das páginas.
- **CSS3**: Estilos visuais e responsividade.
- **JavaScript**: Funcionalidades dinâmicas e interatividade.
- **AJAX**: Carregamento dinâmico de conteúdo da galeria.
- **WebSocket**: Comunicação em tempo real para a sessão de comentários.

## Estrutura do Projeto

O projeto segue uma estrutura organizada para facilitar a manutenção e a expansão:

- `index.html`: Página principal com links para outras páginas da wiki.
- `characters/`: Informações detalhadas sobre personagens do jogo.
- `comments/`: Scripts e páginas relacionadas ao sistema de comentários em tempo real.
- `en-us/`: Conteúdo em inglês, cumprindo a exigência de páginas bilíngues.
- `gallery/`: Galeria de imagens do jogo, com carregamento via AJAX.
- `history/`: Seção dedicada à história e enredo do jogo.
- `music/`: Páginas e informações sobre a trilha sonora do jogo.
- `src/`: Arquivos de código-fonte e scripts.
- `worlds/`: Informações sobre os diferentes mundos e cenários do jogo.
- `src/js/minigame.js`: Contém o código e recursos para o mini jogo, com segredos e easter eggs para explorar.

## Instalação e Execução Local

Para visualizar o projeto localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/mercuryVM/omori.git
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd omori
   ```

3. Abra `index.html` em um navegador.
