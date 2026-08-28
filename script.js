const form = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const dateInput = document.getElementById("date");
const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expensesElement = document.getElementById("expenses");
const transactionList = document.getElementById("transaction-list");
const languageSelect = document.getElementById("language-select");
const themeToggle = document.getElementById("theme-toggle");
const filterButtons =
    document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search-input");
const filterFromDateInput = document.getElementById("filter-from-date");
const filterToDateInput = document.getElementById("filter-to-date");
const sortSelect = document.getElementById("sort-select");
let transactions =
    JSON.parse(localStorage.getItem("expenseTrackerTransactions")) || [];
let currentFilter = "all";
let searchText = "";
let selectedReportMonth = "";
let filterFromDate = "";
let filterToDate = "";
let currentSort = "date-desc";
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
date: "Date",
        incomeOption: "Income",
        expenseOption: "Expense",
        transactions: "Transactions",
        incomeType: "Income",
        expenseType: "Expense",
        invalid: "Please enter a valid description and amount.",
        darkMode: "🌙 Dark Mode",
lightMode: "☀️ Light Mode",
edit: "✏️ Edit",
delete: "🗑️ Delete",
filterAll: "All",
filterIncome: "Income",
filterExpense: "Expenses"
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
date: "Datum",
        incomeOption: "Einnahme",
        expenseOption: "Ausgabe",
        transactions: "Transaktionen",
        incomeType: "Einnahme",
        expenseType: "Ausgabe",
        invalid: "Bitte geben Sie eine gültige Beschreibung und einen gültigen Betrag ein.",
        darkMode: "🌙 Dunkelmodus",
lightMode: "☀️ Hellmodus",
edit: "✏️ Bearbeiten",
delete: "🗑️ Löschen",
filterAll: "Alle",
filterIncome: "Einnahmen",
filterExpense: "Ausgaben"

    }
};
transactionList.addEventListener("click", function (event) {
    const editButton = event.target.closest(".edit-btn");

    if (editButton) {
        const id = Number(editButton.dataset.id);

        const transaction = transactions.find(function (transaction) {
            return transaction.id === id;
        });

        if (!transaction) {
            return;
        }

        const newDescription = prompt(
            translations[currentLanguage].description,
            transaction.description
        );

        if (newDescription === null) {
            return;
        }

        const newAmount = prompt(
            translations[currentLanguage].amount,
            transaction.amount
        );

        if (newAmount === null) {
            return;
        }
const newDate = prompt(
    translations[currentLanguage].date,
    transaction.date
);

if (newDate === null) {
    return;
}

        const amount = Number(newAmount);

        if (!newDescription.trim() || amount <= 0) {
            alert(translations[currentLanguage].invalid);
            return;
        }

        transaction.description = newDescription.trim();
transaction.amount = amount;
transaction.date = newDate;
        saveTransactions();
        updateUI();
        updateMonthlyBudget();
    }
});
transactionList.addEventListener("click", function (event) {
    const deleteButton = event.target.closest(".delete-btn");

    if (!deleteButton) {
        return;
    }

    const id = Number(deleteButton.dataset.id);

    transactions = transactions.filter(function (transaction) {
        return transaction.id !== id;
    });

    saveTransactions();
    updateUI();
});
let currentLanguage =
    localStorage.getItem("expenseTrackerLanguage") || "en";

languageSelect.value = currentLanguage;

let darkMode =
    localStorage.getItem("expenseTrackerDarkMode") === "true";

function saveTransactions() {
    localStorage.setItem(
        "expenseTrackerTransactions",
        JSON.stringify(transactions)
    );
}

function updateLanguage() {
    const t = translations[currentLanguage];

    document.documentElement.lang = currentLanguage;
document.getElementById("chart-title").textContent =
    t.chartTitle;
    document.querySelector(".language-switcher label").textContent =
        t.language;

    document.getElementById("app-title").textContent = t.title;
    document.getElementById("app-subtitle").textContent = t.subtitle;
    document.getElementById("balance-title").textContent = t.balance;

    document.getElementById("income-title").textContent = t.income;
    document.getElementById("expense-title").textContent = t.expenses;

    document.getElementById("add-title").textContent =
        t.addTransaction;

    document.getElementById("description-label").textContent =
        t.description;

    document.getElementById("amount-label").textContent =
        t.amount;

    document.getElementById("type-label").textContent =
        t.type;

    descriptionInput.placeholder =
        t.descriptionPlaceholder;

    amountInput.placeholder =
        t.amountPlaceholder;

    document.getElementById("income-option").textContent =
        t.incomeOption;

    document.getElementById("expense-option").textContent =
        t.expenseOption;

    document.getElementById("add-button").textContent =
        t.addTransaction;

    document.getElementById("transactions-title").textContent =
        t.transactions;
document.querySelector('[data-filter="all"]').textContent =
    t.filterAll;

document.querySelector('[data-filter="income"]').textContent =
    t.filterIncome;

document.querySelector('[data-filter="expense"]').textContent =
    t.filterExpense;
    updateThemeButton();
}

