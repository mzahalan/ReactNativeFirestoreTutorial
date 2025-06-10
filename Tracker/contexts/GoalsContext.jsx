import { getDocs } from 'firebase/firestore';
import { createContext, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const GoalsContext = createContext()

export function GoalsProvider({children}) {
    const [goals, setGoals] = useState([
        {$id: "1", desc: "Goal 1"},
        {$id: "2", desc: "Goal 2"},
        {$id: "3", desc: "Goal 3"}
    ])

    async function createGoal(goalData) {
        await addDoc(collection(db, 'goals'), goalData)
    }

    async function removeGoal(goal) {
        
    }

    async function getGoals() {
        const goals = await getDocs(collection(db, 'goals'))
        setGoals(goals.docs.map(doc => ({...doc.data(), $id: doc.id})))
        
    }

    async function updateGoal(goal) {
        
    }

    return (
        <GoalsContext.Provider
            value={{
                goals,
                createGoal,
                removeGoal,
                getGoals,
                updateGoal
            }}
        >
        {children}
        </GoalsContext.Provider>
    )

}