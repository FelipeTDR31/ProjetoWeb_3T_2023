# Projeto Final de Programação 3

### Definição
Em grupos formados por até 4 pessoas, vocês devem desenvolver um sistema que, de alguma forma, será um clone do Tinder. Porém, o que será avaliado pelas pessoas que o utilizarão será de escolha dos grupos. Algumas sugestões são jogos, séries, filmes, artistas, etc. De forma objetiva, o sistema deve apresentar para pessoas logadas itens que devem ser classificados e a classificação deve gerar um ranking.

### Requisitos Funcionais
O sistema deve possuir dois papéis para as pessoas que vão o utilizar com permissões distintas: pessoa usuária e gerente. Abaixo vocês podem conferir quais são as atividades que podem/devem ser realizadas por cada papel.

#### Pessoa usuária
- [ ] Criar e editar informações de pessoa usuária (e-mail, senha, nome)
- [ ] Fazer login e logout no sistema
- [ ] Classificar itens (Indicar se gosta de uma série, se comeria uma comida, etc).
- [ ] Visualizar rankings dos itens classificados como mais queridos
- [ ] Visualizar rankings dos itens classificados como menos queridos
- [ ] Ordenar de forma crescente ou decrescente os rankings de classificações

#### Gerente
- [ ] A pessoa que será gerente deve ser cadastrada no banco previamente (user: admin e password: senha123)
- [ ] Fazer login e logout no sistema
- [ ] Visualizar ranking dos itens classificados
- [ ] Ordenar de forma crescente ou decrescente o ranking de classificações
- [ ] Listar, adicionar, editar e excluir itens

### Regras de negócio
Abaixo são especificadas regras que incidem sobre o usuo do sistema:
- [ ] A pessoa usuária não pode alterar seu e-mail
- [ ] O e-mail da pessoa usuária deve ser do domínio @aluno.feliz.ifrs.edu.br
- [ ] Um item consiste em uma imagem de algo
- [ ] O ranking deve ser ordenado pelo número de avaliações positivas ou negativas
- [ ] O sistema deve iniciar com pelo menos 15 itens cadastrados
- [ ] Uma pessoa só pode votar uma vez em cada item

### Instruções fundamentais
- A entrega do projeto será realizada via repositório do github.
- Uma pessoa do grupo (que é quem fará a entrega) deve criar um fork deste repositório para a entrega
- As funcionalidades e regras implementadas devem aparecer no readme do repositório com um checked (basta incluir [x])
- No readme do projeto deve aparecer o nome das pessoas do grupo e uma breve descrição da temática escolhida

### Cronograma
- 26/10 - Esquema do banco de dados
- 16/11 - Apresentação do papel Gerente (todas as funcionalidades, regras e design) (Peso 10)
- 07/12 - Apresentação do papel Pessoa usuária (todas as funcionalidades, regras e design) (Peso 10)
- 14/12 - Reavaliação do sistema a partir das avaliações anteriores

### Avaliação
- As apresentações serão realizadas para o professor
- Ainda que o trabalho seja do grupo, a avaliação será individual
- Cada apresentação resultará em uma nota da N3
- O sistema será avaliado nos seguintes critérios:
  - Implementação dos requisitos funcionais e regras de negócio (6 pontos)
  - Design (4 pontos)
