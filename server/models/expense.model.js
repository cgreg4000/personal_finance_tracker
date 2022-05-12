const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    expenseName: {
        type: String,
        required: [true, "Expense name is required."]
    },
    expenseDate: {
        type: Date,
        required: [true, "Date is required."]
    },
    expenseCategory: {
        type: String,
        required: [true, "Category is required."],
        enum: { values: ["Food", "Giving", "Health", "Housing", "Insurance", "Miscellaneous", "Personal", "Recreation", "Saving", "Transportation", "Utilities"], message: "Category is not valid." }
    },
    expenseAmount: {
        type: Number,
        required: [true, "Amount is required."]
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Expense', ExpenseSchema);