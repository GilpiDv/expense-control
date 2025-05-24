import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {

    const initialExpense = {
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    }

    const [expense, setExpense] = useState<DraftExpense>(initialExpense);
    const [error, setError] = useState('');
    const [previousAmount, setPreviousAmount] = useState(0);
    const { dispatch, state, remainingBudget } = useBudget();

    useEffect(() => {
        if(state.editingId) {
            const editingExpense = state.expenses.filter(exp => exp.id === state.editingId)[0];
    
            setExpense(editingExpense);
            setPreviousAmount(editingExpense.amount);
        }
    }, [state.editingId])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isAmountField = ['amount'].includes(name);

        setExpense({
            ...expense,
            [name] : isAmountField ? +value : value
        });

    }

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        setError('');
        e.preventDefault();
        console.log("expense", expense);
        if(Object.values(expense).includes('') || Object.values(expense).includes(null)) {
            setError('All fields are required!');
            return;
        }

        // Validate to do not exceed remaining budget
        if((expense.amount - previousAmount) > remainingBudget) {
            setError('That expend exceeds the remaining budget!');
            return;
        }

        // Add or update expense
        if(state.editingId) {
            dispatch({type: 'update-expense', payload: {expense: {...expense, id: state.editingId}}})
        } else {
            dispatch({type: 'create-expense', payload: {expense: expense}});
        }

        setExpense(initialExpense)
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                {state.editingId ? 'Edit Expense' : 'New Expense'}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                {/* Name */}
                <label htmlFor="expenseName" className="text-xl">Expense Name:</label>
                <input 
                    type="text" 
                    name="expenseName" 
                    id="expenseName" 
                    placeholder="Type expense name" 
                    className="bg-slate-100 p-2" 
                    value={expense.expenseName}
                    onChange={handleChange}
                />

                {/* Amount */}
                <label htmlFor="amount" className="text-xl">Amount:</label>
                <input 
                    type="text" 
                    name="amount" 
                    id="amount" 
                    placeholder="Type amount" 
                    className="bg-slate-100 p-2"
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                            handleChange(e); 
                        }
                    }}
                    value={expense.amount}
                />

                {/* Category */}
                <label htmlFor="category" className="text-xl">Category:</label>
                <select 
                    name="category" 
                    id="category" 
                    className="bg-slate-100 p-2"
                    onChange={handleChange}
                    value={expense.category}
                >   
                    <option value="">-- Select --</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

                {/* Expense Date */}
                <label htmlFor="expenseDate" className="text-xl">Expense Date:</label>
                <DatePicker
                    name="expenseDate" 
                    id="expenseDate" 
                    className="bg-slate-100 p-2 border-0"
                    onChange={handleChangeDate}
                    value={expense.date}
                />

                <input 
                    type="submit" 
                    value='Save'
                    className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg my-4" 
                />
            </div>
        </form>
    )
}