function updateThemeButton() {
    const t = translations[currentLanguage];

    themeToggle.textContent =
        darkMode ? t.lightMode : t.darkMode;
}

function applyTheme() {
    document.body.classList.toggle("dark-mode", darkMode);

    localStorage.setItem(
        "expenseTrackerDarkMode",
        darkMode
    );

    updateThemeButton();
}

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
    type: type,
    date: dateInput.value
};

    transactions.push(transaction);

    saveTransactions();
    updateUI();
    updateMonthlyBudget();

    form.reset();
});

languageSelect.addEventListener("change", function () {
    currentLanguage = languageSelect.value;

    localStorage.setItem(
        "expenseTrackerLanguage",
        currentLanguage
    );

    updateLanguage();
    updateUI();
});

themeToggle.addEventListener("click", function () {
    darkMode = !darkMode;
    applyTheme();
});
filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        currentFilter = button.dataset.filter;

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        updateUI();
    });

});
filterFromDateInput.addEventListener("change", function () {

    filterFromDate = filterFromDateInput.value;

    updateUI();
});

filterToDateInput.addEventListener("change", function () {

    filterToDate = filterToDateInput.value;

    updateUI();
});

sortSelect.addEventListener("change", function () {

    currentSort = sortSelect.value;

    updateUI();
});

searchInput.addEventListener("input", function () {

    searchText = searchInput.value.toLowerCase();

    updateUI();

});
let expenseChart;

function updateChart(income, expenses) {
    const ctx = document.getElementById("expense-chart");

    if (expenseChart) {
        expenseChart.destroy();
    }

    expenseChart = new Chart(ctx, {
        type: "doughnut",

        data: {
            labels: [
                translations[currentLanguage].income,
                translations[currentLanguage].expenses
            ],

            datasets: [{
                data: [income, expenses]
            }]
        },

      options: {
    responsive: true,
            maintainAspectRatio: false,

    plugins: {
        legend: {
            labels: {
                color: darkMode ? "#ffffff" : "#333333"
            }
        }
    }
}
    });
}

function updateUI() {
    let income = 0;
    let expenses = 0;

   transactionList.innerHTML = "";

const sortedTransactions = [...transactions].sort(function (a, b) {

    if (currentSort === "date-asc") {
        return String(a.date || "").localeCompare(
            String(b.date || "")
        );
    }

    if (currentSort === "amount-desc") {
        return Number(b.amount) - Number(a.amount);
    }

    if (currentSort === "amount-asc") {
        return Number(a.amount) - Number(b.amount);
    }

    return String(b.date || "").localeCompare(
        String(a.date || "")
    );
});

sortedTransactions.forEach(function (transaction) {
    if (transaction.type === "income") {
        income += transaction.amount;
    } else {
        expenses += transaction.amount;
    }

    if (
        currentFilter !== "all" &&
        transaction.type !== currentFilter
    ) {
        return;
    }
if (
    searchText &&
    !transaction.description
        .toLowerCase()
        .includes(searchText)
) {
    return;
}


if (
    selectedReportMonth &&
    (!transaction.date ||
     transaction.date.substring(0, 7) !== selectedReportMonth)
) {
    return;
}


        if (
            filterFromDate &&
            (!transaction.date || transaction.date < filterFromDate)
        ) {
            return;
        }

        if (
            filterToDate &&
            (!transaction.date || transaction.date > filterToDate)
        ) {
            return;
        }

        const li = document.createElement("li");

        li.className =
            `transaction ${transaction.type}`;

        const sign =
            transaction.type === "income" ? "+" : "-";

        const typeText =
            transaction.type === "income"
                ? translations[currentLanguage].incomeType
                : translations[currentLanguage].expenseType;

       li.innerHTML = `
<div class="transaction-info">
    <h3>${transaction.description}</h3>
    <span>${typeText}</span>
    <small>${transaction.date || ""}</small>
</div>

    <div class="transaction-amount">
        ${sign}$${transaction.amount.toFixed(2)}
    </div>

    <div class="transaction-actions">
        <button class="edit-btn" data-id="${transaction.id}">
            ${translations[currentLanguage].edit}
        </button>

        <button class="delete-btn" data-id="${transaction.id}">
            ${translations[currentLanguage].delete}
        </button>
    </div>
`;

        transactionList.appendChild(li);
    });

    const balance = income - expenses;

    balanceElement.textContent =
        `$${balance.toFixed(2)}`;

    incomeElement.textContent =
        `$${income.toFixed(2)}`;

    expensesElement.textContent =
        `$${expenses.toFixed(2)}`;
    updateChart(income, expenses);
}
const exportButton = document.getElementById("export-csv");

