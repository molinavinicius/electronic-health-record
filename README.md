# electronic-health-record

## Description
This repository contains a simple implementation of an Electronic Health Record to manage patients, appointments and health records.

<img src="docs/images/ER Diagram.png" data-canonical-src="docs/images/ER Diagram.png" width="400" height="400" />

Accordingly to the image above, the applicaiton is composed by four data types:
- Patient
- User (health professional)
- Appointment
- Health Record

> Please, take a look at `http://localhost:8080/docs` when you run the application to have a better sense of the available routes for each one.

## Deliverables

### User stories

- [X] **`story`**: Eu, como médico, quero poder cadastrar um paciente com os seguintes dados:
nome, telefone, email, data de nascimento, sexo, altura e peso.
- [X] **`story`**: Eu, como médico, quero poder listar e editar o perfil dos pacientes cadastrados.
- [X] **`story`**: Eu, como médico, quero poder cadastrar um agendamento de consulta para um
paciente.
- [X] **`story`**: Eu, como médico, quero poder listar, alterar e excluir os agendamentos de consulta.
- [X] **`story`**: Eu, como médico, quero poder anotar uma observação durante a consulta.
- [X] **`story`**: Eu, como médico, quero poder visualizar as anotações das consultas dos pacientes.
- [X] **`story [optional]`**: Eu como médico, quero que o sistema valide a minha agenda, não deixando eu
cadastrar mais de um paciente na mesma hora.
- [X] **`story [optional]`**: Eu, como médico, quero poder excluir os dados pessoais do paciente por causa das
novas regras do LGPD, mas mantendo o histórico de consulta por questões de
contabilidade.

### Não funcionais

- [X] **`chore`**: Deve usar o padrão de API REST (HTTP/JSON);
- [X] **`chore`**: Pode ser feito em node.js (javascript ou typescript) ou PHP (laravel);
- [X] **`docs`**: Documentação da interface da API gerada (swagger, open-api, RAML ou postman);
- [X] **`feat`**: Os dados devem ser validados (existência e formatos) na inserção/atualização para
garantir consistência da base;
- [] **`chore`**: Implementar testes unitários e/ou de integração e/ou documentação de testes (casos
de teste / script de teste);
Requisitos desejáveis
- [X] **`docs`**: Documentação da modelagem do banco de dados (diagrama ER ou de classe);
- [X] **`chore`**: Para o banco de dados pode usar MySQL ou PostgreSQL, podendo optar ou não
pelo uso de ORM;
- [X] **`chore`**: Setup de ambiente de desenvolvimento usando docker / docker-compose;
- [] **`infra`**: Hospedar em um ambiente cloud a sua escolha (Heroku, AWS EBS, IBM Cloud, etc)
- [X] **`feat`**: Garantir autenticação e/ou autorização (login/logout, token JWT, roles)
- [X] **`chore`**: Implementar alguma ferramenta de lint ou qualidade (sonar, code-quality, eslint, etc)
- [] **`infra`**: Deploy automatizado via pipeline (gitlab-ci, bitbucket pipeline, github actions, etc)

### Conclusion

This way, you can see that almost all the points are completed, missing only the CI/CD flow with unit testing and hosting.


## How to run
On the root folder of the repo, execute
```bash
docker build . ehr-api
```

Don't forget about the dot (`.`), it's important.

After the image is built, run
```bash
docker run -p 8080:8080 ehr-api
```

With this you'll have your application running.


## How to test it
First of all, create an user for you. The user represents health professionals. To do it, you can use Postman, make a CURL, or use the API Docs, that is beautiful and ready to test. Just access:
`http://localhost:8080`

After you create your user, try to create one or two patients, I'll let some mock data here.

```JSON
[
    {
        "name": "John Doe",
        "phone": "(555) 123-4567",
        "email": "johndoe@example.com",
        "password": "123456",
        "birthDate": "1993-05-28",
        "gender": "male",
        "height": 180,
        "weight": 75
    },
    {
        "name": "Jane Smith",
        "phone": "(555) 987-6543",
        "email": "janesmith@example.com",
        "password": "123456",
        "birthDate": "1992-11-15",
        "gender": "female",
        "height": 165,
        "weight": 65
    },
    {
        "name": "Emily Davis",
        "phone": "(555) 444-3333",
        "email": "emilydavis@example.com",
        "password": "123456",
        "birthDate": "1995-06-30",
        "gender": "female",
        "height": 160,
        "weight": 55
    }
]
```

Yeah, I know what you're, I really should have done a script for seeding the database. That's on me. But it's also fun to make these API calls and see by yourself how it works.

Now, let's move on. To test the application, try to list all the patients, and then try to edit one of them.

After it, try to create a new appointment to the patient. Then, try to create another appointment for another patient at the same time. Hmmm.. you can't! It'll generate time conflicts.

Now that you have an appointment, take its ID, and creates a Health Record. You're almost a doctor now, you have a full calendar, with a good patient base, now you only need to add some records to remember about these consultations in the future.

With patients, appointments and health records on your database, you receive a message from a patient asking to delete all of its data due to privacy issues. Now what???? You still have to do your taxes, send reports to the accountant. Don't worry, I get you covered. You can delete the patient, and all the remaining data will be there for you, less the PII data. 

**(!) important**: if you wrote PII data on the health record evolution or in the appointment note, it won't be deleted. 
<br>
**(!!) important**: When you delete a patient, you won't have any identifier to relate the records and appointments to a person. Ideally, in the future we should keep a hash here, so we can make analysis of appointments per person, even if the person requested to delete their data.