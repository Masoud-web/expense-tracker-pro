const form = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expensesElement = document.getElementById("expenses");
const transactionList = document.getElementById("transaction-list");
const languageSelect = document.getElementById("language-select");

let transactions = [];

const translations = {
    en: {
        language: "Language:",
        title: "Expense Tracker",
        subtitle: "Track your income and expenses",
        balance: "Current Balance",
        income: "Income",
        expenses: "Expenses",
        addTransaction: "Add Transaction",
        description: "Description",
        descriptionPlaceholder: "e.g. Salary, Food, Shopping",
        amount: "Amount",
        amountPlaceholder: "Enter amount",
        type: "Type",
        incomeOption: "Income",
        expenseOption: "Expense",
        transactions: "Transactions",
        incomeType: "Income",
        expenseType: "Expense",
        invalid: "Please enter a valid description and amount."
    },

    de: {
        language: "Sprache:",
        title: "Ausgaben-Tracker",
        subtitle: "Verwalte deine Einnahmen und Ausgaben",
        balance: "Aktueller Kontostand",
        income: "Einnahmen",
        expenses: "Ausgaben",
        addTransaction: "Transaktion hinzufügen",
        description: "Beschreibung",
        descriptionPlaceholder: "z. B. Gehalt, Essen, Einkaufen",
        amount: "Betrag",
        amountPlaceholder: "Betrag eingeben",
        type: "Art",
        incomeOption: "Einnahme",
        expenseOption: "Ausgabe",
        transactions: "Transaktionen",
        incomeType: "Einnahme",
        expenseType: "Ausgabe",
        invalid: "Bitte geben Sie eine gültige Beschreibung und einen gültigen Betrag ein."
    }
};

let currentLanguage = "en";

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    if (!description || amount <= 0) {
        alert(translations[currentLanguage].invalid);
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

languageSelect.addEventListener("change", function () {
    currentLanguage = languageSelect.value;
    updateLanguage();
    updateUI();
});

function updateLanguage() {
    const t = translations[currentLanguage];

    document.documentElement.lang = currentLanguage;

    document.querySelector(".language-switcher label").textContent = t.language;

    document.getElementById("app-title").textContent = t.title;
    document.getElementById("app-subtitle").textContent = t.subtitle;
    document.getElementById("balance-title").textContent = t.balance;

    document.getElementById("income-title").textContent = t.income;
    document.getElementById("expense-title").textContent = t.expenses;

    document.getElementById("add-title").textContent = t.addTransaction;

    document.getElementById("description-label").textContent = t.description;
    document.getElementById("amount-label").textContent = t.amount;
    document.getElementById("type-label").textContent = t.type;

    descriptionInput.placeholder = t.descriptionPlaceholder;
    amountInput.placeholder = t.amountPlaceholder;

    document.getElementById("income-option").textContent = t.incomeOption;
    document.getElementById("expense-option").textContent = t.expenseOption;

    document.getElementById("add-button").textContent = t.addTransaction;

    document.getElementById("transactions-title").textContent = t.transactions;
}

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

        const typeText =
            transaction.type === "income"
                ? translations[currentLanguage].incomeType
                : translations[currentLanguage].expenseType;

        li.innerHTML = `
            <div class="transaction-info">
                <h3>${transaction.description}</h3>
                <span>${typeText}</span>
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

updateLanguage();
updateUI();