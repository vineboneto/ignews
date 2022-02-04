## Estudo Next.js

> Client-Side

- Recomendado para utilização em que chamadas são realizadas após a pagina ter sido renderizada, utiliza um processamento menor
- **Casos de uso**:
  - Chamadas api após a pagina ser renderizada

> Server-Side (SSR)

- Recomendado para utilização em que chamadas api api devem ser realizadas antes da renderização da pagina, utiliza de um processamento maior.
- **Casos de uso**
  - Principalmente para motivos de indexação para motores de busca
  - Para que os dados da api estejam disponíveis assim que a tela ser renderizada
  - Para dados dinâmicos em tempo real
- **Função next**
  - `getServerSideProps`: Realiza uma chamada api no servidor next, antes da tela ser renderizada

> Static Site Generation (SSG)

- Cria uma pagina estática HTML para ser utilizada como cache, maior performance.
- **Casos de uso**
  - Chamadas a api custosa
  - Dados que persistem por muito tempo
- **Função next**
  - `getStaticProps`: Cria uma pagina estática HTML com um tempo de duração, que servira a todos os usuários de forma rápida performática

### API_ROUTES

- Utilizam o conceito serverless, instância um processo para executar uma função e então encerra o processo

### Variáveis de ambiente

- Variáveis de ambiente no next só ficam disponíveis em `API_ROUTES` ou nós métodos `getStaticProps` ou `getServerSideProps`, ou seja no lado so servidor next

### Autenticação

- JWT (Storage), depende de um backend
- Next Auth (Login Social), não depende de um backend
- Cognito, Auth0
