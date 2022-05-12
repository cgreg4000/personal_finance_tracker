const Expense = require('../models/expense.model');
const jwt = require('jsonwebtoken');

class ExpenseController {

    getAllExpenses = (req, res) => {
        Expense.find()
            .populate("user_id")
            .then(allExpenses => {
                res.json({ expenses: allExpenses })
            })
            .catch(err => {
                res.json({ message: 'Something went wrong', error: err })
            });
    }

    createExpense = (req, res) => {
        Expense.create(req.body)
            .then(newExpense => res.json({ expense: newExpense }))
            .catch(err => res.json({ message: 'Something went wrong', error: err }));
    }

    getOneExpense = (req, res) => {
        Expense.findOne({ _id: req.params._id })
            .populate("user_id")
            .then(oneExpense => res.json({ expense: oneExpense }))
            .catch(err => res.json({ message: 'Something went wrong', error: err }));
    }

    updateExpense = (req, res) => {
        Expense.findOneAndUpdate(
            { _id: req.params._id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(updatedExpense => res.json({ expense: updatedExpense }))
            .catch(err => res.json({ message: 'Something went wrong', error: err }));
    }

    deleteExpense = (req, res) => {
        Expense.deleteOne({ _id: req.params._id })
            .then(result => res.json({ result: result }))
            .catch(err => res.json({ message: 'Something went wrong', error: err }));
    }

    getAllExpensesBelongingToUser = (req, res) => {
        Expense.find({ user_id: req.params.user_id })
            .populate("user_id")
            .then(allExpenses => {
                res.json({ expenses: allExpenses })
            })
            .catch(err => {
                res.json({ message: 'Something went wrong', error: err })
            });
    }
}

module.exports = new ExpenseController();