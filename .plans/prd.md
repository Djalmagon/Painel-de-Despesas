# PRD — Painel de Despesas

## 1. Visão geral

Criar uma aplicação web simples para registrar despesas e acompanhar o total gasto, tanto no geral quanto por categoria. A aplicação será um projeto front-end em Vite com TypeScript vanilla, sem backend e sem persistência de dados.

## 2. Objetivo

Permitir que a pessoa usuária registre despesas e consulte, em uma única tela, a lista de lançamentos e seus totais agregados.

## 3. Escopo

### Incluído

- Formulário para adicionar uma despesa.
- Lista das despesas adicionadas durante a sessão atual.
- Total de todas as despesas.
- Total de despesas agrupadas por categoria.
- Interface organizada em painel com sidebar e área principal.

### Fora do escopo

- Persistência em banco de dados, API, `localStorage` ou outro mecanismo.
- Autenticação ou múltiplos usuários.
- Edição, remoção, busca ou filtragem de despesas.
- Gráficos, exportação ou relatórios históricos.

Os dados existem somente em memória enquanto a aplicação está aberta e são perdidos ao recarregar ou fechar a página.

## 4. Requisitos funcionais

### RF-01 — Adicionar despesa

- Exibir um card com formulário para cadastrar uma despesa.
- Solicitar título, valor e categoria.
- Ao enviar dados válidos, criar e exibir uma nova despesa na lista sem recarregar a página.
- Cada despesa deve receber um identificador string único.
- Após o cadastro, atualizar os totais geral e por categoria.
- A estrutura da aplicação e os elementos-base da tela devem estar declarados no HTML; o TypeScript atualiza os dados exibidos nos elementos correspondentes.
- Apresentar os valores monetários em reais (BRL), formatados para a localidade `pt-BR` pela função reutilizável definida nos requisitos técnicos.

### RF-02 — Validar dados

- O título é obrigatório e não pode conter apenas espaços.
- O valor deve ser numérico, finito e maior que zero.
- A categoria deve ser uma das opções fixas do projeto.
- Toda a interface, inclusive mensagens de validação e feedback, deve estar em português.
- Em caso de dados inválidos, não adicionar a despesa e apresentar orientação em português junto ao formulário.

### RF-03 — Listar despesas

- Exibir abaixo do formulário todas as despesas cadastradas na sessão.
- Para cada item, mostrar título, valor e categoria.
- Quando ainda não houver despesas, exibir um estado vazio informativo.

### RF-04 — Mostrar resumo

- Exibir na sidebar o total de todas as despesas.
- Exibir na sidebar o total individual para cada categoria, inclusive categorias sem despesas (total zero).
- Recalcular e refletir os totais após cada cadastro.

### RF-05 — Categorias

As categorias são fixas e devem ser apresentadas nesta ordem:

1. Alimentos
2. Transporte
3. Lazer
4. Saúde
5. Outros

## 5. Requisitos visuais e de interação

- Usar uma estética tecnológica e moderna, com interface visualmente avançada e refinada, mantendo implementação simples.
- Aplicar tema escuro com fundo preto e ciano/neon como cor de destaque.
- Usar cards com bordas finas, cantos arredondados e brilho sutil.
- Usar fonte monoespaçada para valores e números e uma fonte limpa e legível para os demais textos.
- A tela deve ter uma sidebar à esquerda com o resumo financeiro e dar destaque visual, com tamanho maior, ao total geral.
- A área principal deve conter o card de cadastro e, abaixo dele, a lista de despesas.
- A hierarquia visual deve distinguir claramente o total geral, os totais por categoria, o formulário e os lançamentos.
- O formulário deve apresentar rótulos explícitos para título, valor e categoria, além de uma ação clara para adicionar a despesa.
- Aplicar transições suaves às interações dos botões e dos itens da lista.
- Em telas estreitas, empilhar a sidebar e a área principal, mantendo a interface legível e utilizável.
- Definir cores como variáveis CSS em `:root`, facilitando a troca da paleta.
- Campos, botões, mensagens de validação e estado vazio devem manter legibilidade e identificação clara.

## 6. Requisitos técnicos

- Usar Vite com HTML, CSS e TypeScript vanilla, sem framework de UI.
- Implementar os estilos com CSS puro, sem bibliotecas de estilo ou frameworks.
- Declarar diretamente no `index.html` a estrutura estática completa da tela: sidebar e resumos, formulário, lista, estado vazio e regiões de feedback.
- Manter os tipos de domínio em `src/types.ts`.
- Definir em português todo o texto da interface e nomear em português os campos do tipo `Despesa`, com o seguinte formato:
  - `id: string`
  - `titulo: string`
  - `valor: number`
  - `categoria: Categoria`, restrita às cinco opções fixas.
- Definir o tipo `Categoria` em português e restringi-lo às cinco opções fixas.
- Formatar todos os valores monetários apresentados no formulário, na lista e na sidebar em BRL para `pt-BR`, usando `Intl.NumberFormat` por meio de uma única função reutilizável.
- Registrar todos os eventos e interações no TypeScript; não usar handlers inline no HTML.
- Manter o TypeScript focado na lógica e manipulação dos dados: validar entradas, manter a lista em memória, calcular totais e atualizar os elementos existentes da página.
- Não montar ou substituir a estrutura completa da aplicação por meio de `innerHTML` no `#app`. Para exibir despesas adicionadas dinamicamente, o TypeScript pode inserir ou atualizar somente os itens da lista dentro do contêiner já declarado no HTML.
- Manter os dados em memória durante a sessão, sem implementar persistência.
- Definir as cores da interface como variáveis CSS em `:root`.
- Preferir lógica simples, legível e de fácil manutenção.
- Separar a estrutura HTML, os estilos CSS e a lógica TypeScript conforme o padrão do projeto, mantendo o HTML como fonte da estrutura da página.

## 7. Critérios de aceite

1. A aplicação inicia pelo Vite sem erros de compilação de TypeScript.
2. O formulário permite cadastrar uma despesa válida sem recarregar a página.
3. O título vazio, o valor inválido ou não positivo e a categoria fora das opções impedem o cadastro e geram feedback visível em português.
4. Cada despesa cadastrada aparece na lista com título, valor e categoria.
5. Os valores exibidos no formulário, na lista e na sidebar são formatados em BRL para `pt-BR` por meio de uma única função reutilizável baseada em `Intl.NumberFormat`.
6. A sidebar apresenta o total geral e os totais das cinco categorias, atualizados após cada cadastro, com o total geral em destaque visual.
7. Categorias sem lançamentos apresentam total zero.
8. Uma sessão sem despesas apresenta um estado vazio; recarregar a página inicia sem os lançamentos anteriores.
9. A estrutura principal da tela está declarada no HTML, incluindo os contêineres usados para lista, resumos e feedback.
10. O TypeScript não usa `innerHTML` para montar ou substituir a aplicação inteira em `#app`; atualiza os valores e os itens dinâmicos nos contêineres existentes.
11. Não há eventos de interação declarados inline no HTML.
12. Os tipos `Despesa` e de categoria ficam definidos em `src/types.ts`, com os campos nomeados em português (`id`, `titulo`, `valor`, `categoria`).
13. A apresentação usa tema escuro azul-marinho, destaque ciano/neon, cards com bordas finas e cantos arredondados, brilho sutil, números monoespaçados e transições suaves.
14. As cores são definidas em variáveis CSS no `:root`.
15. Em telas estreitas, a sidebar empilha com a área principal e a interface permanece legível e utilizável.

## 8. Premissas e pontos a confirmar

- Não foi definido um limite máximo de caracteres para o título da despesa.
