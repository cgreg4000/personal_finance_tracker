const ExpenseController = require('../controllers/expense.controller');

module.exports = app => {
    app.get('/api/expenses/all', ExpenseController.getAllExpenses);
    app.post('/api/expenses/new', ExpenseController.createExpense);
    app.get('/api/expenses/:_id', ExpenseController.getOneExpense);
    app.put('/api/expenses/update/:_id', ExpenseController.updateExpense);
    app.delete('/api/expenses/delete/:_id', ExpenseController.deleteExpense);
    app.get('/api/expenses/users/:user_id', ExpenseController.getAllExpensesBelongingToUser);
}