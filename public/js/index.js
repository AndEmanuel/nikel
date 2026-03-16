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

    if (!account) {
        alert("Opps! Verifique o usuário ou a senha.");
        return;             // If the account is not found, an alert is displayed and the function returns empty.
    }

    if (account) {                          //Account exists? If so, it enters the if below.
        if (account.password !== password) {    //Is the saved password different from the entered one? If so, alert.
            alert("Opps! Verifique o usuário ou a senha.");
            return;
        }
        saveSession(email, checkSession);

        window.location.href = "home.html";     //Account exists? Open the home screen.
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
        transactions: []
    });

    myModal.hide(); // Function that closes the modal once the account creation is completed.
    alert("Account created successfully.");
});

function checkLogged() {
    if (session) {   // There is a user saved in localStorage? If so.
        sessionStorage.setItem("logged", session);  //Set who is saved in my session.
        logged = session;
    }
    if (logged) {    //If there is a user logged in
        saveSession(logged, session); //Save the session

        window.location.href = "home.html";
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {   //Data = email; saveSession = indicates if the user wants to stay logged in
    if (saveSession) {  //User wants to stay logged in? checkbox is checked?
        localStorage.setItem("session", data);  //Saves in localStorage and remains saved even after the browser is closed
    }

    sessionStorage.setItem("logged", data);     // Only exists while the SessionStorage is open, if the browser is closed, it gets deleted.
}

function getAccount(key) {
    const account = localStorage.getItem(key)

    if (account) {                      // Verify if there is any value saved in localStorage with this key
        return JSON.parse(account);     /// Convert the JSON string stored in localStorage back to a JavaScript object
    }

    return "";                          //Case the account is not found, return an empty string.
}
