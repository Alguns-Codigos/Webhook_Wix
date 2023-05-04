import wixData from 'wix-data';
import { fetch } from 'wix-fetch'; // Importando o fetch correto
import { ok, notFound, serverError } from 'wix-http-functions'; // Cominicata com API
import { chaveToken } from 'backend/Segredos.js';
import { emailCredencial } from 'backend/Segredos.js';

//   https://www.pontooxigenado.online/_functions/pagseguro

// temos 3 opções aqui post_. get_ e use_
export async function use_pagseguro(request) {
    try {
        const token = await chaveToken();
        const email = emailCredencial()
        const body = await request.body.json();

        console.log('request*****************************',request)
        console.log('body*****************************',body)

        try {
            if (request.body.notificationCode) {
                const notificationCode = request.body.notificationCode;
                const credenciais = `?email=${email}&token=${token}`;
                //https://ws.pagseguro.uol.com.br/v3/transactions/notifications/{{codigo-notificacao}}?{{credenciais}} acho que para produção
                const url_Notificar = `https://ws.sandbox.pagseguro.uol.com.br/v3/transactions/notifications/${notificationCode}${credenciais}`;

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };
                const settings = {
                    method: 'GET',
                    headers
                };
                try {
                    const fetchResponse = await fetch(url_Notificar, settings);
                    const responseJson = await fetchResponse.json()
                    .then(response => {
                            if (response.ok) {
                                return response.text();
                            }
                            throw new Error('Network response was not ok.');
                        })
                        .then(responseText => {
                            console.log(responseText);
                            return responseText;
                        })
                        .catch(error => {
                            console.error('There was a problem with the fetch operation:', error);
                        });

                } catch (error) {
                    console.log("error: " + error.toString());
                    console.log(error.stack);
                    return error;
                }
            } else {
                const ID_PAGAMENTO = body.id;
                const REFERENCIA_ID = body.reference_id;
                const NOME = body.customer.name;
                const CPF = body.customer.tax_id;
                const VALOR = body.items[0].unit_amount;
                const STATUS_PAGAMENTO = body.links[1].rel;

                console.log('CONFIRMAÇÃO DE PAGAMENTO nome: ', NOME);
                console.log('CONFIRMAÇÃO DE PAGAMENTO tax_id: ', CPF);
                console.log('CONFIRMAÇÃO DE PAGAMENTO id DE Pagamento: ', ID_PAGAMENTO);
                console.log('CONFIRMAÇÃO DE PAGAMENTO reference_id: ', REFERENCIA_ID);
                console.log('CONFIRMAÇÃO DE PAGAMENTO foi pago: ', STATUS_PAGAMENTO);
                console.log('CONFIRMAÇÃO DE PAGAMENTO valor: ', VALOR);

                let toData = {
                    "idUsuario": REFERENCIA_ID,
                    "nome": NOME,
                    "cpf": CPF,
                    "Id Transacao": ID_PAGAMENTO,
                    "depOuSac": 'Deposito',
                    "status": STATUS_PAGAMENTO,
                    "ValorDeposito": VALOR
                };

                const data = await wixData.insert("Bancas", toData);
                console.log('TRANSAÇÃO SALVA EM BANCO DE DADOS Bancas: ', data);
                console.log("🔩 *********************** id DE Pagamento para atualizar MEMBROS: ", ID_PAGAMENTO);

                return { statusCode: 200 };
            }
        } catch (error) {
            console.log('Erro ao fazer o parse do JSON:', error);
            return serverError();
        }
    } catch (error) {
        console.log(error);
        return { statusCode: 500, body: error.toString() };
    }
}

export function use_github(request) {
    console.log(request);
    const body = request.body.json();
    console.log(body);
    console.log('Henrique Liandro da Silva');
    return ok();

    //   https://www.pontooxigenado.online/_functions/github
}