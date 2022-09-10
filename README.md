# <p align = "center"> DrivenPass </p>

#### <p align = "center" style="color:red" > Desenvolvido apenas o back-end </p>
##
<div align = "center" >
    <img src="https://user-images.githubusercontent.com/71466468/189504187-c032a475-56f0-4105-ab91-22d73bc57b99.png" width="300px" />
    <img src="https://user-images.githubusercontent.com/71466468/189504191-34cd5b8a-8f85-40e2-ba55-6073a3c4f429.png" width="300px" />
    <img src="https://user-images.githubusercontent.com/71466468/189504197-2466a9a7-505d-4bcb-997c-d926ab6f66c3.png" width="300px" />
    <img src="https://user-images.githubusercontent.com/71466468/189504200-fcd6ca0d-3c06-4ba4-9d32-a48476fd29d6.png" width="300px" />
    <img src="https://user-images.githubusercontent.com/71466468/189504204-de227eb6-fde3-41df-baf7-1fcf5b684d18.png" width="300px" />
    <img src="https://user-images.githubusercontent.com/71466468/189504208-cd658ab5-29ed-49bd-a591-8eca78ad10d4.png" width="300px" />
</div>

***

##  :clipboard: Descrição

- Navegar na internet pode ser uma atividade muito divertida, mas ao mesmo tempo, muito perigosa. Inúmeros estudos e levantamentos (nacionais e internacionais) mostram que o número de golpes virtuais não para de crescer. O que levanta a questão: como nos proteger?
- Existem várias formas diferentes de se proteger. Tudo começa com o uso de senhas diferentes e seguras. Para uma senha ser segura, ela deve conter vários caracteres e números misturados, sem contar que o quanto mais longa ela for, melhor.
- *Só que como vamos memorizar senhas gigantes e sem significado semântico?* É para resolver essa dor que os gerenciadores de senhas surgiram! Com eles, criamos apenas uma senha “mestra” e todas as outras senhas ficam gravadas em segredo! Logo, quando precisamos dela, basta lembrar da senha “mestra”!
- Neste projeto, fiquei responsável por desenvolver a DrivenPass, um gerenciador de senhas!

***

## :computer:	 Tecnologias e Conceitos

- Node.js
- TypeScript
- JWT
- Postgresql com Prisma ORM
- Arquitetura em camadas

***

## 🏁 Rodando a aplicação

1. Primeiro, faça o clone desse repositório na sua maquina:
```
    git clone https://github.com/gabrzeoN/driven-pass.git
    ou
    git clone git@github.com:gabrzeoN/driven-pass.git
```

2. Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias
```
    npm install
```

3. Configure o arquivo **.env** com base no arquivo **.env.example**

4. Gere o banco de dados postgres junto com suas tabelas através do prisma
```
    npx prisma migrate dev
```

5. Finalizado o processo, é só inicializar o servidor
```
npm run dev
```
