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
    let table = document.getElementById("incomesTable");
    let tbody = table.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    for (let i = 0; i < incomes.length; i++) {
        let newRow = tbody.insertRow();
        let nameCell = newRow.insertCell(0);
        nameCell.innerHTML = incomes[i].name;
        let amountCell = newRow.insertCell(1);
        amountCell.innerHTML = incomes[i].amount;
        let recurrancyCell = newRow.insertCell(2);
        recurrancyCell.innerHTML = incomes[i].recurrancy ? "Yes" : "No";
    }
}
// Creating a function to create a table to display in a nice way the expenses and see the modifications in real time
function displayExpenses() {
    let table = document.getElementById("expensesTable");
    let tbody = table.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    for (let i = 0; i < expenses.length; i++) {
        let newRow = tbody.insertRow();
        let nameCell = newRow.insertCell(0);
        nameCell.innerHTML = expenses[i].name;
        let amountCell = newRow.insertCell(1);
        amountCell.innerHTML = expenses[i].amount;
        let recurrancyCell = newRow.insertCell(2);
        recurrancyCell.innerHTML = expenses[i].recurrancy ? "Yes" : "No";
    }
}
// Creating a function to be able to add entries to the incomes and saved in the session storage
function addEntryIncomes() {
    let newName = prompt("Enter the name of the new income:");
    let newAmount = parseFloat(prompt("Enter the amount of the new income:"));
    let newRecurring = confirm("Is this income recurring?");
    incomes.push({ name: newName, amount: newAmount, recurrancy: newRecurring });
    sessionStorage.setItem("incomes", JSON.stringify(incomes));
    displayIncomes();
    displayDisposableIncome();
}
// Creating a function to be able to remove entries from the incomes and saved in the session storage
function removeEntryIncomes() {
    let incomeName = prompt("Enter the entry you want to remove:");
    let remainingItems = incomes.filter((income) => {
        return income.name !== incomeName;
    });
    incomes = remainingItems;
    sessionStorage.setItem("incomes", JSON.stringify(remainingItems));
    displayIncomes();
    displayDisposableIncome();
}
// Creating a function to be able to add entries to the expenses and saved in the session storage
function addEntryExpenses() {
    let newName = prompt("Enter the name of the new expense:");
    let newAmount = parseFloat(prompt("Enter the amount of the new expense:"));
    let newRecurring = confirm("Is this expense recurring?");
    expenses.push({ name: newName, amount: newAmount, recurrancy: newRecurring });
    sessionStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
    displayDisposableIncome();
}
// Creating a function to be able to remove entries from the expenses and saved in the session storage
function removeEntryExpenses() {
    let expenseName = prompt("Enter the entry you want to remove:");
    let remainingItems = expenses.filter((expense) => {
        return expense.name !== expenseName;
    });
    expenses = remainingItems;
    sessionStorage.setItem("expenses", JSON.stringify(remainingItems));
    displayExpenses();
    displayDisposableIncome();
}
// Function to display the disposable income
function displayDisposableIncome() {
    let disposableIncome = calculateDisposableIncome();
    document.getElementById("result").innerHTML = disposableIncome;
}

// Calculate disposable income: incomes - expenses
function calculateDisposableIncome() {
    let totalIncome = incomes.reduce((total, currentItem) => {
        return total + currentItem.amount;
    }, 0);
    let totalExpense = expenses.reduce((total, currentItem) => {
        return total + currentItem.amount;
    }, 0);

    return totalIncome - totalExpense;
}

// Calculate remaining disposable income after savings input from user
function calculateDisposableIncomeLeft() {
    let disposableIncome = calculateDisposableIncome();
    let savings = parseFloat(prompt("How much of your disposable income would you like to put into savings?"));
    let remainingDisposableIncome = disposableIncome - savings;
    alert("Total disposable income remaining: " + remainingDisposableIncome);
}

// Calling Functions
displayIncomes();
displayExpenses();
displayDisposableIncome();

// Event handling for Incomes Table's buttons adding new entries
let incomesTable = document.getElementById("incomesTableButton");
incomesTable.addEventListener("click", addEntryIncomes);

// Event handling for Incomes Table's buttons removing new entries
let removeIncomes = document.getElementById("removeIncomesButton");
removeIncomes.addEventListener("click", removeEntryIncomes);

// Event handling for Expense Table's buttons adding new entries
let expenseTable = document.getElementById("expensesTableButton");
expenseTable.addEventListener("click", addEntryExpenses);

// Event handling for Expense Table's buttons removing entries
let removeExpenses = document.getElementById("removeExpensesButton");
removeExpenses.addEventListener("click", removeEntryExpenses);

// Event handling for the calculate button, to let the user know what's left after removing the chosen amount into the savings
let finalcalculation = document.getElementById("disposableIncomeLeft");
finalcalculation.addEventListener("click", calculateDisposableIncomeLeft);
