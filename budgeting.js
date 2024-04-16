// Creating the expense object with 5 istances and saving them in the session storage
let incomes = JSON.parse(sessionStorage.getItem("incomes"));
if (!incomes) {
    incomes = [
        {
            name: "Carlotta",
            amount: 400,
            recurrancy: true,
        },
        {
            name: "Tony",
            amount: 2000,
            recurrancy: true,
        },
        {
            name: "Casual jobs",
            amount: 200,
            recurrancy: true,
        },
        {
            name: "Kipferl",
            amount: 1200,
            recurrancy: true,
        },
        {
            name: "Cakes",
            amount: 200,
            recurrancy: true,
        },
    ];
}
// Creating the expense object with 5 istances and saving them in the session storage
let expenses = JSON.parse(sessionStorage.getItem("expenses"));
if (!expenses) {
    expenses = [
        {
            name: "Rent",
            amount: 1000,
            recurrancy: true,
        },

        {
            name: "Council tax",
            amount: 160,
            recurrancy: true,
        },

        {
            name: "Electricity",
            amount: 100,
            recurrancy: true,
        },

        {
            name: "Groceries",
            amount: 600,
            recurrancy: true,
        },

        {
            name: "Gas bill",
            amount: 60,
            recurrancy: true,
        },
    ];
}
// Creating a function to create a table to display in a nice way the incomes and see the modifications in real time
function displayIncomes() {
    const table = document.getElementById("incomesTable");
    const tbody = table.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    for (let i = 0; i < incomes.length; i++) {
        const newRow = tbody.insertRow();
        const nameCell = newRow.insertCell(0);
        nameCell.innerHTML = incomes[i].name;
        const amountCell = newRow.insertCell(1);
        amountCell.innerHTML = incomes[i].amount;
        const recurrancyCell = newRow.insertCell(2);
        recurrancyCell.innerHTML = incomes[i].recurrancy ? "Yes" : "No";
    }
}
// Creating a function to create a table to display in a nice way the expenses and see the modifications in real time
function displayExpenses() {
    const table = document.getElementById("expensesTable");
    const tbody = table.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    for (let i = 0; i < expenses.length; i++) {
        const newRow = tbody.insertRow();
        const nameCell = newRow.insertCell(0);
        nameCell.innerHTML = expenses[i].name;
        const amountCell = newRow.insertCell(1);
        amountCell.innerHTML = expenses[i].amount;
        const recurrancyCell = newRow.insertCell(2);
        recurrancyCell.innerHTML = expenses[i].recurrancy ? "Yes" : "No";
    }
}
// Creating a function to be able to add entries to the incomes and saved in the session storage
function addEntryIncomes() {
    const newName = prompt("Enter the name of the new income:");
    const newAmount = parseFloat(prompt("Enter the amount of the new income:"));
    const newRecurring = confirm("Is this income recurring?");
    incomes.push({ name: newName, amount: newAmount, recurrancy: newRecurring });
    sessionStorage.setItem("incomes", JSON.stringify(incomes));
    displayIncomes();
    displayDisposableIncome();
}
// Creating a function to be able to remove entries from the incomes and saved in the session storage
function removeEntryIncomes() {
    const incomeName = prompt("Enter the entry you want to remove:");
    const remainingItems = incomes.filter((income) => {
        return income.name !== incomeName;
    });
    incomes = remainingItems;
    sessionStorage.setItem("incomes", JSON.stringify(remainingItems));
    displayIncomes();
    displayDisposableIncome();
}
// Creating a function to be able to add entries to the expenses and saved in the session storage
function addEntryExpenses() {
    const newName = prompt("Enter the name of the new expense:");
    const newAmount = parseFloat(prompt("Enter the amount of the new expense:"));
    const newRecurring = confirm("Is this expense recurring?");
    expenses.push({ name: newName, amount: newAmount, recurrancy: newRecurring });
    sessionStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
    displayDisposableIncome();
}
// Creating a function to be able to remove entries from the expenses and saved in the session storage
function removeEntryExpenses() {
    const expenseName = prompt("Enter the entry you want to remove:");
    const remainingItems = expenses.filter((expense) => {
        return expense.name !== expenseName;
    });
    expenses = remainingItems;
    sessionStorage.setItem("expenses", JSON.stringify(remainingItems));
    displayExpenses();
    displayDisposableIncome();
}
// Function to display the disposable income
function displayDisposableIncome() {
    const disposableIncome = calculateDisposableIncome();
    document.getElementById("result").innerHTML = disposableIncome;
}

// Calculate disposable income: incomes - expenses
function calculateDisposableIncome() {
    const totalIncome = incomes.reduce((total, currentItem) => {
        return total + currentItem.amount;
    }, 0);
    const totalExpense = expenses.reduce((total, currentItem) => {
        return total + currentItem.amount;
    }, 0);

    return totalIncome - totalExpense;
}

// Calculate remaining disposable income after savings input from user
function calculateDisposableIncomeLeft() {
    const disposableIncome = calculateDisposableIncome();
    const savings = parseFloat(prompt("How much of your disposable income would you like to put into savings?"));
    const remainingDisposableIncome = disposableIncome - savings;
    alert("Total disposable income remaining: " + remainingDisposableIncome);
}

// Calling Functions
displayIncomes();
displayExpenses();
displayDisposableIncome();

// Event handling for Incomes Table's buttons adding new entries
const incomesTable = document.getElementById("incomesTableButton");
incomesTable.addEventListener("click", addEntryIncomes);

// Event handling for Incomes Table's buttons removing new entries
const removeIncomes = document.getElementById("removeIncomesButton");
removeIncomes.addEventListener("click", removeEntryIncomes);

// Event handling for Expense Table's buttons adding new entries
const expenseTable = document.getElementById("expensesTableButton");
expenseTable.addEventListener("click", addEntryExpenses);

// Event handling for Expense Table's buttons removing entries
const removeExpenses = document.getElementById("removeExpensesButton");
removeExpenses.addEventListener("click", removeEntryExpenses);

// Event handling for the calculate button, to let the user know what's left after removing the chosen amount into the savings
const finalcalculation = document.getElementById("disposableIncomeLeft");
finalcalculation.addEventListener("click", calculateDisposableIncomeLeft);
