const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout); // Access the button-logout class in my home.html and add a click event so that when I click on "Logout" on my page, it calls my logout function below.
document.getElementById("transactions-button").addEventListener("click", function () {
    window.location.href = "transactions.html";
});
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
    e.target.reset(); //Clears all form fields after saving a transaction.
    myModal.hide(); // Function that closes the modal once the account creation is completed.

    getCashIn();
    getCashOut();
    getTotal();

    alert("Lançamento adicionado com sucesso.");
});

checkLogged();

function checkLogged() {
    if (session) {   //Is there a user saved in localStorage? If so.
        sessionStorage.setItem("logged", session);  //Set whoever is saved in my session.
        logged = session;
    }
    if (!logged) {    //if there isn't anyone logged in

        window.location.href = "index.html"; //Then I redirect to the index.html screen.
        return;
    }

    const dataUser = localStorage.getItem(logged);  //Take the logged-in user's data and save it in the dataUser variable.
    if (dataUser) {   //If there are logged-in user data
        data = JSON.parse(dataUser) //Save in data what I found in my localStorage, converting it to an object, through JSON.
    }
    getCashIn();
    getCashOut();
    getTotal();
}

function logout() {
    sessionStorage.removeItem("logged"); //Remove the logged item from my sessionStorage.
    localStorage.removeItem("session"); //Remove the session item which is the checkbox that keeps the user always logged in.
    window.location.href = "index.html"; //Tag redirects to my index.html page
}

function getCashIn() {
    const transactions = data.transactions; // Collects all transactions

    const cashIn = transactions.filter((item) => item.type === "1");      // Run the Array to filter the items of type 1;

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if (cashIn.length > 5) {    // Case the user has more than 5 transactions.
            limit = 5;              // The limit will be only 5.
        } else {
            limit = cashIn.length; // Case the user has less than 5 transactions, then all will be displayed.
        }
        for (let index = 0; index < limit; index++) {    // Executes everything within the scope until the limit is reached.
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

        document.getElementById("cash-in-list").innerHTML = cashInHtml; // Take the HTML you created with JavaScript and put it inside the cash-in-list div to display the cash in transactions on the screen.
    }
}
function getCashOut() {
    const transactions = data.transactions; // Collects all transactions.

    const cashOut = transactions.filter((item) => item.type === "2");      // Run the Array to filter items of type 2;

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if (cashIn.length > 5) {    //Case the user has more than 5 transactions.
            limit = 5;              // The limit will be only 5.
        } else {
            limit = cashIn.length; // Case the user has less than 5 transactions, then all will be displayed.
        }
        for (let index = 0; index < limit; index++) {    // Executes everything within the scope until the limit is reached.

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

        document.getElementById("cash-out-list").innerHTML = cashInHtml; // Take the HTML you created with JavaScript and put it inside the cash-out-list div to display the cash out transactions on the screen.
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

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`; //This toFixed is to determine the number of decimal places, in this case it is 2.
}

function saveDate(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
    /**
     * take the complete account object: data
     * transform it into a string: JSON
     * save it in localStorage using the email as a key
     */
}