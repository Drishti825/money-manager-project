class Transaction {
    constructor(amount, date, type, category, desc) {
        this.amount = amount;
        this.date = date;
        this.type = type;
        this.category = category;
        this.desc = desc;
    }
}

let data = JSON.parse(localStorage.getItem("transactions")) || [];

function saveData() {
    localStorage.setItem("transactions", JSON.stringify(data));
}

function addTransaction() {
    let amount = document.getElementById("amount").value;
    let date = document.getElementById("date").value;
    let type = document.getElementById("type").value;
    let category = document.getElementById("category").value;
    let desc = document.getElementById("desc").value;

    if (amount == "" || type == "" || date == "") {
        alert("Please fill required fields");
        return;
    }

    let t = new Transaction(amount, date, type, category, desc);
    data.push(t);

    saveData();
    showData();
}

function showData() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    let income = 0;
    let expense = 0;

    for (let i = 0; i < data.length; i++) {
        let row = `<tr>
            <td>${data[i].date}</td>
            <td>${data[i].type}</td>
            <td>${data[i].category}</td>
            <td>${data[i].desc}</td>
            <td>${data[i].amount}</td>
            <td><button onclick="deleteData(${i})">Delete</button></td>
        </tr>`;

        list.innerHTML += row;

        if (data[i].type == "income") {
            income += Number(data[i].amount);
        } else {
            expense += Number(data[i].amount);
        }
    }

    document.getElementById("income").innerText = "Income: " + income;
    document.getElementById("expense").innerText = "Expense: " + expense;
    document.getElementById("balance").innerText = "Balance: " + (income - expense);
}

function deleteData(i) {
    data.splice(i, 1);
    saveData();
    showData();
}

showData();