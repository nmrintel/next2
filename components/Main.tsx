import Home from './Home'
import Header from './Header'
import { useState } from 'react'
import Edit from './Edit'
import { useAuth } from './AuthContext';


export default function Main() {
    const [mode, setMode] = useState(0)

    const SwitchToView = () => {
        setMode(0)
    }

    const SwitchToEdit = () => {
        setMode(1)
    }

    const users = useAuth();

    const RenderComponent = () => {
        if (mode === 0) {
            return <Home />;
        } else if (mode === 1) {
            if (users.currentUser) {
                return <Edit />;
            }
            else {
                return <h1>ログインしてください</h1>
            }
        } else {
            return null;
        }
    }

    return (
        <>
            <Header onSwitch1={SwitchToView} onSwitch2={SwitchToEdit} />
            {RenderComponent()}
        </>
    );
}