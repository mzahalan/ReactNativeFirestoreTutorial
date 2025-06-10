import { createContext, useState } from 'react';

export const GoalsContext = createContext()

export function GoalsProvider({children}) {
    const [goals] = useState([
        {$id: "1", desc: "Goal 1"},
        {$id: "2", desc: "Goal 2"},
        {$id: "3", desc: "Goal 3"}
    ])

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