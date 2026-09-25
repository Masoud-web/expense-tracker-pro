const form = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expensesElement = document.getElementById("expenses");
const transactionList = document.getElementById("transaction-list");
const editModal = document.getElementById("edit-modal");
const editDescriptionInput = document.getElementById("edit-description");
const editAmountInput = document.getElementById("edit-amount");
const editCategoryInput = document.getElementById("edit-category");
const editDateInput = document.getElementById("edit-date");
const editSaveButton = document.getElementById("edit-save-button");
const editCancelButton = document.getElementById("edit-cancel-button");
let editingTransactionId = null;
const languageSelect = document.getElementById("language-select");
const themeToggle = document.getElementById("theme-toggle");
const filterButtons =
    document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const categoryFood = document.getElementById("category-food");
const categoryTransport = document.getElementById("category-transport");
const categoryBills = document.getElementById("category-bills");
const categoryShopping = document.getElementById("category-shopping");
const categoryHealth = document.getElementById("category-health");
const categoryEntertainment = document.getElementById("category-entertainment");
const categoryOther = document.getElementById("category-other");

const filterFromDateInput = document.getElementById("filter-from-date");
const filterToDateInput = document.getElementById("filter-to-date");
const sortSelect = document.getElementById("sort-select");

const reportFromDateInput =
    document.getElementById("report-from-date");
const reportToDateInput =
    document.getElementById("report-to-date");
const reportTotalIncomeElement =
    document.getElementById("report-total-income");
const reportTotalExpensesElement =
    document.getElementById("report-total-expenses");
const reportNetBalanceElement =
    document.getElementById("report-net-balance");
const reportTransactionCountElement =
    document.getElementById("report-transaction-count");
const reportHighestExpenseCategoryElement =
    document.getElementById("report-highest-expense-category");
const reportAverageExpenseElement =
    document.getElementById("report-average-expense");
let transactions =
    JSON.parse(localStorage.getItem("expenseTrackerTransactions")) || [];
    transactions = transactions.map(function (transaction) {
    if (!transaction.category) {
        transaction.category = "other";
    }

    return transaction;
});

