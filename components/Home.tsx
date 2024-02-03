import {useAuth}  from './AuthContext'

export default function Home() {
    const { user } = useAuth()

    if (!user) {
        return <div>ログインしてね</div>
    }

    return <div>Welcome, {user.displayName}!</div>
}