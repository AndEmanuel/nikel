const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout); // Acessa a minha classe button-logout no meu home.html adicionando o evento de clique no momento em que eu clicar sobre "Sair" na minha página, chamando a minha função logout abaixo.
document.getElementById("transactions-button").addEventListener("click", function () {
    window.location.href = "transactions.html";
});
//ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value); // Transformação de um valor Float, ou seja, um número que possa ter virgula.
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });
    //Diferente do push que adiciona no final da lista o unshift adiciona por cima os elementos.
    saveDate(data);
    e.target.reset(); //Limpa todos os campos do formulário, após salvar um lançamento.
    myModal.hide(); // Função que fechará a modal no momento em que condluída a criação da conta.

    getCashIn();
    getCashOut();
    getTotal();

    alert("Lançamento adicionado com sucesso.");
});

checkLogged();

function checkLogged() {
    if (session) {   //Há um usuário salvo no localStorage? Se sim.
        sessionStorage.setItem("logged", session);  //Seta quem está salvo na minha sessão.
        logged = session;
    }
    if (!logged) {    //Se  não existir alguém logado

        window.location.href = "index.html"; //Então redireciono para a tela index.html.
        return;
    }

    const dataUser = localStorage.getItem(logged);  //Pega os dados do usuário logado e salva na variável dataUser.
    if (dataUser) {   //Se tem dados do usuário logado
        data = JSON.parse(dataUser) //Salvo em data o que eu encontrei no meu localStorage, convertendo o mesmo para objeto, por meio do JSON
    }
    getCashIn();
    getCashOut();
    getTotal();
}

function logout() {
    sessionStorage.removeItem("logged"); //Remove o item logged da minha sessionStorage.
    localStorage.removeItem("session"); //Remove o item session que é o checkbox que mantém o usuário sempre logado

    window.location.href = "index.html"; //Tag redireciona para a minha página index.html
}

function getCashIn() {
    const transactions = data.transactions; //Coleta todas as transações

    const cashIn = transactions.filter((item) => item.type === "1");      //Percorre o Array para filtrar os itens do tipo 1;

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if (cashIn.length > 5) {    //Caso usuário tenha mais de 5 lançamentos.
            limit = 5;              // O limite será somente 5.
        } else {
            limit = cashIn.length; // Caso tenha menos que 5 lançamentos, então será mostrado os lançamentos que tem.
        }
        for (let index = 0; index < limit; index++) {    // Executa até o limite, tudo o que estiver dentro do escopo.
            cashInHtml += `
            <div class="row mb-4"> <!-- Margin button = mb -->
                                        <div class="col-12">
                                            <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                                            <div class="container p-0"></div>
                                            <div class="row">
                                                <div class="col-12 col-md-8">
                                                    <p>${cashIn[index].description}</p>
                                                </div>
                                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                                    ${cashIn[index].date}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            `
        }

        document.getElementById("cash-in-list").innerHTML = cashInHtml; // pega o HTML que você criou com JavaScript e coloca dentro da div cash-in-list para mostrar as entradas de dinheiro na tela.
    }
}
function getCashOut() {
    const transactions = data.transactions; //Coleta todas as transações

    const cashIn = transactions.filter((item) => item.type === "2");      //Percorre o Array para filtrar os itens do tipo 1;

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if (cashIn.length > 5) {    //Caso usuário tenha mais de 5 lançamentos.
            limit = 5;              // O limite será somente 5.
        } else {
            limit = cashIn.length; // Caso tenha menos que 5 lançamentos, então será mostrado os lançamentos que tem.
        }
        for (let index = 0; index < limit; index++) {    // Executa até o limite, tudo o que estiver dentro do escopo.
            cashInHtml += `
            <div class="row mb-4"> <!-- Margin button = mb -->
                                        <div class="col-12">
                                            <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                                            <div class="container p-0"></div>
                                            <div class="row">
                                                <div class="col-12 col-md-8">
                                                    <p>${cashIn[index].description}</p>
                                                </div>
                                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                                    ${cashIn[index].date}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            `
        }

        document.getElementById("cash-out-list").innerHTML = cashInHtml; // pega o HTML que você criou com JavaScript e coloca dentro da div cash-in-list para mostrar as entradas de dinheiro na tela.
    }
}

function getTotal() {
    const transactions = data.transactions;
    let total = 0;
    transactions.forEach((item) => {
        if (item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`; //Esse toFixed é para determinar o número de casas decimais, nesse caso é 2.
}

function saveDate(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
    /**
     * pega o objeto completo da conta: data
     * transforma em string: JSON
     * salva no localStorage usando o email como chave
     */
}