import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { User } from 'firebase/auth' // Import the User type

export default function useAuth() {
    const [user, setUser] = useState(null as User | null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            setUser(user as User | null)
            setLoading(false)
        })
    }, [])
    return { user, loading }
}
