// Firebaseの設定と初期化
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { User } from 'firebase/auth' // Import the User type
import { Router,RouterProvider } from 'react-router-dom'
import {useRouter} from 'next/router'

export function useAuth() {
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

export default function Home() {
    const { user, loading } = useAuth()
    const router = useRouter()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
<<<<<<< HEAD
        router.push('/login')
        return <div>Redirecting...</div>
=======
        return router.push('/login')
>>>>>>> 6089520eef7713300acbc24ebe7396d8f89e4218
    }

    return <div>Welcome, {user.displayName}!</div>
}