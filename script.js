// =========================================================
// SpendWise — Complete JavaScript Logic (Weeks 5–7)
// =========================================================

// 1. Application Configuration & State Variables
const appName = "SpendWise";
const currency = "KES";
let monthlyBudget = Number(localStorage.getItem("spendwise_budget")) || 0;
let expenses = JSON.parse(localStorage.getItem("spendwise_expenses")) || [];

// 2. DOM Element References
const budgetForm = document.getElementById("budget-form");
const budgetInput = document.getElementById("budget-input");
const budgetFeedback = document.getElementById("budget-feedback");

const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseCategoryInput = document.getElementById("expense-category");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseFeedback = document.getElementById("expense-feedback");

const displayBudget = document.getElementById("display-budget");
const displayExpenses = document.getElementById("display-expenses");
const displayBalance = document.getElementById("display-balance");
const displayPercentage = document.getElementById("display-percentage");
const statusBanner = document.getElementById("status-banner");

const expenseList = document.getElementById("expense-list");
const expenseCount = document.getElementById("expense-count");
const clearAllBtn = document.getElementById("clear-all-btn");

// 3. Reusable Helper & Calculation Functions (Week 5)
function saveState() {
  localStorage.setItem("spendwise_budget", String(monthlyBudget));
  localStorage.setItem("spendwise_expenses", JSON.stringify(expenses));
}

function formatCurrency(amount) {
  return `${currency} ${amount.toLocaleString("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function calculateTotalExpenses() {
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }
  return total;
}

function calculateRemainingBalance(budget, totalExpenses) {
  return budget - totalExpenses;
}

function calculateSpendingPercentage(budget, totalExpenses) {
  if (budget <= 0) {
    return 0;
  }
  return ((totalExpenses / budget) * 100).toFixed(1);
}

// 4. Conditional Budget Evaluation (Week 6)
function updateBudgetStatus(totalExpenses, remainingBalance, percentUsed) {
  statusBanner.className = "status-banner";

  if (monthlyBudget === 0) {
    statusBanner.classList.add("status-neutral");
    statusBanner.textContent =
      "Set a monthly budget above to start tracking your spending health.";
  } else if (remainingBalance < 0) {
    statusBanner.classList.add("status-danger");
    statusBanner.textContent = `Over Budget! You have exceeded your monthly budget by ${formatCurrency(
      Math.abs(remainingBalance)
    )}.`;
  } else if (totalExpenses >= monthlyBudget * 0.8) {
    statusBanner.classList.add("status-warning");
    statusBanner.textContent = `Caution: You have used ${percentUsed}% of your budget. ${formatCurrency(
      remainingBalance
    )} remaining.`;
  } else {
    statusBanner.classList.add("status-healthy");
    statusBanner.textContent = `On Track! You have used ${percentUsed}% of your budget and have ${formatCurrency(
      remainingBalance
    )} left.`;
  }
}

// 5. Loop & DOM Rendering for Expense List (Week 6)
function renderExpenseList() {
  expenseList.innerHTML = "";
  expenseCount.textContent = expenses.length;

  if (expenses.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty-state";
    emptyItem.textContent = "No expenses recorded yet.";
    expenseList.appendChild(emptyItem);
    return;
  }

  for (let i = 0; i < expenses.length; i++) {
    const item = expenses[i];

    const li = document.createElement("li");
    li.className = "expense-item";

    li.innerHTML = `
      <div class="expense-details">
        <span class="expense-title">${item.name}</span>
        <span class="expense-meta">Category: ${item.category}</span>
      </div>
      <div class="expense-actions">
        <span class="expense-price">${formatCurrency(item.amount)}</span>
        <button type="button" class="btn-remove" data-index="${i}">Remove</button>
      </div>
    `;

    expenseList.appendChild(li);
  }
}

// 6. Master Dashboard Update & Console Summary
function updateDashboard() {
  const totalExpenses = calculateTotalExpenses();
  const remainingBalance = calculateRemainingBalance(monthlyBudget, totalExpenses);
  const percentUsed = calculateSpendingPercentage(monthlyBudget, totalExpenses);

  displayBudget.textContent = formatCurrency(monthlyBudget);
  displayExpenses.textContent = formatCurrency(totalExpenses);
  displayBalance.textContent = formatCurrency(remainingBalance);
  displayPercentage.textContent = `${percentUsed}%`;

  displayBalance.style.color = remainingBalance < 0 ? "#dc2626" : "#102a43";

  updateBudgetStatus(totalExpenses, remainingBalance, percentUsed);
  renderExpenseList();
  saveState();

  console.log(
    `[${appName}] Budget: ${formatCurrency(monthlyBudget)} | Expenses: ${formatCurrency(
      totalExpenses
    )} | Remaining: ${formatCurrency(remainingBalance)} (${percentUsed}%)`
  );
}

// 7. Interactive Event Listeners (Week 6)
budgetForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const enteredBudget = Number(budgetInput.value);

  if (isNaN(enteredBudget) || enteredBudget <= 0) {
    budgetFeedback.textContent = "Please enter a valid budget greater than 0.";
    budgetFeedback.className = "feedback-message feedback-error";
    return;
  }

  monthlyBudget = enteredBudget;
  budgetFeedback.textContent = `Monthly budget updated to ${formatCurrency(monthlyBudget)}.`;
  budgetFeedback.className = "feedback-message feedback-success";
  budgetInput.value = "";

  updateDashboard();
});

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = expenseNameInput.value.trim();
  const category = expenseCategoryInput.value;
  const amount = Number(expenseAmountInput.value);

  if (name === "" || isNaN(amount) || amount <= 0) {
    expenseFeedback.textContent =
      "Please enter a valid expense name and an amount greater than 0.";
    expenseFeedback.className = "feedback-message feedback-error";
    return;
  }

  expenses.push({
    name: name,
    category: category,
    amount: amount,
  });

  expenseFeedback.textContent = `Added "${name}" (${formatCurrency(amount)}).`;
  expenseFeedback.className = "feedback-message feedback-success";

  expenseNameInput.value = "";
  expenseAmountInput.value = "";

  updateDashboard();
});

expenseList.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-remove")) {
    const index = Number(event.target.getAttribute("data-index"));
    const removedExpense = expenses.splice(index, 1)[0];

    expenseFeedback.textContent = `Removed "${removedExpense.name}".`;
    expenseFeedback.className = "feedback-message feedback-error";

    updateDashboard();
  }
});

clearAllBtn.addEventListener("click", function () {
  if (expenses.length === 0) {
    expenseFeedback.textContent = "There are no expenses to clear.";
    expenseFeedback.className = "feedback-message feedback-error";
    return;
  }

  expenses = [];
  expenseFeedback.textContent = "All expenses have been cleared.";
  expenseFeedback.className = "feedback-message feedback-success";

  updateDashboard();
});

// Initialize Dashboard on Page Load
updateDashboard();
