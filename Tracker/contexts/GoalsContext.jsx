import { createContext, useEffect, useState } from 'react';
import { getDocs, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const GoalsContext = createContext()

export function GoalsProvider({children}) {
    const [goals, setGoals] = useState([])

    async function createGoal(goalData) {
        await addDoc(collection(db, 'goals'), goalData)
    }

    async function removeGoal(goal) {
        
    }

    async function getGoals() {
        const snapshot = await getDocs(collection(db, 'goals'))
        setGoals(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    }

    async function updateGoal(goal) {
        
    }

    useEffect(() => {
        getGoals()
    }, [])

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