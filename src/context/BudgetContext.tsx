import { useReducer, createContext, type Dispatch, type ReactNode, useMemo } from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer";

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    expendedBudget: number
    remainingBudget: number

}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)

export const BudgetProvider = ({children} : BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    const expendedBudget = useMemo(() => {
        return state.expenses.reduce((total, expense) => total + expense.amount, 0);
    }, [state.expenses])

    const remainingBudget =  useMemo(() => {
        return state.budget - expendedBudget;
    }, [state.expenses])

    return (
        <BudgetContext.Provider
            value={{ // Aqui va lo que se va a poder consumir en otros componentes...
                state, 
                dispatch,
                expendedBudget,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}