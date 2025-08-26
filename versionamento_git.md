# Versionamento de projeto

### Criar branch

1. Ir para a branch master

   `git checkout master`

2. Já na master, para evitar conflitos, obrigatoriamente, sempre atualize a master

   `git pull`

3. Crie uma branch que herda o conteúdo da branch master

   - _numero da issue_, se trata do numero gerado pelo GitLab que numera a issue. Geralmente acompanhado por uma hashtag
   - _label_, pode significar o tipo ou o estado da branch. No momento de checkout, apenas o tipo é relevante (feat, refactor, fix)

   `git checkout -b <numero da issue>/<label>`

4. Para conferir se realmente está na branch que acabou de criar

   `git branch`

### Mandar branch para o repositório

1. Para commitar o código ao término das atividades
2. É usado o git commit msg linter para padronizar os commits

   `git commit -m "scope: mensagem"`

3. Para mandar a branch com os commits para o repositório

   `git push`
