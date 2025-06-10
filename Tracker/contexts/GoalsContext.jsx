import { createContext, useState } from 'react';

export const GoalsContext = createContext()

export function GoalsProvider({children}) {
    const [goals] = useState([])

    async function addGoal(goal) {
        
    }
    async function removeGoal(goal) {
        
    }

    async function getGoals() {
        
    }

    async function updateGoal(goal) {
        
    }

    return (
        <GoalsContext.Provider
            value={{
                goals,
                addGoal,
                removeGoal,
                getGoals,
                updateGoal
            }}
        >
        {children}
        </GoalsContext.Provider>
    )

}