import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {
    const { state } = useBudget();

    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses]);

    return (
        <div className="bg-white shadow-lg rounded-lg p-10 mt-10">
            {isEmpty ? 
                <p className="text-gray-600 text-2xl font-bold text-center">No Expenses</p> :   
                <>
                    <p className="text-gray-600 text-2xl font-bold text-center my-5">Expense List</p>
                    {filteredExpenses.map((expense) => (
                        <ExpenseDetail 
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                </>
            }
        </div>
    )
}
