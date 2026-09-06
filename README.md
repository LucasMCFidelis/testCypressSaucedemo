# Testes E2E SauceDemo

Projeto de automação de testes end-to-end (E2E) desenvolvido sobre a aplicação [SauceDemo](https://www.saucedemo.com/), com foco na validação de fluxos críticos do usuário, aplicação de boas práticas de QA e evolução contínua da qualidade dos testes.

Os testes são construídos com **Cypress** e **TypeScript**, seguindo o padrão **Page Object Model (POM)**, com separação de responsabilidades entre os testes e as regras de interação com a interface, além da centralização de seletores e constantes, o que facilita a manutenção e a escalabilidade da suíte.

## Cobertura dos testes

Os testes estão organizados por fluxo/funcionalidade da aplicação:

- **login** — autenticação com sucesso, campos obrigatórios não preenchidos, usuário inexistente, senha incorreta, envio via tecla Enter e exibição de senha
- **catalog** — ordenação de produtos (alfabética e por preço), acesso aos detalhes de um produto, adicionar/remover item ao carrinho e persistência do carrinho após logout
- **buyItem** — validações do carrinho (vazio, retorno para o catálogo) e checkout completo (cancelamento, validação de formulário na 1ª etapa, cálculo do total e finalização de compra na 2ª etapa)
- **navigationMenu** — abertura e fechamento do menu lateral, navegação para "All Items", link de "About" e logout
- **footer** — exibição do rodapé, links de Termos de Serviço e Política de Privacidade e validação dos botões de redes sociais

Durante a execução dos testes, foram identificados comportamentos inesperados da aplicação, reforçando o papel dos testes automatizados na detecção precoce de defeitos e no apoio à regressão. Entre eles:

- Avanço para o checkout com o carrinho vazio
- Aceitação de postal code com valor inválido na primeira etapa do checkout
- Ausência de links funcionais para Termos de Serviço e Política de Privacidade no rodapé

## Estrutura do projeto

```
cypress/
├── e2e/            # Specs de teste
├── pages/          # Page Objects (POM), incluindo componentes reutilizáveis (header, menu, footer)
├── support/        # Constants, factories, utils e configurações do Cypress
└── fixtures/
types/              # Tipagens TypeScript compartilhadas
cypress.config.ts   # Configuração do Cypress (baseUrl e variáveis de ambiente)
```

### Page Object Model (POM)

Todas as páginas herdam de uma `BasePage` abstrata (`cypress/pages/index.ts`), que concentra comportamentos comuns como validação de URL, validação de cookies e validação de mensagens de erro. A partir dela, também existem classes base intermediárias para fluxos com múltiplas páginas relacionadas, como `CatalogBasePage` e `CheckoutBasePage`, aplicando herança para reaproveitar métodos comuns entre as etapas de um mesmo fluxo.

Componentes que aparecem em várias páginas — como `header`, `menu` e `footer` — são modelados como classes próprias dentro de `pages/components`, evitando duplicação de seletores e ações.

### Constants

Os seletores e dados fixos ficam centralizados em `cypress/support/constants`, organizados por domínio (`login`, `catalog`, `checkout`, `cart`, `productDetails` e `global`). Essa centralização evita seletores "hardcoded" espalhados pelas specs e pelos Page Objects, facilitando a manutenção quando a aplicação sofre alterações de layout ou de atributos.

### Factories

As massas de dados usadas nos testes são geradas por funções em `cypress/support/factories` (`user.factory.ts` e `checkout.factory.ts`), como o usuário válido de login (obtido a partir de variáveis de ambiente) e os dados válidos de checkout. Isso mantém os dados de teste desacoplados das specs e reutilizáveis entre diferentes cenários.

## Páginas testadas

- **Login** — `https://www.saucedemo.com/`
- **Catálogo de produtos (inventory)**
- **Detalhes do produto (inventory-item)**
- **Carrinho (cart)**
- **Checkout — 1ª etapa (checkout-step-one)**
- **Checkout — 2ª etapa / overview (checkout-step-two)**
- **Checkout — confirmação (checkout-complete)**
- **Termos de Serviço (terms-service)**
- **Política de Privacidade (privacy-policy)**
- **Menu lateral e rodapé**, como componentes presentes em todas as páginas autenticadas

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm (instalado junto com o Node.js)

## Configurar para execução

Clonar o projeto
```bash
  git clone https://github.com/LucasMCFidelis/testCypressSaucedemo
```
Acessar o diretório do projeto
```bash
  cd testCypressSaucedemo
```
Instalar as dependências do projeto
```bash
  npm install
```
Copiar o arquivo de exemplo das variáveis de ambiente
```bash
  cp .env.example .env
```

## Execução dos testes

Para abrir a interface interativa do Cypress
```bash
  npx cypress open
```
Para executar todas as specs em modo headless
```bash
  npx cypress run
```
Também é possível executar uma spec específica
```bash
  npx cypress run --spec "cypress/e2e/login.cy.ts"
```

## Observações

- O `baseUrl` da aplicação e as variáveis de ambiente (`userNameValid` e `passwordValid`) são configurados em `cypress.config.ts`, a partir do arquivo `.env`.
- O projeto passou por uma refatoração com foco em legibilidade, confiabilidade e redução de flakiness, aplicando POM em todas as páginas e componentes reutilizáveis e reduzindo dependências como esperas explícitas. Como resultado, o tempo de execução caiu quase pela metade e o número de casos de teste foi reduzido em aproximadamente 7%, sem perda relevante de cobertura.