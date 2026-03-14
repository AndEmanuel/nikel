const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if (!account) {         // O '!' é para se não existir conta
        alert("Opps! Verifique o usuário ou a senha.");
        return;             // Se a conta não é encontrada é emitido uma mensagem e retornado vazio.
    }

    if (account) {                          //Conta existe? Se sim, cai no if abaixo.
        if (account.password !== password) {    //A senha salva é diferente digitada? se sim, alerta.
            alert("Opps! Verifique o usuário ou a senha.");
            return;
        }
        saveSession(email, checkSession);

        window.location.href = "home.html";     //Conta existe? Abra a tela home.
    }

});

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value

    if (email.length < 5) {
        alert("Preencha o campo com um e-mail válido.");
        return;
    }
    if (password.length < 4) {
        alert("Preencha a senha com no mínimo 4 dígitos.")
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []        //As transactions são uma lista para indicar que o usuário pode ter vários dados de entrada e saída.
    });

    myModal.hide(); // Função que fechará a modal no momento em que condluída a criação da conta.
    alert("Conta criada com sucesso.");
});

function checkLogged() {
    if (session) {   //Há um usuário salvo no localStorage? Se sim.
        sessionStorage.setItem("logged", session);  //Seta quem está salvo na minha sessão.
        logged = session;
    }
    if (logged) {    //Se existir alguém logado
        saveSession(logged, session); //Salva a sessão

        window.location.href = "home.html";
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));            //Armazenamento da nossa aplicação local (Na própria aplicação). O JSON.stringify(data) serve para transformar o meu objeto em uma String
}

function saveSession(data, saveSession) {   //Data = email; saveSession = indica se o usuário quer permanecer logado
    if (saveSession) {  //Usuário quer permanecer logado? checkbox está marcado?
        localStorage.setItem("session", data);  //Salva no localStorage e permanece salvo mesmo depois do navegador ser fechado
    }

    sessionStorage.setItem("logged", data);     //Só existe enquanto o SessionStorage estiver aberto, se fechar o navegador, ele apaga.
}

function getAccount(key) {
    const account = localStorage.getItem(key)

    if (account) {                      // Verifica se existe algum valor salvo no localStorage com essa chave
        return JSON.parse(account);     /// Converte a string JSON armazenada no localStorage de volta para um objeto JavaScript
    }

    return "";                          //Caso a conta não seja encontrada, retorna uma vazio.
}