exportButton.addEventListener("click", function () {
    if (transactions.length === 0) {
        alert("No transactions to export");
        return;
    }

    let csvContent = "Date,Description,Type,Amount\n";

    transactions.forEach(function (transaction) {
        csvContent +=
            `${transaction.date || ""},` +
            `"${transaction.description}",` +
            `${transaction.type},` +
            `${transaction.amount}\n`;
    });

    const blob = new Blob(
        [csvContent],
        { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
});

const reportMonthInput = document.getElementById("report-month");
const monthlyIncomeElement = document.getElementById("monthly-income");
const monthlyExpensesElement = document.getElementById("monthly-expenses");
const monthlyBalanceElement = document.getElementById("monthly-balance");

function updateMonthlyReport() {
    const selectedMonth = reportMonthInput.value;
    selectedReportMonth = selectedMonth;

    let monthlyIncome = 0;
    let monthlyExpenses = 0;

    if (selectedMonth) {
        transactions.forEach(function (transaction) {

            if (!transaction.date) {
                return;
            }

            if (transaction.date.substring(0, 7) !== selectedMonth) {
                return;
            }

            if (transaction.type === "income") {
                monthlyIncome += Number(transaction.amount);
            } else if (transaction.type === "expense") {
                monthlyExpenses += Number(transaction.amount);
            }
        });
    }

    const monthlyBalance =
        monthlyIncome - monthlyExpenses;

    monthlyIncomeElement.textContent =
        `$${monthlyIncome.toFixed(2)}`;

    monthlyExpensesElement.textContent =
        `$${monthlyExpenses.toFixed(2)}`;

    monthlyBalanceElement.textContent =
        `$${monthlyBalance.toFixed(2)}`;

    if (expenseChart) {
        expenseChart.destroy();
    }

    updateChart(monthlyIncome, monthlyExpenses);
    updateUI();
}

reportMonthInput.addEventListener("change", function () {
    updateMonthlyReport();
});

const monthlyBudgetInput = document.getElementById("monthly-budget-input");
const budgetSpentElement = document.getElementById("budget-spent");
const budgetRemainingElement = document.getElementById("budget-remaining");
const budgetProgressElement = document.getElementById("budget-progress");
const budgetPercentageElement = document.getElementById("budget-percentage");
const budgetMessageElement = document.getElementById("budget-message");

function getMonthlyBudget(month) {
    if (!month) {
        return 0;
    }

    const budgets = JSON.parse(
        localStorage.getItem("expenseTrackerMonthlyBudgets")
    ) || {};

    return Number(budgets[month]) || 0;
}

function saveMonthlyBudget(month, amount) {
    if (!month) {
        return;
    }

    const budgets = JSON.parse(
        localStorage.getItem("expenseTrackerMonthlyBudgets")
    ) || {};

    budgets[month] = amount;

    localStorage.setItem(
        "expenseTrackerMonthlyBudgets",
        JSON.stringify(budgets)
    );
}

function updateMonthlyBudget() {
    const selectedMonth = reportMonthInput.value;
    const budget = getMonthlyBudget(selectedMonth);

    let spent = 0;

    if (selectedMonth) {
        transactions.forEach(function (transaction) {
            if (!transaction.date) {
                return;
            }

            if (transaction.date.substring(0, 7) !== selectedMonth) {
                return;
            }

            if (transaction.type === "expense") {
                spent += Number(transaction.amount);
            }
        });
    }

    const remaining = budget - spent;

    budgetSpentElement.textContent =
        `$${spent.toFixed(2)}`;

    budgetRemainingElement.textContent =
        `$${remaining.toFixed(2)}`;

    if (budget <= 0) {
        budgetProgressElement.style.width = "0%";
        budgetProgressElement.style.background = "#159447";
        budgetPercentageElement.textContent = "0%";
        budgetMessageElement.textContent = "Set a budget for this month.";
        return;
    }

    const percentage = (spent / budget) * 100;
    const displayPercentage = Math.round(percentage);

    budgetProgressElement.style.width = `${Math.min(percentage, 100)}%`;
    budgetPercentageElement.textContent = `${displayPercentage}%`;

    if (percentage >= 100) {
        budgetProgressElement.style.background = "#d93636";
        budgetMessageElement.textContent = "Budget exceeded.";
    } else if (percentage >= 80) {
        budgetProgressElement.style.background = "#f39c12";
        budgetMessageElement.textContent = "Warning: You are close to your budget.";
    } else {
        budgetProgressElement.style.background = "#159447";
        budgetMessageElement.textContent = "You are within your budget.";
    }
}

monthlyBudgetInput.addEventListener("change", function () {
    const selectedMonth = reportMonthInput.value;
    const amount = Number(monthlyBudgetInput.value) || 0;

    saveMonthlyBudget(selectedMonth, amount);
    updateMonthlyBudget();
});

const originalUpdateMonthlyReport = updateMonthlyReport;
updateMonthlyReport = function () {
    originalUpdateMonthlyReport();
    updateMonthlyBudget();
};


updateLanguage();
applyTheme();
updateUI();
updateMonthlyBudget();
updateUI();
