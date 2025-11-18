


export const allCoursesData = [
  {
    id: '1',
    title: 'Fundamentos da IA Responsável',
    description: 'Explore os princípios éticos e práticos da inteligência artificial responsável.',
    icon: '🤖', 
    slug: 'ia-responsavel',
    content: `
      O que é IA Responsável?
      A Inteligência Artificial Responsável (IA Responsável) é uma abordagem para desenvolver, implementar e usar sistemas de IA de forma ética, segura e transparente. Ela busca garantir que a IA beneficie a sociedade como um todo, minimizando riscos e impactos negativos.

      Princípios Fundamentais:
      1. Justiça e Equidade: Evitar vieses e discriminação.
      2. Transparência e Explicabilidade: Entender como a IA toma decisões.
      3. Responsabilidade e Governança: Quem é responsável pelos resultados da IA.
      4. Segurança e Confiabilidade: Garantir que a IA funcione conforme o esperado e sem falhas perigosas.
      5. Privacidade e Segurança de Dados: Proteger as informações dos usuários.

      Por que é Importante?
      Com o avanço rápido da IA, é crucial abordar as implicações éticas. Sistemas tendenciosos podem perpetuar ou ampliar desigualdades sociais. Falhas de segurança podem ter consequências graves. A confiança pública na IA depende de sua capacidade de ser desenvolvida e usada de forma responsável.

      Exemplos de Aplicação:
      * Algoritmos de empréstimo que não discriminam minorias.
      * Sistemas de reconhecimento facial que respeitam a privacidade.
      * Chatbots de atendimento ao cliente que explicam suas limitações.

      Este minicurso é apenas uma introdução. Há muito mais para aprender!
    `,
    quiz: {
      title: 'Desafio IA Responsável',
      questions: [
        {
          question: 'Qual dos seguintes NÃO é um princípio fundamental da IA Responsável?',
          options: ['Justiça e Equidade', 'Transparência e Explicabilidade', 'Automação Total', 'Segurança e Confiabilidade'],
          correctAnswer: 'Automação Total',
        },
        {
          question: 'Qual o principal objetivo da IA Responsável?',
          options: ['Maximizar lucros das empresas de tecnologia', 'Garantir que a IA beneficie a sociedade, minimizando riscos', 'Substituir todos os empregos humanos', 'Criar robôs autoconscientes'],
          correctAnswer: 'Garantir que a IA beneficie a sociedade, minimizando riscos',
        },
      ],
    },
  },

  {
    id: '2',
    title: 'Introdução à Cibersegurança',
    description: 'Aprenda os conceitos básicos para proteger seus dados e sistemas contra ameaças digitais.',
    icon: '🔒',
    slug: 'ciberseguranca-intro',
    content: `
      Entendendo a Cibersegurança
      Cibersegurança é a prática de proteger sistemas, redes e programas contra ataques digitais. Estes ataques geralmente visam acessar, alterar ou destruir informações sensíveis; extorquir dinheiro de usuários; ou interromper processos de negócios normais.

      Pilares da Cibersegurança:
      1. Confidencialidade: Proteger a informação de acesso não autorizado.
      2. Integridade: Garantir que a informação seja precisa e completa.
      3. Disponibilidade: Assegurar que os usuários autorizados tenham acesso à informação quando necessário.

      Ameaças Comuns:
      * Malware: Vírus, ransomware, spyware.
      * Phishing: Tentativas de enganar usuários para obter informações.
      * Ataques de Negação de Serviço (DoS/DDoS): Sobrecarregar um sistema para torná-lo indisponível.

      Proteger-se no ambiente digital é fundamental para indivíduos e organizações.
    `,
    quiz: {
      title: 'Desafio Cibersegurança',
      questions: [
        {
          question: 'Qual dos seguintes é um pilar fundamental da cibersegurança?',
          options: ['Velocidade', 'Escalabilidade', 'Disponibilidade', 'Complexidade'],
          correctAnswer: 'Disponibilidade',
        },
        {
          question: 'O que é "phishing"?',
          options: ['Um tipo de malware que criptografa seus arquivos', 'Um método de enganar usuários para obter informações', 'Um ataque que desliga seu computador', 'Um software para otimizar sua rede'],
          correctAnswer: 'Um método de enganar usuários para obter informações',
        },
      ],
    },
  },
  {
    id: '3',
    title: 'Blockchain para Iniciantes',
    description: 'Entenda como a tecnologia blockchain funciona e suas aplicações além das criptomoedas.',
    icon: '🔗',
    slug: 'blockchain-iniciantes',
    content: `
      O que é Blockchain?
      Blockchain é uma tecnologia de registro distribuído que permite manter um livro-razão de transações de forma segura e transparente. Cada "bloco" contém transações e é ligado ao bloco anterior, formando uma "corrente" (chain).

      Características:
      * Descentralização: Não há uma autoridade central.
      * Imutabilidade: Uma vez registrada, uma transação não pode ser alterada.
      * Transparência: Todas as transações são visíveis para todos os participantes da rede.

      Usos:
      Principalmente conhecido por criptomoedas como Bitcoin, mas também usado em cadeias de suprimentos, registros de propriedade e votação eletrônica.
    `,
    quiz: {
      title: 'Desafio Blockchain',
      questions: [
        {
          question: 'Qual a principal característica do Blockchain?',
          options: ['Centralização', 'Imutabilidade', 'Velocidade', 'Anonimato'],
          correctAnswer: 'Imutabilidade',
        },
        {
          question: 'O Blockchain é mais conhecido por qual aplicação?',
          options: ['Jogos online', 'Redes sociais', 'Criptomoedas', 'Edição de vídeo'],
          correctAnswer: 'Criptomoedas',
        },
      ],
    },
  },
  {
    id: '4',
    title: 'Programação em Python: Primeiros Passos',
    description: 'Aprenda os fundamentos da linguagem de programação Python e comece a criar seus próprios scripts.',
    icon: '🐍',
    slug: 'python-iniciantes',
    content: `
      Introdução ao Python
      Python é uma linguagem de programação popular, de alto nível, interpretada, orientada a objetos, com uma sintaxe clara e legível. É muito usada em desenvolvimento web, análise de dados, inteligência artificial e automação.

      Conceitos Básicos:
      * Variáveis: Armazenam dados.
      * Tipos de Dados: Números, strings, booleanos, listas.
      * Estruturas de Controle: if/else, for, while.
      * Funções: Blocos de código reutilizáveis.

      Comece instalando Python e experimentando com o console!
    `,
    quiz: {
      title: 'Desafio Python',
      questions: [
        {
          question: 'Qual estrutura de controle é usada para repetição em Python?',
          options: ['if', 'function', 'for', 'class'],
          correctAnswer: 'for',
        },
        {
          question: 'Qual é um uso comum para Python?',
          options: ['Desenvolvimento de hardware', 'Análise de dados', 'Design gráfico', 'Criação de sistemas operacionais'],
          correctAnswer: 'Análise de dados',
        },
      ],
    },
  },
  {
    id: '5',
    title: 'Cloud Computing Essencial',
    description: 'Entenda os conceitos básicos da computação em nuvem e seus principais modelos de serviço.',
    icon: '☁️',
    slug: 'cloud-computing',
    content: `
      O que é Cloud Computing?
      Cloud Computing (computação em nuvem) é a entrega de serviços de computação – incluindo servidores, armazenamento, bancos de dados, redes, software, análise e inteligência – pela Internet ("a nuvem").

      Modelos de Serviço:
      * IaaS (Infrastructure as a Service): Servidores virtuais, armazenamento. Ex: AWS EC2.
      * PaaS (Platform as a Service): Ambiente para desenvolver e executar apps. Ex: Google App Engine.
      * SaaS (Software as a Service): Software pronto para uso. Ex: Gmail, Salesforce.

      A nuvem oferece flexibilidade, escalabilidade e economia.
    `,
    quiz: {
      title: 'Desafio Cloud Computing',
      questions: [
        {
          question: 'Qual modelo de serviço de nuvem fornece software pronto para uso?',
          options: ['IaaS', 'PaaS', 'SaaS', 'DaaS'],
          correctAnswer: 'SaaS',
        },
        {
          question: 'Uma vantagem da computação em nuvem é:',
          options: ['Custo fixo alto', 'Falta de escalabilidade', 'Flexibilidade', 'Menor segurança'],
          correctAnswer: 'Flexibilidade',
        },
      ],
    },
  },
  {
    id: '6',
    title: 'Desenvolvimento Web: HTML Básico',
    description: 'Aprenda a criar a estrutura de páginas web usando a linguagem de marcação HTML.',
    icon: '📄',
    slug: 'html-basico',
    content: `
      Introdução ao HTML
      HTML (HyperText Markup Language) é a linguagem de marcação padrão para criar páginas web. Ele descreve a estrutura de uma página web semanticamente e inclui dicas de apresentação.

      Elementos Chave:
      * <html>: Raiz de toda a página.
      * <head>: Metadados da página.
      * <body>: Conteúdo visível da página.
      * <p>: Parágrafo.
      * <a>: Link.
      * <img>: Imagem.

      HTML é a base de qualquer site na internet.
    `,
    quiz: {
      title: 'Desafio HTML',
      questions: [
        {
          question: 'Qual tag HTML representa um parágrafo?',
          options: ['<p>', '<d>', '<h1>', '<a>'],
          correctAnswer: '<p>',
        },
        {
          question: 'Para que serve a tag <img>?',
          options: ['Criar um link', 'Inserir uma imagem', 'Definir um título', 'Listar itens'],
          correctAnswer: 'Inserir uma imagem',
        },
      ],
    },
  },
  {
    id: '7',
    title: 'Desenvolvimento Web: CSS Essencial',
    description: 'Estilize suas páginas HTML com CSS, aprendendo a controlar cores, fontes e layouts.',
    icon: '🎨',
    slug: 'css-essencial',
    content: `
      Introdução ao CSS
      CSS (Cascading Style Sheets) é uma linguagem de folha de estilo usada para descrever a apresentação de um documento escrito em HTML ou XML. Ele controla como os elementos HTML são exibidos na tela, papel ou em outras mídias.

      Conceitos:
      * Seletores: Apontam para elementos HTML que serão estilizados.
      * Propriedades: Características do estilo (ex: color, font-size).
      * Valores: Definições das propriedades (ex: red, 16px).

      CSS torna as páginas web visualmente atraentes.
    `,
    quiz: {
      title: 'Desafio CSS',
      questions: [
        {
          question: 'Qual a finalidade principal do CSS?',
          options: ['Estruturar o conteúdo', 'Definir a lógica do servidor', 'Estilizar a apresentação de documentos', 'Gerenciar bancos de dados'],
          correctAnswer: 'Estilizar a apresentação de documentos',
        },
        {
          question: 'Qual propriedade CSS altera a cor do texto?',
          options: ['background-color', 'text-style', 'color', 'font-color'],
          correctAnswer: 'color',
        },
      ],
    },
  },
  {
    id: '8',
    title: 'Introdução ao JavaScript',
    description: 'Dê vida às suas páginas web com JavaScript, a linguagem de programação do navegador.',
    icon: '💻',
    slug: 'javascript-intro',
    content: `
      O Básico do JavaScript
      JavaScript é uma linguagem de programação interpretada, usada principalmente para criar interatividade em páginas web. É a "linguagem da web" ao lado de HTML e CSS.

      Funcionalidades:
      * Manipular o DOM (Document Object Model) da página.
      * Validar formulários.
      * Criar animações interativas.
      * Comunicar-se com servidores (AJAX, Fetch API).

      JavaScript é essencial para a web moderna.
    `,
    quiz: {
      title: 'Desafio JavaScript',
      questions: [
        {
          question: 'Qual o principal uso do JavaScript no navegador?',
          options: ['Estilizar páginas', 'Criar estrutura HTML', 'Adicionar interatividade', 'Armazenar dados permanentemente'],
          correctAnswer: 'Adicionar interatividade',
        },
        {
          question: 'Qual método é usado para mostrar uma mensagem de alerta no navegador?',
          options: ['console.log()', 'alert()', 'document.write()', 'print()'],
          correctAnswer: 'alert()',
        },
      ],
    },
  },
  {
    id: '9',
    title: 'Fundamentos de Redes de Computadores',
    description: 'Entenda como os computadores se comunicam e a estrutura básica da internet.',
    icon: '🌐',
    slug: 'redes-fundamentos',
    content: `
      Introdução às Redes
      Uma rede de computadores é um conjunto de sistemas interconectados que podem compartilhar recursos e dados. A Internet é a maior rede de computadores do mundo.

      Conceitos Chave:
      * Protocolos: Regras para comunicação (TCP/IP, HTTP).
      * Endereço IP: Identificador único de um dispositivo na rede.
      * Roteador: Dispositivo que direciona o tráfego de dados.
      * Servidor: Fornece recursos (arquivos, páginas web) para clientes.

      Redes são a espinha dorsal da conectividade moderna.
    `,
    quiz: {
      title: 'Desafio Redes',
      questions: [
        {
          question: 'Qual é a função de um roteador em uma rede?',
          options: ['Armazenar arquivos', 'Conectar impressoras', 'Direcionar o tráfego de dados', 'Exibir páginas web'],
          correctAnswer: 'Direcionar o tráfego de dados',
        },
        {
          question: 'O que é um endereço IP?',
          options: ['Um tipo de navegador web', 'Um identificador único para um dispositivo em uma rede', 'Um protocolo de segurança', 'Um software de e-mail'],
          correctAnswer: 'Um identificador único para um dispositivo em uma rede',
        },
      ],
    },
  },
  {
    id: '10',
    title: 'SQL Básico: Consultas Essenciais',
    description: 'Aprenda a linguagem SQL para consultar e manipular dados em bancos de dados relacionais.',
    icon: '🗄️',
    slug: 'sql-basico',
    content: `
      Introdução ao SQL
      SQL (Structured Query Language) é uma linguagem padrão para gerenciar e manipular bancos de dados relacionais. É usada para consultar, inserir, atualizar e excluir dados.

      Comandos Básicos:
      * SELECT: Recupera dados.
      * FROM: Especifica a tabela.
      * WHERE: Filtra resultados.
      * INSERT INTO: Adiciona novos registros.
      * UPDATE: Modifica registros existentes.
      * DELETE FROM: Remove registros.

      SQL é fundamental para quem trabalha com dados.
    `,
    quiz: {
      title: 'Desafio SQL',
      questions: [
        {
          question: 'Qual comando SQL é usado para recuperar dados de um banco de dados?',
          options: ['UPDATE', 'INSERT', 'SELECT', 'DELETE'],
          correctAnswer: 'SELECT',
        },
        {
          question: 'A cláusula WHERE em SQL serve para:',
          options: ['Ordenar resultados', 'Agrupar dados', 'Filtrar resultados', 'Criar tabelas'],
          correctAnswer: 'Filtrar resultados',
        },
      ],
    },
  },
  {
    id: '11',
    title: 'Controle de Versão com Git e GitHub',
    description: 'Gerencie seu código eficientemente com Git e colabore em projetos usando o GitHub.',
    icon: '🌳',
    slug: 'git-github',
    content: `
      O que é Git e GitHub?
      Git é um sistema de controle de versão distribuído que rastreia mudanças no código-fonte durante o desenvolvimento de software.
      GitHub é uma plataforma de hospedagem de código para controle de versão e colaboração usando Git.

      Comandos Git Essenciais:
      * git init: Inicia um novo repositório.
      * git add: Adiciona arquivos para o commit.
      * git commit: Salva as mudanças.
      * git push: Envia as mudanças para o GitHub.
      * git pull: Baixa as mudanças do GitHub.

      Essencial para desenvolvedores modernos.
    `,
    quiz: {
      title: 'Desafio Git/GitHub',
      questions: [
        {
          question: 'Qual ferramenta é um sistema de controle de versão distribuído?',
          options: ['GitHub', 'Git', 'VS Code', 'Jira'],
          correctAnswer: 'Git',
        },
        {
          question: 'Qual comando envia as mudanças locais para um repositório remoto (ex: GitHub)?',
          options: ['git commit', 'git add', 'git pull', 'git push'],
          correctAnswer: 'git push',
        },
      ],
    },
  },
  {
    id: '12',
    title: 'Fundamentos de UX/UI Design',
    description: 'Aprenda os princípios para criar interfaces de usuário intuitivas e experiências agradáveis.',
    icon: '✨',
    slug: 'ux-ui-fundamentos',
    content: `
      UX vs UI: A Diferença
      UX (User Experience): Foca na experiência geral do usuário com um produto. Como o usuário se sente ao interagir com ele? É fácil, útil, agradável?
      UI (User Interface): Foca na aparência e interatividade de um produto. Cores, tipografia, layout de botões, etc.

      Princípios de UX:
      * Usabilidade
      * Acessibilidade
      * Valiosidade
      * Desejabilidade

      Um bom design UX/UI é crucial para o sucesso de qualquer produto digital.
    `,
    quiz: {
      title: 'Desafio UX/UI',
      questions: [
        {
          question: 'Qual área se preocupa com a experiência geral do usuário com um produto?',
          options: ['UI Design', 'UX Design', 'Desenvolvimento Front-end', 'Marketing'],
          correctAnswer: 'UX Design',
        },
        {
          question: 'Qual dos seguintes é um elemento típico do UI Design?',
          options: ['Fluxo do usuário', 'Pesquisa de mercado', 'Esquema de cores', 'Testes de usabilidade'],
          correctAnswer: 'Esquema de cores',
        },
      ],
    },
  },
  {
    id: '13',
    title: 'Análise de Dados com Excel',
    description: 'Domine o Excel para organizar, analisar e visualizar grandes volumes de dados de forma eficiente.',
    icon: '📈',
    slug: 'excel-analise',
    content: `
      Excel para Análise de Dados
      O Microsoft Excel é uma ferramenta poderosa para manipulação e análise de dados, amplamente utilizado em diversas áreas para finanças, relatórios e planejamento.

      Funções Essenciais:
      * SOMA, MÉDIA, CONT.SE: Cálculos básicos.
      * PROCV, ÍNDICE+CORRESP: Buscar dados em tabelas.
      * Tabelas Dinâmicas: Resumir e analisar grandes conjuntos de dados.
      * Gráficos: Visualizar tendências e padrões.

      Com Excel, você transforma dados brutos em insights.
    `,
    quiz: {
      title: 'Desafio Excel',
      questions: [
        {
          question: 'Qual função do Excel é usada para resumir grandes conjuntos de dados?',
          options: ['SOMA', 'PROCV', 'Tabela Dinâmica', 'MÉDIA'],
          correctAnswer: 'Tabela Dinâmica',
        },
        {
          question: 'Para que serve a função PROCV?',
          options: ['Somar valores', 'Contar células', 'Buscar valores em uma tabela', 'Criar um gráfico'],
          correctAnswer: 'Buscar valores em uma tabela',
        },
      ],
    },
  },
  {
    id: '14',
    title: 'Marketing Digital: Fundamentos',
    description: 'Conheça os pilares do marketing digital, desde SEO até mídias sociais.',
    icon: '📣',
    slug: 'marketing-digital-fundamentos',
    content: `
      Introdução ao Marketing Digital
      Marketing Digital é o conjunto de estratégias e táticas de marketing aplicadas nos canais digitais. É essencial para empresas que querem alcançar clientes online.

      Principais Estratégias:
      * SEO (Search Engine Optimization): Otimização para mecanismos de busca.
      * Marketing de Conteúdo: Criação e distribuição de conteúdo valioso.
      * Mídias Sociais: Engajamento em plataformas como Instagram, Facebook, LinkedIn.
      * E-mail Marketing: Comunicação direta com leads e clientes.
      * Anúncios Pagos (PPC): Google Ads, Facebook Ads.

      O marketing digital conecta sua marca ao seu público.
    `,
    quiz: {
      title: 'Desafio Marketing Digital',
      questions: [
        {
          question: 'Qual estratégia visa otimizar um site para mecanismos de busca?',
          options: ['E-mail Marketing', 'SEO', 'Mídias Sociais', 'Anúncios Pagos'],
          correctAnswer: 'SEO',
        },
        {
          question: 'Qual canal é usado para comunicação direta com leads e clientes por meio de mensagens?',
          options: ['TikTok', 'E-mail Marketing', 'YouTube', 'Outdoors digitais'],
          correctAnswer: 'E-mail Marketing',
        },
      ],
    },
  },
  {
    id: '15',
    title: 'Scrum Essencial: Metodologias Ágeis',
    description: 'Aprenda a metodologia Scrum para gerenciar projetos de forma flexível e colaborativa.',
    icon: '🏃',
    slug: 'scrum-essencial',
    content: `
      O que é Scrum?
      Scrum é uma metodologia ágil para gerenciar projetos de forma iterativa e incremental, geralmente usada em desenvolvimento de software. Ele foca na entrega de valor contínuo e na adaptação às mudanças.

      Papéis Principais:
      * Product Owner: Representa os stakeholders e define o que será construído.
      * Scrum Master: Facilita o processo Scrum e remove impedimentos.
      * Time de Desenvolvimento: Responsável por entregar o incremento do produto.

      Eventos:
      * Sprint: Ciclo de trabalho de 1-4 semanas.
      * Daily Scrum: Reunião diária rápida.
      * Sprint Review: Demonstração do que foi feito.
      * Sprint Retrospective: Melhoria contínua do processo.

      Scrum ajuda equipes a serem mais eficientes e responsivas.
    `,
    quiz: {
      title: 'Desafio Scrum',
      questions: [
        {
          question: 'Qual papel no Scrum é responsável por definir o que será construído no produto?',
          options: ['Scrum Master', 'Desenvolvedor', 'Product Owner', 'Gerente de Projeto'],
          correctAnswer: 'Product Owner',
        },
        {
          question: 'Quanto tempo geralmente dura uma Sprint no Scrum?',
          options: ['1 dia', '1-4 semanas', '6 meses', '1 ano'],
          correctAnswer: '1-4 semanas',
        },
      ],
    },
  },
  {
    id: '16',
    title: 'Google Analytics Básico',
    description: 'Analise o tráfego do seu site e o comportamento dos usuários com o Google Analytics.',
    icon: '📊',
    slug: 'google-analytics-basico',
    content: `
      Entendendo o Google Analytics
      Google Analytics é uma ferramenta gratuita de análise da web que rastreia e relata o tráfego do site. Ele ajuda a entender como os usuários interagem com seu site.

      Métricas Chave:
      * Usuários: Quantidade de visitantes únicos.
      * Sessões: Interações de um usuário durante um período.
      * Taxa de Rejeição: Porcentagem de visitas de página única.
      * Páginas por Sessão: Quantidade média de páginas visualizadas.

      Com o GA, você toma decisões baseadas em dados.
    `,
    quiz: {
      title: 'Desafio Google Analytics',
      questions: [
        {
          question: 'Qual o principal objetivo do Google Analytics?',
          options: ['Criar sites', 'Gerenciar e-mails', 'Analisar o tráfego do site', 'Fazer edições de imagem'],
          correctAnswer: 'Analisar o tráfego do site',
        },
        {
          question: 'O que a métrica "Taxa de Rejeição" representa?',
          options: ['Número de erros no site', 'Porcentagem de visitas de página única', 'Velocidade de carregamento', 'Número de compras concluídas'],
          correctAnswer: 'Porcentagem de visitas de página única',
        },
      ],
    },
  },
  {
    id: '17',
    title: 'Introdução à Ciência de Dados',
    description: 'Explore os conceitos fundamentais da ciência de dados, seu ciclo de vida e ferramentas.',
    icon: '🔬',
    slug: 'ciencia-dados-intro',
    content: `
      O que é Ciência de Dados?
      Ciência de Dados é um campo interdisciplinar que utiliza métodos científicos, processos, algoritmos e sistemas para extrair conhecimento ou insights de dados de várias formas, estruturados ou não estruturados.

      Ciclo de Vida:
      * Coleta de Dados: Obtenção de dados.
      * Limpeza e Preparação: Tratamento de dados brutos.
      * Análise Exploratória: Descobrir padrões.
      * Modelagem: Construir modelos preditivos.
      * Comunicação: Apresentar os resultados.

      A ciência de dados transforma dados em valor.
    `,
    quiz: {
      title: 'Desafio Ciência de Dados',
      questions: [
        {
          question: 'Qual a primeira etapa do ciclo de vida da ciência de dados?',
          options: ['Modelagem', 'Coleta de Dados', 'Análise Exploratória', 'Comunicação'],
          correctAnswer: 'Coleta de Dados',
        },
        {
          question: 'Qual o objetivo principal da ciência de dados?',
          options: ['Apenas coletar dados', 'Extrair insights de dados', 'Desenvolver websites', 'Criar jogos'],
          correctAnswer: 'Extrair insights de dados',
        },
      ],
    },
  },
  {
    id: '18',
    title: 'Desvendando o Figma',
    description: 'Aprenda a usar o Figma para criar protótipos e designs de interface de forma colaborativa.',
    icon: '✏️',
    slug: 'figma-desvendando',
    content: `
      Introdução ao Figma
      Figma é uma ferramenta de design de interface baseada em nuvem, popular para criar designs de sites, aplicativos e protótipos. Sua característica principal é a colaboração em tempo real.

      Recursos Chave:
      * Vetor: Ferramentas de desenho vetorial.
      * Componentes: Elementos reutilizáveis do design.
      * Prototipagem: Simular a interação do usuário.
      * Colaboração: Múltiplos usuários editando o mesmo arquivo.

      Figma é essencial para designers modernos.
    `,
    quiz: {
      title: 'Desafio Figma',
      questions: [
        {
          question: 'Qual a principal vantagem do Figma para equipes de design?',
          options: ['É offline', 'Colaboração em tempo real', 'Somente para impressão', 'É pago e limitado'],
          correctAnswer: 'Colaboração em tempo real',
        },
        {
          question: 'No Figma, o que são "Componentes"?',
          options: ['Páginas separadas', 'Elementos de design reutilizáveis', 'Animações complexas', 'Códigos de programação'],
          correctAnswer: 'Elementos de design reutilizáveis',
        },
      ],
    },
  },
  {
    id: '19',
    title: 'Fundamentos de Criptografia',
    description: 'Entenda os princípios básicos por trás da segurança da informação através da criptografia.',
    icon: '🔐',
    slug: 'criptografia-fundamentos',
    content: `
      O que é Criptografia?
      Criptografia é a prática e o estudo de técnicas seguras de comunicação na presença de terceiros (adversários). Ela permite proteger a confidencialidade, integridade e autenticidade das informações.

      Conceitos Chave:
      * Cifra: Algoritmo de criptografia.
      * Chave: Segredo usado na cifra.
      * Criptografia Simétrica: Mesma chave para criptografar e descriptografar.
      * Criptografia Assimétrica: Chaves diferentes (pública e privada).

      Criptografia é a base da segurança online.
    `,
    quiz: {
      title: 'Desafio Criptografia',
      questions: [
        {
          question: 'Qual o principal objetivo da criptografia?',
          options: ['Acelerar a internet', 'Proteger informações sensíveis', 'Aumentar a bateria do celular', 'Melhorar a qualidade de vídeo'],
          correctAnswer: 'Proteger informações sensíveis',
        },
        {
          question: 'Na criptografia simétrica, quantas chaves são usadas?',
          options: ['Uma', 'Duas', 'Nenhuma', 'Variáveis'],
          correctAnswer: 'Uma',
        },
      ],
    },
  },
  {
    id: '20',
    title: 'Design Responsivo para Web',
    description: 'Crie layouts de sites que se adaptam a qualquer tamanho de tela, de desktops a celulares.',
    icon: '📱',
    slug: 'design-responsivo',
    content: `
      O que é Design Responsivo?
      Design Responsivo é uma abordagem no design web que visa criar sites que ofereçam uma ótima experiência de visualização e interação em uma ampla gama de dispositivos (de monitores de desktop a telefones celulares).

      Técnicas Essenciais:
      * Media Queries: Regras CSS que aplicam estilos com base nas características do dispositivo (largura da tela, orientação).
      * Layouts Fluidos: Usar porcentagens e unidades flexíveis em vez de pixels fixos.
      * Imagens Flexíveis: Imagens que se redimensionam proporcionalmente.
      * Mobile-First: Projetar para mobile primeiro, depois adaptar para telas maiores.

      Essencial para a web atual.
    `,
    quiz: {
      title: 'Desafio Design Responsivo',
      questions: [
        {
          question: 'Qual é o objetivo principal do Design Responsivo?',
          options: ['Apenas estilizar cores', 'Criar sites que se adaptam a diferentes tamanhos de tela', 'Fazer sites carregarem mais rápido', 'Otimizar para mecanismos de busca'],
          correctAnswer: 'Criar sites que se adaptam a diferentes tamanhos de tela',
        },
        {
          question: 'Qual técnica CSS é fundamental para o design responsivo?',
          options: ['@keyframes', 'font-family', 'Media Queries', 'text-align'],
          correctAnswer: 'Media Queries',
        },
      ],
    },
  },
];