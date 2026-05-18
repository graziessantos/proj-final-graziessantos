from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_register_usuario():
    response = client.post("/auth/register", json={
        "nome": "Usuario Teste",
        "email": "usuario_teste@email.com",
        "senha": "123456"
    })
    assert response.status_code == 200
    assert response.json()["message"] == "Usuário criado com sucesso"

def test_login_usuario():
    response = client.post("/auth/login", json={
        "email": "usuario_teste@email.com",
        "senha": "123456"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_senha_errada():
    response = client.post("/auth/login", json={
        "email": "usuario_teste@email.com",
        "senha": "senha_errada"
    })
    assert response.status_code == 401

def test_criar_diary():
    response = client.post("/api/diary", json={
        "user_id": 1,
        "conteudo": "Teste de diário",
        "humor": "feliz"
    })
    assert response.status_code == 200

def test_listar_diary():
    response = client.get("/api/diary")
    assert response.status_code == 200
    assert isinstance(response.json(), list)