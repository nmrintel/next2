import useAuth  from './useAuth'

export default function Home() {
    const { user, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <div>ログインしてね</div>
    }

    return <div>Welcome, {user.displayName}!</div>
}