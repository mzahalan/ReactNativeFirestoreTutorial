import { createContext, useEffect, useState } from 'react';
import { getDocs, addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const GoalsContext = createContext()

export function GoalsProvider({children}) {
    const [goals, setGoals] = useState([])

    async function createGoal(goalData) {
        await addDoc(collection(db, 'goals'), goalData)
    }

    async function removeGoal(goal) {
        
    }

    async function updateGoal(goal) {
        
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'goals'), (snapshot) => {
            setGoals(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        })

        return () => unsubscribe()
    }, [])

    return (
        <GoalsContext.Provider
            value={{
                goals,
                createGoal,
                removeGoal,
                updateGoal
            }}
        >
        {children}
        </GoalsContext.Provider>
    )

}