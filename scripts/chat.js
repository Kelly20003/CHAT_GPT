
document.getElementById('enviar').onclick = async function () {
    let ul = document.getElementById('msg_list');
    let li = document.createElement('li');
    let caixa_texto = document.getElementById('text_area');
    let msg_send = caixa_texto.value;
    let resposta = null;

    // Limpando lista.
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    li.innerHTML = msg_send;
    ul.appendChild(li);

    resposta = await postToAPI(msg_send);
    li = document.createElement('li');
    li.innerHTML = resposta;
    li.style.color = "blue";
    ul.appendChild(li);

    caixa_texto.value = "";
};

async function postToAPI(prompt) {
    let saida = null;
    let saida_json = null;
    let choices = null;
    let retorno = "";

    saida = await fetch('https://api.openai.com/v1/completions', {
        method: 'post',
        headers: new Headers({
            'Authorization': "Bearer ",
            'Content-Type': "application/json"
        }),
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 1,
            max_tokens: 2000
        })
    })

    saida_json = await saida.json();
    choices = saida_json.choices;
    retorno = choices[0].text;

    return retorno;
  };

  document.onkeydown = function pressionarEnter(e) {
    if (e.keyCode == 13) {  // Se o código da tecla pressionada for 13 (Enter)
       document.getElementById("enviar").click(); // Pressionar o botão Enviar
    }
 }