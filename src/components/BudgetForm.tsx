import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useBudget } from '../hooks/useBudget';

export default function BudgetForm() {

    const [budget, setBudget] = useState(0);
    const { dispatch } = useBudget(); 

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(Number(e.target.value));
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({type: 'add-budget', payload: { budget }})
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className='flex flex-col space-y-5'>
                <label htmlFor="budget" className='text-4xl text-blue-600 font-bold text-center'>
                    Define Budget
                </label>
                <input 
                    type="text" 
                    className='w-full bg-white border border-gray-200 p-2'
                    placeholder='Define your budget'
                    name='budget'
                    value={budget}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                            handleChange(e); // Only update if it's a valid number
                        }
                    }}
                />
            </div>
            <input 
                type="submit" 
                value="Define Budget" 
                className='bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase'
            />
        </form>
    )
}