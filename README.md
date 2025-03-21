Sistema de Gerenciamento de Processos Jurídicos:

Este projeto é uma aplicação web de gerenciamento de processos jurídicos, permitindo que procuradores e clientes interajam com processos de acordo com suas permissões. O sistema foi desenvolvido utilizando C# no back-end, MySQL para o banco de dados e React.js para o front-end.

Tecnologias Utilizadas:

Back-End (C# e MySQL)
C# (ASP.NET Core): Framework para construir APIs RESTful no servidor.
Entity Framework (EF Core): ORM (Object-Relational Mapper) para facilitar a interação com o banco de dados MySQL.
MySQL: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar informações sobre processos, usuários e clientes.
JWT (JSON Web Tokens): Para autenticação de usuários e geração de tokens.
Bcrypt.Net: Biblioteca para criptografar senhas dos usuários.
Cors: Middleware para permitir solicitações de origens diferentes.
Swashbuckle/Swagger: Para documentação automática da API e interação com o usuário.
Front-End (React.js)
React.js: Framework JavaScript para construção de interfaces de usuário interativas.
React Router DOM: Para gerenciamento de rotas no front-end.
Axios: Cliente HTTP para fazer requisições à API.
CSS/Styled Components: Estilização personalizada para o layout.
Design
Figma: Ferramenta usada para criar o protótipo de alta fidelidade da interface do usuário.
Testes
Postman: Usado para testar e validar as rotas da API.
Como Configurar
1. Clonar o Repositório
Clone este repositório para o seu ambiente local:
bash:
git clone https://github.com/seu-usuario/projeto-gestao-processos.git

2. Configurar o Back-End
Instalar as dependências do C# e configurar o banco MySQL:

Instale o MySQL na sua máquina, se ainda não o tiver instalado.
Crie o banco de dados no MySQL com as tabelas adequadas para armazenar as informações de usuários, processos, e clientes.
Conectar o back-end ao MySQL: No arquivo appsettings.json, adicione a string de conexão para o MySQL:

json:
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=SistemaProcessos;User=root;Password=senha;"
  }
}

Instalar pacotes NuGet:
Microsoft.EntityFrameworkCore
Pomelo.EntityFrameworkCore.MySql (para MySQL)
Microsoft.AspNetCore.Cors
Swashbuckle.AspNetCore (para Swagger)
System.IdentityModel.Tokens.Jwt (para JWT)
Execute o seguinte comando no seu terminal para instalar essas dependências:

bash:
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Pomelo.EntityFrameworkCore.MySql
dotnet add package Swashbuckle.AspNetCore
dotnet add package System.IdentityModel.Tokens.Jwt
dotnet add package Bcrypt.Net-Next

Iniciar o back-end:
Compile e inicie o projeto C# utilizando o comando:
bash:
dotnet build
dotnet run

3. Configurar o Front-End:
Instalar dependências no front-end:
Navegue até a pasta do front-end e execute o seguinte comando:
bash:
npm install

Configurar as requisições HTTP no React:
No arquivo de configurações do front-end, como src/api.js, configure o Axios para se comunicar com a API C#:

javascript:
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // URL da sua API C#
});
export default api;


4. Protótipo no Figma:
O protótipo da interface da aplicação foi criado no Figma. Você pode acessá-lo através do link:
https://www.figma.com/design/nluniJ6Y9UuweXIa6MDXtr/Prova--Front-end

Documentação API (C#):
1. Registro de Usuário
POST /register
Registra um novo usuário (cliente ou procurador).

json:
{
  "nome": "John Doe",
  "email": "johndoe@example.com",
  "senha": "12345",
  "role": "cliente"
}

2. Login de Usuário:
POST /login
Realiza o login do usuário e retorna um token JWT.

json:
{
  "email": "johndoe@example.com",
  "senha": "12345"
}

3. Gerenciamento de Processos:
POST /processos
Cria um novo processo. Apenas procuradores podem criar processos.

json:
{
  "numero": "12345",
  "nome": "Processo de Exemplo",
  "assunto": "Assunto do processo",
  "status": "Em andamento",
  "descricao": "Descrição detalhada do processo",
  "data_inicio": "2025-01-01",
  "data_fim": "2025-12-31",
  "cliente_id": 1
}

GET /processos
Lista os processos do usuário logado (clientes ou procuradores).

GET /processos/{id}
Obtém os detalhes de um processo específico. Acesso restrito para clientes ou procuradores associados ao processo.

PUT /processos/{id}
Atualiza um processo. Apenas o procurador que criou o processo pode editá-lo.

json:
{
  "nome": "Processo Atualizado",
  "descricao": "Descrição atualizada do processo",
  "data_inicio": "2025-01-01",
  "data_fim": "2025-12-31",
  "cliente_id": 1
}

DELETE /processos/{id}
Exclui um processo. Apenas o procurador que criou o processo pode excluí-lo.

Middleware de Autenticação e Autorização
authenticateToken (Middleware)
Esse middleware é usado para autenticar as requisições usando o JWT. Ele verifica se o token enviado no cabeçalho da requisição é válido.

Funcionamento: O token é esperado no cabeçalho Authorization da requisição:

text:
Authorization: Bearer {token}
Se o token for válido, o usuário será autenticado e poderá acessar as rotas protegidas. Caso contrário, a requisição será negada.

authorizeRole (Middleware)
Esse middleware é usado para verificar se o usuário tem a permissão necessária para acessar a rota, com base no seu papel (role).

Considerações Finais
Essa documentação descreve as rotas essenciais da API de gerenciamento de processos jurídicos. Ela utiliza autenticação JWT para garantir que apenas usuários autenticados possam acessar os dados, e também faz uso de permissões para garantir que apenas os usuários apropriados possam criar, editar e excluir processos.

A API foi desenvolvida com o objetivo de permitir que tanto clientes quanto procuradores interajam com os processos de forma controlada, garantindo que cada ação tenha o nível de permissão adequado.

A documentação da API pode ser acessada usando o Swagger no endpoint /api-docs do servidor.

Funcionalidades Extras a Serem Implementadas
Criptografia com Bcrypt.Net para senhas.
Filtros de pesquisa de processos.
Funcionalidade de distribuição de processos para outros procuradores.
Anexar ou desanexar documentos aos processos.
Consultar e visualizar processos de outros procuradores.



![Diagrama de Entidade Relacionamento](imagens/Diagrama%20de%20entidade%20Relacionamento.drawio.png)

