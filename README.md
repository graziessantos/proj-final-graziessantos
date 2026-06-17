# MindMoor

Backend do sistema MindMoor, uma aplicação de saúde mental que permite aos usuários registrar humor diário, medicações, sessões terapêuticas e conquistas.

## Tecnologias utilizadas

- Python 3.11
- FastAPI
- SQLAlchemy (ORM)
- PostgreSQL (via Docker)
- JWT para autenticação
- bcrypt para criptografia de senhas
- Pytest para testes automatizados

## Estrutura do projeto

```
mindmoor-backend-python/
├── app/
│   ├── api/
│   │   ├── auth.py          # Rotas de autenticação
│   │   └── routes.py        # Rotas do CRUD
│   ├── application/
│   │   ├── diary_service.py        # Regras de negócio do diário
│   │   ├── medication_service.py   # Regras de negócio de medicações
│   │   ├── session_service.py      # Regras de negócio de sessões
│   │   └── milestone_service.py    # Regras de negócio de conquistas
│   ├── domain/
│   │   └── models.py        # Entidades do sistema
│   └── infrastructure/
│       ├── database.py      # Configuração do banco de dados
│       └── repositories.py  # Repositórios (operações no banco)
├── tests/
│   └── test_api.py          # Testes automatizados
├── main.py                  # Ponto de entrada da aplicação
├── Dockerfile               # Configuração do container
├── docker-compose.yml       # Orquestração dos containers
├── requirements.txt         # Dependências do projeto
└── README.md
```

## Como rodar com Docker

### Pré-requisitos

- Docker instalado e rodando

### Passo a passo

1. Clone o repositório:
```bash
git clone <https://github.com/graziessantos/proj-final-graziessantos.git>
cd mindmoor-backend-python
```

2. Suba os containers:
```bash
docker-compose up
```

3. Acesse a documentação em: http://127.0.0.1:8000/docs

> O Docker sobe automaticamente o backend e o banco de dados PostgreSQL. Não é necessário instalar Python ou dependências manualmente.

## Como rodar os testes

Com a venv ativa:
```bash
python -m pytest tests/test_api.py -v
```

## Endpoints disponíveis

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/register` | Cadastrar usuário |
| POST | `/auth/login` | Login e geração de token JWT |

### Diário
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/diary` | Listar entradas |
| GET | `/api/diary/{id}` | Buscar entrada por id |
| POST | `/api/diary` | Criar entrada |
| PUT | `/api/diary/{id}` | Atualizar entrada |
| DELETE | `/api/diary/{id}` | Deletar entrada |

### Medicações
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/medications` | Listar medicações |
| POST | `/api/medications` | Criar medicação |
| PUT | `/api/medications/{id}` | Atualizar medicação |
| DELETE | `/api/medications/{id}` | Deletar medicação |

### Sessões terapêuticas
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/sessions` | Listar sessões |
| POST | `/api/sessions` | Criar sessão |
| PUT | `/api/sessions/{id}` | Atualizar sessão |
| DELETE | `/api/sessions/{id}` | Deletar sessão |

### Conquistas
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/milestones` | Listar conquistas |
| POST | `/api/milestones` | Criar conquista |
| PUT | `/api/milestones/{id}` | Atualizar conquista |
| DELETE | `/api/milestones/{id}` | Deletar conquista |

## Arquitetura

O projeto segue os princípios da **Clean Architecture**, dividido em camadas:

- **domain** — entidades do banco de dados (User, DiaryEntry, Medication, TherapySession, Milestone)
- **infrastructure** — conexão com o banco e repositórios (operações CRUD)
- **application** — regras de negócio e validações
- **api** — rotas e endpoints expostos ao frontend

## Autores

- Beatriz Dezotti
- Grazielle Santana
