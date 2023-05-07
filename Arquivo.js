import { ok, notFound, serverError } from 'wix-http-functions'; // Cominicata com API
// crie um arquivo "http-functions.js" saiba mais em --> https://www.wix.com/velo/reference/wix-http-functions/introduction

/* Expondo uma API
 Define a função abaixo do webhook, pode usar outros tipos de prefixo_
 use_, post_, get_ , e utros --> https://support.wix.com/en/article/velo-exposing-a-site-api-with-http-functions
 */
export function pref_nomeFUNÇÃO(request) {

    // SEU WEBHOOK --> https://NOME_SITE/_functions/nomeFUNÇÃO_sem_prefixo

    console.log('01 PRIMEIRO REQUESTE', request)

    // a função usa o método "json()" do objeto "body" do request para obter o corpo da mensagem em formato JSON
    request.body.json()
        .then((body) => {
        //Dentro dessa função de retorno de chamada, o código imprime o corpo da mensagem com algumas informações específicas
            console.log('Corpo MSG: ', body)
            console.log('ID: ', body.id)
            console.log('NOME: ', body.cliente)
            console.log('Minha MSG: ', body.texto)

            // Restante do código, pode colocar ate para enviar ao banco de dados

        });
    return ok();
}

// Essa que eu usei para conectar ao Github

export function pref_nomeFUNÇÃO(request) {

    // SEU WEBHOOK --> https://NOME_SITE/_functions/nomeFUNÇÃO_sem_prefixo

    console.log('01 PRIMEIRO REQUESTE', request)

        });
    return ok();
}
