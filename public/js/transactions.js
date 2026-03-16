const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout); // Access the button-logout class in my home.html and add a click event so that when I click on "Logout" on my page, it calls my logout function below.

//ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value); // Transformation of a Float value, that is, a number that can contain a decimal separator (comma).
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });
    // Unlike push, which adds elements to the end of the list, unshift adds elements to the beginning of the list.
    saveDate(data);
    e.target.reset(); // Clears all form fields after saving a transaction.
    myModal.hide(); // Function that closes the modal once the account creation is completed.
    getTransactions();

    alert("Lançamento adicionado com sucesso.");
});

checkLogged();

function checkLogged() {
    if (session) {   // Is there a user saved in localStorage? If so.
        sessionStorage.setItem("logged", session);  //Set whoever is saved in my session.
        logged = session;
    }
    if (!logged) {    //if there isn't anyone logged in

        window.location.href = "index.html"; //Then I redirect to the index.html screen.
        return;
    }

    const dataUser = localStorage.getItem(logged);  // Take the logged-in user's data and save it in the dataUser variable.
    if (dataUser) {   // If there are logged-in user data
        data = JSON.parse(dataUser) // Save in data what I found in my localStorage, converting it to an object, through JSON.
    }

    getTransactions();
}

function logout() {
    sessionStorage.removeItem("logged"); //Remove the logged item from my sessionStorage.
    localStorage.removeItem("session"); //Remove the session item which is the checkbox that keeps the user always logged in

    window.location.href = "index.html"; //// Tag redirects to my index.html page
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
     * take the complete account object: data
     * transform it into a string: JSON
     * save it in localStorage using the email as a key
     */
}

