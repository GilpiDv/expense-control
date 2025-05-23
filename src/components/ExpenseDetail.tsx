import { useMemo } from "react"
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list"
import { formatDate } from "../helpers"
import type { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"
import 'react-swipeable-list/dist/styles.css';

type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({expense} : ExpenseDetailProps) {
    const { dispatch } = useBudget();

    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction 
                onClick={() => dispatch({type: 'get-expense-by-id', payload: { id: expense.id }})} 
            >
                Update
            </SwipeAction>
        </LeadingActions>
    )

     const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => dispatch({type: 'delete-expense', payload: { id: expense.id }})}
                destructive={true} 
            >
                Delete
            </SwipeAction>
        </TrailingActions>
    )


    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={0.6}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div className="hidden sm:block">
                        <img src={`/icono_${categoryInfo.icon}.svg`} alt="Expense Icon" className="w-20" />
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="flex gap-2 sm:hidden" >
                            <img src={`/icono_${categoryInfo.icon}.svg`} alt="Expense Icon" className="w-5" />
                            <p className="text-lg font-bold uppercase text-slate-400">{categoryInfo.name}</p>
                        </div>
                        <p className="text-xl">{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>

                    <AmountDisplay 
                        amount={expense.amount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