localStorage.setItem(
    "expenseTrackerTransactions",
    JSON.stringify(transactions)
);
let currentFilter = "all";
let searchText = "";
let currentCategory = "all";
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
        chartTitle: "Income & Expenses",

        monthlyReport: "Monthly Report",
        selectMonth: "Select Month",
        balanceLabel: "Balance",

        categoryReport: "Category Report",

        monthlyBudget: "Monthly Budget",
        setBudget: "Set Budget",
        budgetPlaceholder: "Enter budget",
        spent: "Spent",
        remaining: "Remaining",
        budgetMessage: "Set a budget for this month.",
        budgetExceeded: "Budget exceeded.",
        budgetWarning: "Warning: You are close to your budget.",
        budgetWithin: "You are within your budget.",

        financialReports: "Financial Reports",
        reportFrom: "From",
        reportTo: "To",
        totalIncome: "Total Income",
        totalExpenses: "Total Expenses",
        netBalance: "Net Balance",
        reportTransactions: "Transactions",
        highestExpenseCategory: "Highest Expense Category",
        averageExpense: "Average Expense",

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
        category: "Category",
        fromDate: "From Date",
        toDate: "To Date",
        filterAll: "All",
        filterIncome: "Income",
        filterExpense: "Expenses",
        allCategories: "All Categories",

        sort: "Sort:",
        newestFirst: "Newest First",
        oldestFirst: "Oldest First",
        highestAmount: "Highest Amount",
        lowestAmount: "Lowest Amount",

        exportCsv: "Export CSV",
        backupRestore: "Backup & Restore",
        backupDescription: "Create a backup of your data",
        backupData: "Backup Data",
        restoreDescription: "Restore your data",
        restoreData: "Restore Data",
        backupSuccess: "Backup created successfully.",
        invalidBackup: "Invalid backup file.",
        save: "Save",
        cancel: "Cancel",

        incomeType: "Income",
        expenseType: "Expense",

        invalid: "Please enter a valid description and amount.",
        darkMode: "🌙 Dark Mode",
        lightMode: "☀️ Light Mode",
        edit: "✏️ Edit",
        delete: "🗑️ Delete",

        categories: {
            food: "Food",
            transport: "Transport",
            bills: "Bills",
            shopping: "Shopping",
            health: "Health",
            entertainment: "Entertainment",
            other: "Other"
        }
    },

    de: {
        language: "Sprache:",
        title: "Ausgaben-Tracker",
        subtitle: "Verwalte deine Einnahmen und Ausgaben",
        balance: "Aktueller Kontostand",
        income: "Einnahmen",
        expenses: "Ausgaben",
        chartTitle: "Einnahmen & Ausgaben",

        monthlyReport: "Monatsbericht",
        selectMonth: "Monat auswählen",
        balanceLabel: "Kontostand",

        categoryReport: "Kategorienbericht",

        monthlyBudget: "Monatsbudget",
        setBudget: "Budget festlegen",
        budgetPlaceholder: "Budget eingeben",
        spent: "Ausgegeben",
        remaining: "Verbleibend",
        budgetMessage: "Legen Sie ein Budget für diesen Monat fest.",
        budgetExceeded: "Budget überschritten.",
        budgetWarning: "Warnung: Sie nähern sich Ihrem Budget.",
        budgetWithin: "Sie liegen innerhalb Ihres Budgets.",

        financialReports: "Finanzberichte",
        reportFrom: "Von",
        reportTo: "Bis",
        totalIncome: "Gesamteinnahmen",
        totalExpenses: "Gesamtausgaben",
        netBalance: "Nettosaldo",
        reportTransactions: "Transaktionen",
        highestExpenseCategory: "Kategorie mit den höchsten Ausgaben",
        averageExpense: "Durchschnittliche Ausgabe",

        addTransaction: "Transaktion hinzufügen",
        description: "Beschreibung",
        descriptionPlaceholder: "z. B. Gehalt, Lebensmittel, Einkaufen",
        amount: "Betrag",
        amountPlaceholder: "Betrag eingeben",
        type: "Art",
        date: "Datum",
        incomeOption: "Einnahme",
        expenseOption: "Ausgabe",

        transactions: "Transaktionen",
        category: "Kategorie",
        fromDate: "Von Datum",
        toDate: "Bis Datum",
        filterAll: "Alle",
        filterIncome: "Einnahmen",
        filterExpense: "Ausgaben",
        allCategories: "Alle Kategorien",

        sort: "Sortieren:",
        newestFirst: "Neueste zuerst",
        oldestFirst: "Älteste zuerst",
        highestAmount: "Höchster Betrag",
        lowestAmount: "Niedrigster Betrag",

        exportCsv: "CSV exportieren",
        backupRestore: "Backup & Wiederherstellen",
        backupDescription: "Erstelle eine Sicherung deiner Daten",
        backupData: "Daten sichern",
        restoreDescription: "Stelle deine Daten wieder her",
        restoreData: "Daten wiederherstellen",
        backupSuccess: "Sicherung erfolgreich erstellt.",
        invalidBackup: "Ungültige Sicherungsdatei.",
        save: "Speichern",
        cancel: "Abbrechen",

        incomeType: "Einnahme",
        expenseType: "Ausgabe",

        invalid: "Bitte geben Sie eine gültige Beschreibung und einen gültigen Betrag ein.",
        darkMode: "🌙 Dunkelmodus",
        lightMode: "☀️ Hellmodus",
        edit: "✏️ Bearbeiten",
        delete: "🗑️ Löschen",

        categories: {
            food: "Lebensmittel",
            transport: "Transport",
            bills: "Rechnungen",
            shopping: "Einkaufen",
            health: "Gesundheit",
            entertainment: "Unterhaltung",
            other: "Sonstiges"
        }
    }
};
transactionList.addEventListener("click", function (event) {
    const editButton = event.target.closest(".edit-btn");

    if (!editButton) {
        return;
    }

    const id = Number(editButton.dataset.id);

    const transaction = transactions.find(function (transaction) {
        return transaction.id === id;
    });

    if (!transaction) {
        return;
    }

    editingTransactionId = id;

    editDescriptionInput.value = transaction.description;
    editAmountInput.value = transaction.amount;
    editCategoryInput.value = transaction.category || "other";
    editDateInput.value = transaction.date || "";

    editModal.classList.remove("hidden");
    editDescriptionInput.focus();
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
editSaveButton.addEventListener("click", function () {
    if (editingTransactionId === null) {
        return;
    }

    const transaction = transactions.find(function (transaction) {
        return transaction.id === editingTransactionId;
    });

    if (!transaction) {
        return;
    }

    const description = editDescriptionInput.value.trim();
    const amount = Number(editAmountInput.value);
    const category = editCategoryInput.value;
    const date = editDateInput.value;

    if (!description || amount <= 0 || !date) {
        alert(translations[currentLanguage].invalid);
        return;
    }

    transaction.description = description;
    transaction.amount = amount;
    transaction.category = category;
    transaction.date = date;

    saveTransactions();

    editingTransactionId = null;
    editModal.classList.add("hidden");

    updateUI();
    updateMonthlyBudget();
});

editCancelButton.addEventListener("click", function () {
    editingTransactionId = null;
    editModal.classList.add("hidden");
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

function formatCurrency(value) {
    return `$${Number(value).toFixed(2)}`;
}

function updateLanguage() {
    const t = translations[currentLanguage];

    document.documentElement.lang = currentLanguage;

    document.querySelector(".language-switcher label").textContent =
        t.language;

    document.getElementById("app-title").textContent =
        t.title;

    document.getElementById("app-subtitle").textContent =
        t.subtitle;

    document.getElementById("balance-title").textContent =
        t.balance;

    document.getElementById("income-title").textContent =
        t.income;

    document.getElementById("expense-title").textContent =
        t.expenses;

    document.getElementById("chart-title").textContent =
        t.chartTitle;

    document.getElementById("add-title").textContent =
        t.addTransaction;

    document.getElementById("description-label").textContent =
        t.description;

    document.getElementById("amount-label").textContent =
        t.amount;

    document.getElementById("type-label").textContent =
        t.type;

    document.getElementById("date-label").textContent =
        t.date;

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

    document.getElementById("monthly-report-title").textContent =
        t.monthlyReport;

    document.getElementById("report-month-label").textContent =
        t.selectMonth;

    document.getElementById("monthly-income-title").textContent =
        t.income;

    document.getElementById("monthly-expense-title").textContent =
        t.expenses;

    document.getElementById("monthly-balance-title").textContent =
        t.balanceLabel;

    document.getElementById("category-report-title").textContent =
        t.categoryReport;

    document.getElementById("category-food-title").textContent =
        t.categories.food;

    document.getElementById("category-transport-title").textContent =
        t.categories.transport;

    document.getElementById("category-bills-title").textContent =
        t.categories.bills;

    document.getElementById("category-shopping-title").textContent =
        t.categories.shopping;

    document.getElementById("category-health-title").textContent =
        t.categories.health;

    document.getElementById("category-entertainment-title").textContent =
        t.categories.entertainment;

    document.getElementById("category-other-title").textContent =
        t.categories.other;

    document.getElementById("monthly-budget-title").textContent =
        t.monthlyBudget;

    document.getElementById("monthly-budget-label").textContent =
        t.setBudget;

    document.getElementById("monthly-budget-input").placeholder =
        t.budgetPlaceholder;

    document.getElementById("budget-spent-title").textContent =
        t.spent;

    document.getElementById("budget-remaining-title").textContent =
        t.remaining;

    document.getElementById("financial-reports-title").textContent =
        t.financialReports;

    document.getElementById("report-from-date-label").textContent =
        t.reportFrom;

    document.getElementById("report-to-date-label").textContent =
        t.reportTo;

    document.getElementById("report-total-income-title").textContent =
        t.totalIncome;

    document.getElementById("report-total-expenses-title").textContent =
        t.totalExpenses;

    document.getElementById("report-net-balance-title").textContent =
        t.netBalance;

    document.getElementById("report-transaction-count-title").textContent =
        t.reportTransactions;

    document.getElementById("report-highest-expense-title").textContent =
        t.highestExpenseCategory;

    document.getElementById("report-average-expense-title").textContent =
        t.averageExpense;

    document.getElementById("filter-from-date-label").textContent =
        t.fromDate;

    document.getElementById("filter-to-date-label").textContent =
        t.toDate;

    document.getElementById("category-filter-label").textContent =
        t.category;

    document.getElementById("sort-select-label").textContent =
        t.sort;

    document.querySelector('#category-filter option[value="all"]').textContent =
        t.allCategories;

    document.querySelector('#category-filter option[value="food"]').textContent =
        t.categories.food;

    document.querySelector('#category-filter option[value="transport"]').textContent =
        t.categories.transport;

    document.querySelector('#category-filter option[value="bills"]').textContent =
        t.categories.bills;

    document.querySelector('#category-filter option[value="shopping"]').textContent =
        t.categories.shopping;

    document.querySelector('#category-filter option[value="health"]').textContent =
        t.categories.health;

    document.querySelector('#category-filter option[value="entertainment"]').textContent =
        t.categories.entertainment;

    document.querySelector('#category-filter option[value="other"]').textContent =
        t.categories.other;

    document.querySelector('#sort-select option[value="date-desc"]').textContent =
        t.newestFirst;

    document.querySelector('#sort-select option[value="date-asc"]').textContent =
        t.oldestFirst;

    document.querySelector('#sort-select option[value="amount-desc"]').textContent =
        t.highestAmount;

    document.querySelector('#sort-select option[value="amount-asc"]').textContent =
        t.lowestAmount;

    document.getElementById("export-csv").textContent =
        t.exportCsv;

      document.getElementById("backup-restore-title").textContent =
          t.backupRestore;

      document.getElementById("backup-description").textContent =
          t.backupDescription;

      document.getElementById("backup-data-button").textContent =
          t.backupData;

      document.getElementById("restore-description").textContent =
          t.restoreDescription;

      document.getElementById("restore-data-button").textContent =
          t.restoreData;

    document.getElementById("category-label").textContent =
        t.category;

    document.querySelector('#category option[value="food"]').textContent =
        t.categories.food;

    document.querySelector('#category option[value="transport"]').textContent =
        t.categories.transport;

    document.querySelector('#category option[value="bills"]').textContent =
        t.categories.bills;

    document.querySelector('#category option[value="shopping"]').textContent =
        t.categories.shopping;

    document.querySelector('#category option[value="health"]').textContent =
        t.categories.health;

    document.querySelector('#category option[value="entertainment"]').textContent =
        t.categories.entertainment;

    document.querySelector('#category option[value="other"]').textContent =
        t.categories.other;

    document.getElementById("edit-category-label").textContent =
        t.category;

    document.getElementById("edit-date-label").textContent =
        t.date;

    document.querySelector('#edit-category option[value="food"]').textContent =
        t.categories.food;

    document.querySelector('#edit-category option[value="transport"]').textContent =
        t.categories.transport;

    document.querySelector('#edit-category option[value="bills"]').textContent =
        t.categories.bills;

    document.querySelector('#edit-category option[value="shopping"]').textContent =
        t.categories.shopping;

    document.querySelector('#edit-category option[value="health"]').textContent =
        t.categories.health;

    document.querySelector('#edit-category option[value="entertainment"]').textContent =
        t.categories.entertainment;

    document.querySelector('#edit-category option[value="other"]').textContent =
        t.categories.other;

    document.getElementById("edit-save-button").textContent =
        t.save;

    document.getElementById("edit-cancel-button").textContent =
        t.cancel;

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
    category: categoryInput.value,
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
    updateFinancialReports();

    updateUI();
});

filterToDateInput.addEventListener("change", function () {

    filterToDate = filterToDateInput.value;
    updateFinancialReports();

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

categoryFilter.addEventListener("change", function () {
    currentCategory = categoryFilter.value;
    updateUI();
});
let expenseChart;
let categoryBarChart;

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

function updateFinancialReports() {
    const fromDate = reportFromDateInput.value;
    const toDate = reportToDateInput.value;

    let reportTransactions = transactions;

    if (fromDate || toDate) {
        reportTransactions = transactions.filter(function (transaction) {
            if (!transaction.date) {
                return false;
            }

            if (fromDate && transaction.date < fromDate) {
                return false;
            }

            if (toDate && transaction.date > toDate) {
                return false;
            }

            return true;
        });
    }

    let totalIncome = 0;
    let totalExpenses = 0;
    let expenseCount = 0;

    const expenseCategories = {};

    reportTransactions.forEach(function (transaction) {
        const amount = Number(transaction.amount) || 0;

        if (transaction.type === "income") {
            totalIncome += amount;
        } else if (transaction.type === "expense") {
            totalExpenses += amount;
            expenseCount++;

            const category = transaction.category || "other";

            if (!expenseCategories[category]) {
                expenseCategories[category] = 0;
            }

            expenseCategories[category] += amount;
        }
    });

    const netBalance = totalIncome - totalExpenses;

    let highestExpenseCategory = "-";
    let highestExpenseAmount = 0;

    Object.keys(expenseCategories).forEach(function (category) {
        if (expenseCategories[category] > highestExpenseAmount) {
            highestExpenseAmount = expenseCategories[category];
            highestExpenseCategory = category;
        }
    });

    const averageExpense =
        expenseCount > 0
            ? totalExpenses / expenseCount
            : 0;

    reportTotalIncomeElement.textContent =
        formatCurrency(totalIncome);

    reportTotalExpensesElement.textContent =
        formatCurrency(totalExpenses);

    reportNetBalanceElement.textContent =
        formatCurrency(netBalance);

    reportTransactionCountElement.textContent =
        reportTransactions.length;

    reportHighestExpenseCategoryElement.textContent =
        highestExpenseCategory === "-"
            ? "-"
            : translations[currentLanguage].categories[highestExpenseCategory];

    reportAverageExpenseElement.textContent =
        formatCurrency(averageExpense);
}
function updateCategoryReport() {
    const categories = {
        food: { income: 0, expense: 0 },
        transport: { income: 0, expense: 0 },
        bills: { income: 0, expense: 0 },
        shopping: { income: 0, expense: 0 },
        health: { income: 0, expense: 0 },
        entertainment: { income: 0, expense: 0 },
        other: { income: 0, expense: 0 }
    };

    transactions.forEach(function (transaction) {
        const category = transaction.category || "other";
        const amount = Number(transaction.amount);

        if (categories[category] !== undefined) {
            if (transaction.type === "income") {
                categories[category].income += amount;
            }

            if (transaction.type === "expense") {
                categories[category].expense += amount;
            }
        }
    });

    categoryFood.textContent =
        formatCurrency(categories.food.expense);

    categoryTransport.textContent =
        formatCurrency(categories.transport.expense);

    categoryBills.textContent =
        formatCurrency(categories.bills.expense);

    categoryShopping.textContent =
        formatCurrency(categories.shopping.expense);

    categoryHealth.textContent =
        formatCurrency(categories.health.expense);

    categoryEntertainment.textContent =
        formatCurrency(categories.entertainment.expense);

    categoryOther.textContent =
        formatCurrency(categories.other.expense);

    const labels = [
        translations[currentLanguage].categories.food,
        translations[currentLanguage].categories.transport,
        translations[currentLanguage].categories.bills,
        translations[currentLanguage].categories.shopping,
        translations[currentLanguage].categories.health,
        translations[currentLanguage].categories.entertainment,
        translations[currentLanguage].categories.other
    ];

    const incomeData = [
        categories.food.income,
        categories.transport.income,
        categories.bills.income,
        categories.shopping.income,
        categories.health.income,
        categories.entertainment.income,
        categories.other.income
    ];

    const expenseData = [
        -categories.food.expense,
        -categories.transport.expense,
        -categories.bills.expense,
        -categories.shopping.expense,
        -categories.health.expense,
        -categories.entertainment.expense,
        -categories.other.expense
    ];

    const maxAbsValue = Math.max(
        ...incomeData.map(Math.abs),
        ...expenseData.map(Math.abs),
        1
    );

    const ctx = document.getElementById("category-bar-chart");

    if (!ctx) {
        return;
    }

    if (categoryBarChart) {
        categoryBarChart.destroy();
    }

    categoryBarChart = new Chart(ctx, {
        type: "bar",

        data: {
            labels: labels,

            datasets: [
                {
                    label: "Income",
                    data: incomeData,
                    backgroundColor: "rgba(34, 197, 94, 0.75)",
                    borderColor: "rgb(22, 163, 74)",
                    borderWidth: 1
                },
                {
                    label: "Expenses",
                    data: expenseData,
                    backgroundColor: "rgba(239, 68, 68, 0.75)",
                    borderColor: "rgb(220, 38, 38)",
                    borderWidth: 1
                }
            ]
        },

        options: {
            responsive: true,

            scales: {
                y: {
                    min: -maxAbsValue,
                    max: maxAbsValue,
                    beginAtZero: true,

                    grid: {
                        color: function (context) {
                            if (context.tick.value === 0) {
                                return "rgba(0, 0, 0, 0.7)";
                            }

                            return "rgba(0, 0, 0, 0.1)";
                        },

                        lineWidth: function (context) {
                            return context.tick.value === 0 ? 2 : 1;
                        }
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
        currentCategory !== "all" &&
        transaction.category !== currentCategory
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
    <span>${translations[currentLanguage].category}: ${translations[currentLanguage].categories[transaction.category || "other"]}</span>
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
    updateCategoryReport();
    updateFinancialReports();
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
        budgetMessageElement.textContent = translations[currentLanguage].budgetMessage;
        return;
    }

    const percentage = (spent / budget) * 100;
    const displayPercentage = Math.round(percentage);

    budgetProgressElement.style.width = `${Math.min(percentage, 100)}%`;
    budgetPercentageElement.textContent = `${displayPercentage}%`;

    if (percentage >= 100) {
        budgetProgressElement.style.background = "#d93636";
        budgetMessageElement.textContent = translations[currentLanguage].budgetExceeded;
    } else if (percentage >= 80) {
        budgetProgressElement.style.background = "#f39c12";
        budgetMessageElement.textContent = translations[currentLanguage].budgetWarning;
    } else {
        budgetProgressElement.style.background = "#159447";
        budgetMessageElement.textContent = translations[currentLanguage].budgetWithin;
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


/* ================================
   Backup & Restore
================================ */

const backupButton = document.getElementById("backup-data-button");
const restoreButton = document.getElementById("restore-data-button");
const restoreFileInput = document.getElementById("restore-file");
const backupRestoreMessage = document.getElementById("backup-restore-message");

function showBackupRestoreMessage(message) {
    if (backupRestoreMessage) {
        backupRestoreMessage.textContent = message;
    }
}

function backupData() {
    const backup = {
        version: 1,
        transactions: transactions,
        language: currentLanguage,
        darkMode: darkMode,
        monthlyBudgets: JSON.parse(
            localStorage.getItem("expenseTrackerMonthlyBudgets")
        ) || {}
    };

    const json = JSON.stringify(backup, null, 2);
    const blob = new Blob([json], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "expense-tracker-backup.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showBackupRestoreMessage(
        translations[currentLanguage].backupSuccess
    );
}

function restoreData(event) {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (loadEvent) {
        try {
            const backup = JSON.parse(loadEvent.target.result);

            if (
                !backup ||
                typeof backup !== "object" ||
                backup.version !== 1 ||
                !Array.isArray(backup.transactions) ||
                !["en", "de"].includes(backup.language) ||
                typeof backup.darkMode !== "boolean" ||
                !backup.monthlyBudgets ||
                typeof backup.monthlyBudgets !== "object" ||
                Array.isArray(backup.monthlyBudgets)
            ) {
                throw new Error("Invalid backup");
            }

            localStorage.setItem(
                "expenseTrackerTransactions",
                JSON.stringify(backup.transactions)
            );

            localStorage.setItem(
                "expenseTrackerLanguage",
                backup.language
            );

            localStorage.setItem(
                "expenseTrackerDarkMode",
                String(backup.darkMode)
            );

            localStorage.setItem(
                "expenseTrackerMonthlyBudgets",
                JSON.stringify(backup.monthlyBudgets)
            );

            location.reload();

        } catch (error) {
            showBackupRestoreMessage(
                translations[currentLanguage].invalidBackup
            );
        }

        restoreFileInput.value = "";
    };

    reader.readAsText(file);
}

if (backupButton) {
    backupButton.addEventListener("click", backupData);
}

if (restoreButton) {
    restoreButton.addEventListener("click", function () {
        restoreFileInput.click();
    });
}

if (restoreFileInput) {
    restoreFileInput.addEventListener("change", restoreData);
}
updateLanguage();
applyTheme();
updateUI();
updateMonthlyBudget();
updateUI();
