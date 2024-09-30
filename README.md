# Funções Serveless - ALFAC

Este é um repositório Git que utiliza as configurações anteriormente criadas pelo repositório [https://github.com/ALFAC-Org/food-cloud-infra](https://github.com/ALFAC-Org/food-cloud-infra) para aplicar as configurações faltantes para a provisão de recursos de *funções lambdas* ou *funções serveless*  da aplicação [Fast Food - ALFAC](https://github.com/ALFAC-Org/food). Nele, você encontrará as lambdas que são executadas na aplicação, bem como o fluxo para a atualização destes códigos. No momento, o repositório está focado na Amazon Web Services (AWS), usando as funções lambdas. Entretanto, o repositório é flexível para adaptação para outros provedores de funções serveless.

> [!WARNING]  
> **Para completo funcionamento do sistema, é necessário seguir todo o fluxo de provisionamento: 1. A provisão do repositório de infraestrutura [https://github.com/ALFAC-Org/food-cloud-infra](https://github.com/ALFAC-Org/food-cloud-infra); 2. A provisão do repositório de banco de dados [https://github.com/ALFAC-Org/food-database](https://github.com/ALFAC-Org/food-database); 3. A provisão deste repositório; 4. E por fim, a o provisionamento da aplicação principal, utilizando de todos os recursos anteriormente criados em [https://github.com/ALFAC-Org/food](https://github.com/ALFAC-Org/food)**

![passos-seguir](./docs/passos.png)

## Tutoriais

| Passo | Vídeo |
|-------|-------|
| 0. Introdução geral | [0-INTRODUCAO-GERAL](https://drive.google.com/file/d/1E9v5AYdDJZeDYTBuxv9MxESB194wfX2q/view?usp=drive_link) |
| 1. Introdução aos repositórios | [1-INTRODUCAO-REPOSITORIOS](https://drive.google.com/file/d/1jViIPSCdinQ0Dbvf9VCHRd_qryEZiHdz/view?usp=drive_link) |
| 2. Configuração das variáveis ambiente | [2-CONFIGURACAO-VARIAVEIS](https://drive.google.com/file/d/1QnLUTGbsOQ0hj0cI0CifeCAwBANxmy98/view?usp=drive_link) |
| 3. Provisão da infraestrutura com [https://github.com/ALFAC-Org/food-cloud-infra](https://github.com/ALFAC-Org/food-cloud-infra) | [3-INFRA-PARTE-1](https://drive.google.com/file/d/1J10-wJGOLysgZtSyTtVhfSJG-YrguhAi/view?usp=drive_link) / [3-INFRA-PARTE-2](https://drive.google.com/file/d/1Tzztu_W3Qx5WZdocE49yRNigKO4W1qkz/view?usp=drive_link) |
| 4. Provisão do banco de dados com [https://github.com/ALFAC-Org/food-database](https://github.com/ALFAC-Org/food-database) | [4-DATABASE-PARTE-1](https://drive.google.com/file/d/1FyC0uFHNiWsP8tH7p_mdzSRgtFazag2E/view?usp=drive_link) / [4-DATABASE-PARTE-2](https://drive.google.com/file/d/1TCs5dfF6cqnvYOK5kZ-d5RKUbrv9zruI/view?usp=drive_link) |
| 5. Provisão do lambda com [https://github.com/ALFAC-Org/food-serveless-function](https://github.com/ALFAC-Org/food-serveless-function) | [5-LAMBDA](https://drive.google.com/file/d/1djIEy_YctnqSyXRNUPC45prQ0wwiZjks/view?usp=drive_link) |
| 6. Provisão da aplicação principal com [https://github.com/ALFAC-Org/food](https://github.com/ALFAC-Org/food) | [6-FOOD](https://drive.google.com/file/d/1wHJnIbI-bFn25VH4hmYfrrW0xTxSAfKv/view?usp=drive_link) |
| 7. Demonstrando tudo: API Gateway + Lambda + Load Balancer + EKS junto do fluxo do usuário | [7-FLUXO](https://drive.google.com/file/d/1vJRNaJK86aQIZCpjcT6Hqpxg4Aq9JREv/view?usp=drive_link) |


## Conceito

Toda a infraestrutura é criada no repositório [https://github.com/ALFAC-Org/food-cloud-infra](https://github.com/ALFAC-Org/food-cloud-infra), haja visto que é necessário a obtenção de informações de VPC, API Gateways, grupos de acesso e entre outros. Com isso, este repositório fica responsável por de fato, atualizar o código que será utilizado pela a aplicação.

De modo geral, as lambdas ficarão responsáveis por provisionar a identificação e autenticação do usuário através do CPF dentro da plataforma.

## Como rodar o projeto

- **Via GitHub Actions**


<details>
  <summary>Passo a passo</summary>

1. Acesse [https://github.com/ALFAC-Org/food-serveless/actions](https://github.com/ALFAC-Org/food-serveless/actions) (A guia `Actions` deste repositório);
2. Acesse `Deploy to AWS Lambda`;
3. Clique em `Run workflow` (ou Executar workflow);
4. Aguarde. Se tudo der certo, o `check` verde deverá aparecer - o processo dura em torno de 2 a 5 minutos;
   1. ![infra-criada-sucesso](./docs/serveless-1-sucesso.png)
   2. ![serveless-sucesso](./docs/serveless-sucesso.png)

</details>

### Recursos provisionados

Os seguintes recursos serão criados/atualizados:

- Lambdas: novo código/versão, bem como variáveis ambiente necessárias para estas lambdas.

### Acessando as lambdas

Você saberá que tudo estará bem, quando acessar a aplicação principal [https://github.com/ALFAC-Org/food](https://github.com/ALFAC-Org/food) acessando a url do Load Balancer e então tentando cadastrar ou obter alguma informação do sistema.

Ou então acessando ao console AWS e verificando pelas lambdas criadas.

## Membros

|Membro| Informações |
|--|--|
| Leonardo Fraga | - *RM354771* <br />- *[rm354771@fiap.com.br](mailto:rm354771@fiap.com.br)* <br />- [@LeonardoFraga](https://github.com/LeonardoFraga) |
| Carlos Henrique Carvalho de Santana | - *RM355339* <br />-  *[rm355339@fiap.com.br](mailto:rm355339@fiap.com.br)* <br />- [@carlohcs](https://github.com/carlohcs) |
| Leonardo Alves Campos | - *RM355568* <br />- [rm355568@fiap.com.br](mailto:rm355568@fiap.com.br) <br />- [@lcalves](https://github.com/lcalves) |
| Andre Musolino | -  *RM355582* <br />- *[rm355582@fiap.com.br](mailto:rm355582@fiap.com.br)* <br />- [@amusolino](https://github.com/amusolino) |
