import { doc } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const GoalsContext = createContext()

export function GoalsProvider({children}) {
    const [goals, setGoals] = useState([])

    async function createGoal(goalData) {
        await addDoc(collection(db, 'goals'), goalData)
    }

    async function removeGoal(goal) {
        console.log('Removing Goal:' + JSON.stringify(goal))
        await deleteDoc(doc(db, 'goals', goal.id))
    }

    async function updateGoal(goal) {
        await updateDoc(doc(db, 'goals', goal.id), {
            progress: goal.progress
        })
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