const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout); // Acessa a minha classe button-logout no meu home.html adicionando o evento de clique no momento em que eu clicar sobre "Sair" na minha página, chamando a minha função logout abaixo.

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

    getTransactions();

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

    getTransactions();
}

function logout() {
    sessionStorage.removeItem("logged"); //Remove o item logged da minha sessionStorage.
    localStorage.removeItem("session"); //Remove o item session que é o checkbox que mantém o usuário sempre logado

    window.location.href = "index.html"; //Tag redireciona para a minha página index.html
}

function getTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if (transactions.length) {
        transactions.forEach((item) => {
            let type = "Entrada";

            if (item.type === "2") {
                type = "Saída";
            }
            transactionsHtml += `
             <tr>
                <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
            </tr>
            `
        })
    }
    document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

function saveDate(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
    /**
     * pega o objeto completo da conta: data
     * transforma em string: JSON
     * salva no localStorage usando o email como chave
     */
}

