
# Importa as bibliotecas necessárias
import json
import requests

# URL do webhook da plataforma Wix para onde a mensagem será enviada
url = "https://Sua_uri_webhook"
# Payload com os dados que serão enviados para o webhook
data = {
    "id": "ex-00001",
    "cliente": {
        "name": "Jose da Silva",
        "email": "email@test.com",
        "tax_id": "12345678909",
        "Telefone": [
            {
                "country": "55",
                "area": "11",
                "number": "999999999",
                "type": "MOBILE"
            }
        ]
    },
    "texto": 'Olá seja bem vido a Alguns Codigos !'
}

# Transforma o payload em um objeto JSON
json_data = json.dumps(data)

# Envia a mensagem para o webhook da plataforma Wix com o payload em formato JSON
response = requests.post(url, data=json_data, headers={"Content-Type": "application/json"})

# Verifica se a mensagem foi enviada com sucesso e exibe uma mensagem de feedback
if response.status_code == 200:
    print("Mensagem enviada com sucesso!")
else:
    print(f"Erro ao enviar mensagem: {response.status_code}")
