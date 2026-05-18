# MindMoor API

Backend do sistema MindMoor, uma aplicação de saúde mental que permite aos usuários registrar humor diário, medicações, sessões terapêuticas e conquistas.

## Tecnologias utilizadas

- Python 3.11
- FastAPI
- SQLAlchemy (ORM)
- SQLite (desenvolvimento)
- PostgreSQL (produção via Docker)
- JWT para autenticação
- Pytest para testes automatizados

## Estrutura do projeto

mindmoor-backend-python/
├── app/
│   ├── api/
│   │   ├── auth.py        # Rotas de autenticação
│   │   └── routes.py      # Rotas do CRUD
│   ├── domain/
│   │   └── models.py      # Entidades do sistema
│   ├── infrastructure/
│   │   ├── database.py    # Configuração do banco
│   │   └── repositories.py # Repositórios
├── tests/
│   └── test_api.py        # Testes automatizados
├── main.py                # Ponto de entrada
└── README.md

## Como rodar localmente

### Pré-requisitos
- Python 3.11 instalado
- pip

### Passo a passo

1. Clone o repositório
2. Entre na pasta do backend
```bash
cd mindmoor-backend-python
```

3. Crie e ative o ambiente virtual
```bash
python -m venv venv
venv\Scripts\activate.bat
```

4. Instale as dependências
```bash
pip install fastapi uvicorn sqlalchemy python-jose passlib bcrypt pytest httpx
```

5. Rode o servidor
```bash
uvicorn main:app --reload
```

6. Acesse a documentação em http://127.0.0.1:8000/docs

## Como rodar com Docker

1. Certifique-se de ter Docker instalado
2. Na pasta do projeto rode:
```bash
docker-compose up
```

## Como rodar os testes

```bash
python -m pytest tests/test_api.py -v
```

## Endpoints disponíveis

### Autenticação
- `POST /auth/register` — Cadastrar usuário
- `POST /auth/login` — Login e geração de token JWT

### Diário
- `GET /api/diary` — Listar entradas
- `GET /api/diary/{id}` — Buscar entrada por id
- `POST /api/diary` — Criar entrada
- `DELETE /api/diary/{id}` — Deletar entrada

### Medicações
- `GET /api/medications` — Listar medicações
- `POST /api/medications` — Criar medicação
- `DELETE /api/medications/{id}` — Deletar medicação

### Sessões terapêuticas
- `GET /api/sessions` — Listar sessões
- `POST /api/sessions` — Criar sessão
- `DELETE /api/sessions/{id}` — Deletar sessão

### Conquistas
- `GET /api/milestones` — Listar conquistas
- `POST /api/milestones` — Criar conquista
- `DELETE /api/milestones/{id}` — Deletar conquista

## Autores

- Beatriz Dezotti
- Grazielle Santana