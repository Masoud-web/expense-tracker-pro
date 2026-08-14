const form = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expensesElement = document.getElementById("expenses");
const transactionList = document.getElementById("transaction-list");

let transactions = [];

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    if (!description || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    updateUI();

    form.reset();
});

function updateUI() {
    let income = 0;
    let expenses = 0;

    transactionList.innerHTML = "";

    transactions.forEach(function (transaction) {
        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expenses += transaction.amount;
        }

        const li = document.createElement("li");

        li.className = `transaction ${transaction.type}`;

        const sign = transaction.type === "income" ? "+" : "-";

        li.innerHTML = `
            <div class="transaction-info">
                <h3>${transaction.description}</h3>
                <span>${transaction.type}</span>
            </div>

            <div class="transaction-amount">
                ${sign}$${transaction.amount.toFixed(2)}
            </div>
        `;

        transactionList.appendChild(li);
    });

    const balance = income - expenses;

    balanceElement.textContent = `$${balance.toFixed(2)}`;
    incomeElement.textContent = `$${income.toFixed(2)}`;
    expensesElement.textContent = `$${expenses.toFixed(2)}`;
}